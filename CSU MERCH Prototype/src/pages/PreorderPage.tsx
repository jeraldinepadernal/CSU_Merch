import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleAlert, Clock, FileImage, LockKeyhole, QrCode, ShieldCheck, Upload } from "lucide-react"
import { entityFor, Order, peso, Product } from "../data/mockData"
import Button from "../components/common/Button"
import ProductArt from "../components/common/ProductArt"

/** Three-step checkout route. Props: product, variant and submit/back actions. State: step, payment fields, receipt and errors. */
function Preorder({ product, color, size, submit, back }: { product: Product; color: string; size: string; submit: (data: Partial<Order>) => void; back: () => void }) {
  const [step, setStep] = useState(1)
  const [method, setMethod] = useState<"GCash" | "Maya">("GCash")
  const [reference, setReference] = useState("")
  const [amount, setAmount] = useState("")
  const [receipt, setReceipt] = useState("")
  const [errors, setErrors] = useState<string[]>([])
  const nextPayment = () => {
    const issues = []
    if (!/^\d+$/.test(reference)) issues.push("Enter a digits-only reference number.")
    if (Number(amount) !== product.price) issues.push(`Amount must match ${peso(product.price)}.`)
    if (!receipt) issues.push("Upload a JPG or PNG receipt screenshot.")
    setErrors(issues)
    if (!issues.length) setStep(3)
  }
  const entity = entityFor(product.entity)
  return <main className="page preorder-page">
    <button className="back-link" onClick={back}><ArrowLeft size={18} /> Back to item</button>
    <div className="page-title"><span className="eyebrow">SECURE PRE-ORDER</span><h1>Complete your order</h1><p>Follow the three steps below. Your item is reserved after officer approval.</p></div>
    <div className="stepper">{["Pickup","Payment","Review"].map((label, index) => <div key={label} className={step >= index + 1 ? "active" : ""}><span>{step > index + 1 ? <Check size={16} /> : index + 1}</span><b>{label}</b></div>)}</div>
    <div className="checkout-layout"><section className="checkout-card">
      {step === 1 && <><div className="checkout-heading"><span>01</span><div><h2>Choose pickup</h2><p>Your order can be claimed at the issuing office.</p></div></div>
        <label className="radio-card"><input type="radio" checked readOnly /><span className="radio-dot" /><div><b>{entity.office}</b><p><Clock size={16} />{entity.hours}</p><small>Bring your CSU ID and show your claim code.</small></div><CheckCircle2 /></label>
        <Button className="next-button" onClick={() => setStep(2)}>Continue to payment <ArrowRight size={17} /></Button></>}
      {step === 2 && <><div className="checkout-heading"><span>02</span><div><h2>Payment details</h2><p>Send the exact amount, then upload your receipt.</p></div></div>
        <div className="payment-account"><div className="qr"><QrCode /></div><div><span>{method} ACCOUNT</span><h3>{product.entity} Merchandise Council</h3><b>0917 000 0000</b><p>Exact amount: <strong>{peso(product.price)}</strong></p></div></div>
        {errors.length > 0 && <div className="error-banner column">{errors.map((error) => <span key={error}><CircleAlert size={16} />{error}</span>)}</div>}
        <div className="form-grid"><fieldset><legend>Payment method</legend><div className="method-row">{(["GCash","Maya"] as const).map((item) => <button key={item} className={method === item ? "active" : ""} onClick={() => setMethod(item)}>{item}</button>)}</div></fieldset>
          <label>Reference number<input inputMode="numeric" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Enter digits only" /></label>
          <label>Amount sent<input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={`${product.price}.00`} /></label>
          <label className="upload-box"><input type="file" accept="image/png,image/jpeg" onChange={(e) => { const file = e.target.files?.[0]; if (file && file.size <= 5_000_000) setReceipt(URL.createObjectURL(file)) }} /><span>{receipt ? <CheckCircle2 /> : <Upload />}</span><b>{receipt ? "Receipt attached" : "Drop your receipt here"}</b><small>JPG or PNG, max 5 MB</small>{receipt && <img src={receipt} alt="Receipt preview" />}</label></div>
        <div className="checkout-actions"><Button variant="secondary" onClick={() => setStep(1)}>Back</Button><Button onClick={nextPayment}>Review order <ArrowRight size={17} /></Button></div></>}
      {step === 3 && <><div className="checkout-heading"><span>03</span><div><h2>Review order</h2><p>Make sure these details are correct before submitting.</p></div></div>
        <div className="review-list"><div><span>Pickup</span><b>{entity.office}</b></div><div><span>Payment</span><b>{method} · Ref. {reference}</b></div><div><span>Amount sent</span><b>{peso(Number(amount))}</b></div><div><span>Receipt</span><b><FileImage size={17} /> Attached</b></div></div>
        <div className="confirm-note"><ShieldCheck /><p><b>Ready to submit?</b><br />An officer will compare your receipt and reference number before approval.</p></div>
        <div className="checkout-actions"><Button variant="secondary" onClick={() => setStep(2)}>Edit payment</Button><Button onClick={() => submit({ method, reference, receipt })}>Submit pre-order <Check size={17} /></Button></div></>}
    </section>
      <aside className="summary-card"><h3>Order summary</h3><div className="summary-product"><ProductArt product={product} color={color} small /><div><span>{product.entity}</span><b>{product.name}</b><small>{color} · {size === "ONE" ? "One size" : `Size ${size}`}</small></div></div><dl><div><dt>Item</dt><dd>{peso(product.price)}</dd></div><div><dt>Service fee</dt><dd>Free</dd></div><div className="total"><dt>Total</dt><dd>{peso(product.price)}</dd></div></dl><p><LockKeyhole size={15} /> One item per pre-order</p></aside>
    </div>
  </main>
}

export default Preorder
