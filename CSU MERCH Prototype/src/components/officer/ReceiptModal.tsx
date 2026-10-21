import { Check, FileImage, X } from "lucide-react"
import { Order, Product, peso } from "../../data/mockData"
import Button from "../common/Button"

/** Receipt verification modal. Props: order, product, close and approve actions. State: none. */
function ReceiptModal({ order, product, close, approve }: { order: Order; product: Product; close: () => void; approve: () => void }) {
  return <div className="modal-backdrop" onMouseDown={close}><div className="receipt-modal" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={close}><X /></button><div><span className="eyebrow">PAYMENT VERIFICATION</span><h2>Compare payment details</h2><p>Check the uploaded receipt against the student's typed information.</p></div><div className="receipt-compare"><div className="receipt-placeholder"><FileImage /><b>Receipt screenshot</b><span>{order.method} payment to {product.entity}</span></div><dl><div><dt>Student</dt><dd>{order.student}<small>{order.studentId}</small></dd></div><div><dt>Reference number</dt><dd className="large">{order.reference}</dd></div><div><dt>Amount</dt><dd className="large">{peso(order.amount)}</dd></div><div><dt>Item</dt><dd>{product.name}</dd></div></dl></div><div className="modal-actions"><Button variant="secondary" onClick={close}>Cancel</Button><Button onClick={approve}><Check size={17} /> Approve order</Button></div></div></div>
}

export default ReceiptModal
