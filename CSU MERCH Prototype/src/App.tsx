import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import MerchList from "./components/student/MerchList";
import {
  demoStudentOrders,
  demoUsers,
  entities,
  initialProducts,
  Order,
  Product,
  seedOrders,
} from "./data/mockData"
import { OfficerTab, Role, Screen } from "./types"
import Footer from "./components/common/Footer"
import OfficerNav from "./components/officer/OfficerNav"
import StudentNav from "./components/student/StudentNav"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import MyOrdersPage from "./pages/MyOrdersPage"
import OfficerDashboardPage from "./pages/OfficerDashboardPage"
import PreorderPage from "./pages/PreorderPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import RestrictedPage from "./pages/RestrictedPage"

/**
 * Root prototype controller.
 * Props: none.
 * State: current page, role, shared products/orders, selected variant, filters, officer tab and feedback UI.
 */
export default function App() {
  const [role, setRole] = useState<Role>("guest")
  const [screen, setScreen] = useState<Screen>("home")
  const [products, setProducts] = useState(initialProducts)
  const [orders, setOrders] = useState<Order[]>([
    ...demoStudentOrders,
    ...entities.flatMap((entity) => seedOrders(entity.code)),
  ])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selection, setSelection] = useState({ color: "", size: "" })
  const [search, setSearch] = useState("")
  const [entityFilter, setEntityFilter] = useState("")
  const [officerEntity, setOfficerEntity] = useState("CCIS")
  const [officerTab, setOfficerTab] = useState<OfficerTab>("orders")
  const [loginNotice, setLoginNotice] = useState(false)
  const [returnToItem, setReturnToItem] = useState(false)
  const [orderBanner, setOrderBanner] = useState(false)
  const [toast, setToast] = useState("")

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 3000)
  }

  const navigate = (next: Screen) => {
    if (next === "officer" && role !== "officer") {
      setScreen("restricted")
      return
    }
    if (role === "officer" && ["details", "preorder", "orders"].includes(next)) return
    setScreen(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const openProduct = (product: Product) => {
    setSelectedProduct(product)
    setSelection({ color: "", size: "" })
    navigate("details")
  }

  const requestLogin = () => {
    setLoginNotice(true)
    setReturnToItem(true)
    setScreen("login")
  }

  const onLogin = (nextRole: Role, entity?: string) => {
    setRole(nextRole)
    if (nextRole === "officer") {
      setOfficerEntity(entity || "CCIS")
      setOfficerTab("orders")
      setScreen("officer")
    } else {
      setScreen(returnToItem && selectedProduct ? "details" : "home")
    }
    setLoginNotice(false)
    setReturnToItem(false)
  }

  const logout = () => {
    setRole("guest")
    setScreen("home")
    setLoginNotice(false)
    setOrderBanner(false)
  }

  const submitOrder = (data: Partial<Order>) => {
    if (!selectedProduct) return
    const id = `CSU-${Math.random().toString(16).slice(2, 8).toUpperCase()}`
    setOrders((current) => [{
      id,
      student: demoUsers.student.name,
      studentId: demoUsers.student.id,
      productId: selectedProduct.id,
      color: selection.color,
      size: selection.size,
      amount: selectedProduct.price,
      method: data.method || "GCash",
      reference: data.reference || "",
      receipt: data.receipt,
      date: "Today · 10:24 AM",
      status: "Pending Verification",
    }, ...current])
    setProducts((current) => current.map((product) =>
      product.id === selectedProduct.id
        ? {
            ...product,
            stock: {
              ...product.stock,
              [`${selection.color}|${selection.size}`]: Math.max(
                0,
                (product.stock[`${selection.color}|${selection.size}`] || 0) - 1,
              ),
            },
          }
        : product,
    ))
    setOrderBanner(true)
    navigate("orders")
  }

  const liveProduct = selectedProduct
    ? products.find((item) => item.id === selectedProduct.id) || selectedProduct
    : null
  const isOfficer = role === "officer"

  return <div className={`app ${isOfficer ? "officer-app" : ""}`}>
    {screen !== "login" && (isOfficer
      ? <OfficerNav
          entity={officerEntity}
          tab={officerTab}
          setTab={(tab) => {
            setOfficerTab(tab)
            navigate("officer")
          }}
          logout={logout}
        />
      : <StudentNav
          role={role}
          screen={screen}
          search={search}
          onSearch={setSearch}
          navigate={navigate}
          logout={logout}
        />)}
    <div className="screen-fade" key={screen}>
      {screen === "home" && <HomePage
        products={products}
        search={search}
        selectedEntity={entityFilter}
        setSelectedEntity={setEntityFilter}
        setSearch={setSearch}
        open={openProduct}
      />}
      {screen === "details" && liveProduct && <ProductDetailsPage
        product={liveProduct}
        role={role}
        back={() => navigate("home")}
        login={requestLogin}
        preorder={(color, size) => {
          setSelection({ color, size })
          navigate("preorder")
        }}
      />}
      {screen === "login" && <LoginPage
        notice={loginNotice}
        onLogin={onLogin}
        cancel={() => navigate(selectedProduct && returnToItem ? "details" : "home")}
      />}
      {screen === "preorder" && liveProduct && <PreorderPage
        product={liveProduct}
        {...selection}
        submit={submitOrder}
        back={() => navigate("details")}
      />}
      {screen === "orders" && <MyOrdersPage
        orders={role === "student"
          ? orders.filter((order) => order.studentId === demoUsers.student.id)
          : []}
        loggedIn={role === "student"}
        banner={orderBanner}
        browse={() => navigate("home")}
      />}
      {screen === "officer" && <OfficerDashboardPage
        entity={officerEntity}
        products={products}
        setProducts={setProducts}
        orders={orders}
        setOrders={setOrders}
        tab={officerTab}
        setTab={setOfficerTab}
        toast={showToast}
      />}
      {screen === "restricted" && <RestrictedPage
        login={() => {
          setLoginNotice(false)
          navigate("login")
        }}
        home={() => navigate("home")}
      />}
    </div>
    {screen !== "login" && <Footer officer={isOfficer} navigate={navigate} />}
    {toast && <div className="toast"><CheckCircle2 />{toast}</div>}
  </div>
}
