import { ArrowRight, ShieldCheck } from "lucide-react"
import Button from "../components/common/Button"

/** Officer-only access screen. Props: login and home actions. State: none. */
function Restricted({ login, home }: { login: () => void; home: () => void }) {
  return <main className="page restricted"><div className="empty-state"><ShieldCheck /><span className="eyebrow">RESTRICTED AREA</span><h1>Officers only</h1><p>This workspace is available only to authenticated merchandise officers.</p><Button onClick={login}>Log in as Officer <ArrowRight size={17} /></Button><Button variant="ghost" onClick={home}>Return to catalog</Button></div></main>
}

export default Restricted
