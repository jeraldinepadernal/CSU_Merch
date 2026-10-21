import { CheckCircle2, ShieldCheck } from "lucide-react"

/** Six-step ordering guide and requirements panel. Props: none. State: none. */
function OrderGuide() {
  const steps = ["Browse the catalog and pick an item.","Log in as a student.","Choose your size, color, and pickup office.","Send the payment through GCash or Maya.","Upload your receipt and reference number.","Wait for officer approval, then claim your item with your claim code."]
  return <section className="guide-section">
    <div className="section-heading"><span className="eyebrow">SIMPLE & SECURE</span><h2>How to place an order</h2><p>From browsing to pickup in six clear steps.</p></div>
    <div className="guide-layout"><div className="steps-grid">{steps.map((step, index) => <article key={step}><span>{index + 1}</span><p>{step}</p></article>)}</div>
      <aside className="need-panel"><span className="panel-icon"><ShieldCheck /></span><h3>What you need</h3>{["Your CSU student account","A GCash or Maya account","Receipt screenshot & reference","Your size and color choice"].map((item) => <p key={item}><CheckCircle2 size={17} />{item}</p>)}<small>Your payment details stay within this prototype.</small></aside>
    </div>
  </section>
}

export default OrderGuide
