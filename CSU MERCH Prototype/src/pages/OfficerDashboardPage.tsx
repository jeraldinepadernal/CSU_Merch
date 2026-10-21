import { useState } from "react"
import type React from "react"
import { CircleAlert, Clock, Edit3, Eye, LayoutGrid, Package, ShieldCheck, ShoppingBag, Tag } from "lucide-react"
import { entityFor, Order, OrderStatus, peso, Product, totalStock } from "../data/mockData"
import { OfficerTab } from "../types"
import Button from "../components/common/Button"
import ProductArt from "../components/common/ProductArt"
import Badge from "../components/common/StatusBadge"
import Inventory from "../components/officer/InventoryPanel"
import ReceiptModal from "../components/officer/ReceiptModal"
import EditProduct from "../components/officer/EditProductDrawer"

/** Officer dashboard route. Props: shared products/orders state, active entity/tab and toast action. State: order filter and open modal/drawer. */
function OfficerDashboard({ entity, products, setProducts, orders, setOrders, tab, setTab, toast }: {
  entity: string; products: Product[]; setProducts: React.Dispatch<React.SetStateAction<Product[]>>; orders: Order[]; setOrders: React.Dispatch<React.SetStateAction<Order[]>>; tab: OfficerTab; setTab: (tab: OfficerTab) => void; toast: (message: string) => void
}) {
  const entityProducts = products.filter((item) => item.entity === entity)
  const entityOrders = orders.filter((order) => entityProducts.some((item) => item.id === order.productId))
  const [orderFilter, setOrderFilter] = useState<OrderStatus>("Pending Verification")
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null)
  const [editing, setEditing] = useState<Product | null>(null)
  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((current) => current.map((order) => order.id === id ? { ...order, status, claimCode: status === "Pending Verification" ? undefined : order.claimCode || order.id } : order))
    setReceiptOrder(null); toast(status === "Ready for Pickup" ? "Order approved. Claim code generated." : "Order marked as claimed.")
  }
  const stats = [
    ["Pending approvals", entityOrders.filter((item) => item.status === "Pending Verification").length, Clock],
    ["Ready for pickup", entityOrders.filter((item) => item.status === "Ready for Pickup").length, ShoppingBag],
    ["Low stock items", entityProducts.filter((item) => totalStock(item) > 0 && totalStock(item) <= 5).length, CircleAlert],
    ["Sold-out items", entityProducts.filter((item) => totalStock(item) === 0).length, Package],
  ] as const
  return <>
    <main className="officer-main">
      <section className="officer-hero"><div><span className="officer-kicker"><ShieldCheck size={16} /> OFFICER WORKSPACE</span><h1>Officer Dashboard <em>·</em> {entity}</h1><p>{entityFor(entity).name}</p></div><span className="hero-officer-pill">OFFICER · {entity}</span></section>
      <section className="stat-grid">{stats.map(([label, value, Icon]) => <article key={label}><span><Icon /></span><div><strong>{value}</strong><p>{label}</p></div></article>)}</section>
      <div className="dashboard-tabs">{(["orders","inventory","products"] as OfficerTab[]).map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item === "orders" ? <ShoppingBag /> : item === "inventory" ? <LayoutGrid /> : <Tag />}{item[0].toUpperCase() + item.slice(1)}</button>)}</div>
      {tab === "orders" && <section className="dash-panel"><div className="panel-heading"><div><h2>Pre-orders</h2><p>Verify payments and move approved orders to pickup.</p></div></div>
        <div className="order-filters compact">{(["Pending Verification","Ready for Pickup","Claimed"] as OrderStatus[]).map((status) => <button key={status} className={orderFilter === status ? "active" : ""} onClick={() => setOrderFilter(status)}>{status}<span>{entityOrders.filter((item) => item.status === status).length}</span></button>)}</div>
        <div className="officer-orders">{entityOrders.filter((item) => item.status === orderFilter).map((order) => {
          const product = products.find((item) => item.id === order.productId)!
          return <article key={order.id}><div className="officer-order-main"><span className="order-code">{order.id}</span><h3>{order.student}</h3><p>{order.studentId}</p></div><div><b>{product.name}</b><p>{order.color} · {order.size}</p></div><div><b>{peso(order.amount)}</b><p>{order.method} · {order.reference}</p></div><div><b>{order.date.split("·")[0]}</b><p>{order.date.split("·")[1]}</p></div><div className="row-actions"><Button variant="ghost" onClick={() => setReceiptOrder(order)}><Eye size={16} /> View receipt</Button>{order.status === "Pending Verification" && <Button onClick={() => updateStatus(order.id, "Ready for Pickup")}>Approve order</Button>}{order.status === "Ready for Pickup" && <Button onClick={() => updateStatus(order.id, "Claimed")}>Mark as claimed</Button>}{order.status === "Claimed" && <Badge status="Claimed" />}</div></article>
        })}</div>
      </section>}
      {tab === "inventory" && <Inventory products={entityProducts} setProducts={setProducts} toast={toast} />}
      {tab === "products" && <section className="dash-panel"><div className="panel-heading"><div><h2>Products</h2><p>Edit customer-facing details for your entity's merchandise.</p></div></div>
        <div className="product-admin-list">{entityProducts.map((product) => <article key={product.id}><ProductArt product={product} small /><div><span>{product.type}</span><h3>{product.name}</h3><p>{peso(product.price)} · {product.colors.length} colors · {totalStock(product)} in stock</p></div><Button variant="secondary" onClick={() => setEditing(product)}><Edit3 size={16} /> Edit</Button></article>)}</div>
      </section>}
    </main>
    {receiptOrder && <ReceiptModal order={receiptOrder} product={products.find((item) => item.id === receiptOrder.productId)!} close={() => setReceiptOrder(null)} approve={() => updateStatus(receiptOrder.id, "Ready for Pickup")} />}
    {editing && <EditProduct product={editing} close={() => setEditing(null)} save={(updated) => { setProducts((current) => current.map((item) => item.id === updated.id ? updated : item)); setEditing(null); toast("Product changes are live in the student catalog.") }} />}
  </>
}

export default OfficerDashboard
