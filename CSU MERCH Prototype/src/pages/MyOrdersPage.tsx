import { useState } from "react"
import { ArrowRight, CheckCircle2, ShoppingBag } from "lucide-react"
import { Order, OrderStatus } from "../data/mockData"
import Button from "../components/common/Button"
import StudentOrderCard from "../components/student/StudentOrderCard"

/** Student order history route. Props: orders, login/banner flags and browse action. State: status filter. */
function MyOrders({ orders, loggedIn, banner, browse }: { orders: Order[]; loggedIn: boolean; banner: boolean; browse: () => void }) {
  const [filter, setFilter] = useState<"All" | OrderStatus>("All")
  const statuses: ("All" | OrderStatus)[] = ["All","Pending Verification","Ready for Pickup","Claimed"]
  const shown = orders.filter((order) => filter === "All" || order.status === filter)
  if (!loggedIn || !orders.length) return <main className="page orders-page"><div className="empty-state orders-empty"><ShoppingBag /><h1>No pre-orders yet</h1><p>Pick an item from the catalog, send the payment through GCash or Maya, then submit your receipt to start a pre-order.</p><Button onClick={browse}>Browse the catalog <ArrowRight size={17} /></Button></div></main>
  return <main className="page orders-page">
    <div className="page-title"><span className="eyebrow">YOUR PURCHASES</span><h1>My orders</h1><p>Track verification, pickup, and claimed campus merchandise.</p></div>
    {banner && <div className="success-banner"><CheckCircle2 /><div><b>Pre-order submitted!</b><span>An officer will verify your payment and approve it.</span></div></div>}
    <div className="order-filters">{statuses.map((status) => <button key={status} className={filter === status ? "active" : ""} onClick={() => setFilter(status)}>{status}<span>{status === "All" ? orders.length : orders.filter((item) => item.status === status).length}</span></button>)}</div>
    <div className="orders-list">{shown.map((order) => <StudentOrderCard key={order.id} order={order} />)}</div>
  </main>
}

export default MyOrders
