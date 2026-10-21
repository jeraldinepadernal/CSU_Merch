import { Check, CheckCircle2, Clock, Image as ImageIcon, QrCode } from "lucide-react"
import { entityFor, initialProducts, Order, peso } from "../../data/mockData"
import ProductArt from "../common/ProductArt"
import Badge from "../common/StatusBadge"

/** Student order tracking card. Props: order. State: none. */
function StudentOrderCard({ order }: { order: Order }) {
  const product = initialProducts.find((item) => item.id === order.productId) || initialProducts[0]
  const entity = entityFor(product.entity)
  const stage = order.status === "Pending Verification" ? 1 : order.status === "Ready for Pickup" ? 2 : 3
  return <article className="student-order-card">
    <div className="order-image"><ProductArt product={product} color={order.color} /><Badge status={order.status} /></div>
    <div className="order-content"><div className="order-top"><div><span className="order-code">{order.id}</span><h2>{product.name}</h2><span className="entity-tag static">{product.entity}</span></div><strong>{peso(order.amount)}</strong></div>
      <div className="order-meta"><span><b>Variant</b>{order.color} · {order.size}</span><span><b>Pickup</b>{entity.office}</span><span><b>Ordered</b>{order.date}</span><span><b>Payment</b>{order.method} · {order.reference}</span><button><ImageIcon size={16} /> Receipt</button></div>
      <div className="tracker">{["Pending Verification","Ready for Pickup","Claimed"].map((item, index) => <div key={item} className={stage >= index + 1 ? "done" : ""}><span>{stage > index + 1 ? <Check size={14} /> : index + 1}</span><b>{item}</b></div>)}</div>
      {order.status === "Pending Verification" && <p className="order-message"><Clock size={18} />Waiting for an officer to verify your payment.</p>}
      {order.status === "Ready for Pickup" && <div className="claim-panel"><QrCode /><div><span>YOUR CLAIM CODE</span><strong>{order.claimCode}</strong><p>Show this code at the pickup office.</p></div></div>}
      {order.status === "Claimed" && <p className="claimed-message"><CheckCircle2 size={18} />Claimed successfully. Thank you for supporting campus merchandise.</p>}
    </div>
  </article>
}

export default StudentOrderCard
