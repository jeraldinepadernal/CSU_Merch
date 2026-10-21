import { useState } from "react"
import { ArrowRight, CheckCircle2, CircleAlert, GraduationCap, LockKeyhole, ShieldCheck, X } from "lucide-react"
import { demoUsers, entities } from "../data/mockData"
import { Role } from "../types"
import Button from "../components/common/Button"
import Logo from "../components/common/Logo"

/** Authentication route. Props: notice, success and cancel actions. State: role mode, credentials, entity and error. */
function Login({ notice, onLogin, cancel }: { notice: boolean; onLogin: (role: Role, entity?: string) => void; cancel: () => void }) {
  const [mode, setMode] = useState<"student" | "officer">("student")
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [entity, setEntity] = useState("")
  const [error, setError] = useState("")
  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!id || !password || (mode === "officer" && !entity)) return setError("Please complete all required fields.")
    const valid = mode === "student"
      ? id === demoUsers.student.id && password === demoUsers.student.password
      : id === demoUsers.officer.id && password === demoUsers.officer.password
    if (!valid) return setError("Incorrect ID or password.")
    onLogin(mode, entity)
  }
  const demo = () => { setId(demoUsers[mode].id); setPassword(demoUsers[mode].password); if (mode === "officer") setEntity("CCIS"); setError("") }
  return <main className="login-page">
    <button className="login-close" onClick={cancel} aria-label="Close login"><X /></button>
    <div className="login-panel">
      <section className="login-story"><Logo inverse /><div><span className="login-pill">CSU MERCH</span><h1>Log in to place<br />your order.</h1><p>Students pre-order and track items. Officers approve orders and manage stock.</p></div>
        <div className="perks">{["Verified campus merchandise","Secure payment review","Simple on-campus pickup"].map((item) => <span key={item}><CheckCircle2 size={18} />{item}</span>)}</div>
      </section>
      <section className="login-form">
        {notice && <div className="notice"><LockKeyhole size={18} /><div><b>Log in to place your order.</b><span>We'll return you to this item after login.</span></div></div>}
        <div className="role-choice">
          <button className={mode === "student" ? "active" : ""} onClick={() => { setMode("student"); setError("") }}><GraduationCap /><span><b>Student</b><small>Shop & track orders</small></span></button>
          <button className={mode === "officer" ? "active officer" : ""} onClick={() => { setMode("officer"); setError("") }}><ShieldCheck /><span><b>Officer</b><small>Manage merchandise</small></span></button>
        </div>
        {mode === "officer" && <span className="officer-access">OFFICER ACCESS</span>}
        <div className="form-heading"><h2>Log in as {mode === "student" ? "Student" : "Officer"}</h2><button onClick={demo}>Use demo account</button></div>
        {error && <div className="error-banner"><CircleAlert size={17} />{error}</div>}
        <form onSubmit={submit}>
          <label>{mode === "student" ? "Student ID" : "Officer ID"}<input value={id} onChange={(e) => setId(e.target.value)} placeholder={mode === "student" ? "e.g. 2023-00123" : "e.g. OFC-0001"} /></label>
          {mode === "officer" && <label>College / Organization<select value={entity} onChange={(e) => setEntity(e.target.value)}><option value="">Choose your entity</option>{entities.map((item) => <option key={item.code} value={item.code}>{item.code} — {item.name}</option>)}</select></label>}
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" /></label>
          <Button type="submit" className="wide">Log in as {mode === "student" ? "Student" : "Officer"} <ArrowRight size={17} /></Button>
        </form>
        <p className="prototype-note"><ShieldCheck size={15} /> Prototype only. No real credentials are stored.</p>
      </section>
    </div>
  </main>
}

export default Login
