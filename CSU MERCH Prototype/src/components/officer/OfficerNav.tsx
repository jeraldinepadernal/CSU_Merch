import { useState } from "react"
import { LogOut, Menu, X } from "lucide-react"
import { OfficerTab } from "../../types"
import Button from "../common/Button"
import Logo from "../common/Logo"

/** Officer navigation. Props: entity, active tab and session actions. State: mobile menu visibility. */
function OfficerNav({ entity, tab, setTab, logout }: { entity: string; tab: OfficerTab; setTab: (tab: OfficerTab) => void; logout: () => void }) {
  const [menu, setMenu] = useState(false)
  return <header className="officer-nav">
    <button className="brand-button" onClick={() => setTab("orders")}><Logo inverse /></button>
    <nav className={menu ? "open" : ""}>
      {(["orders", "inventory", "products"] as OfficerTab[]).map((item) =>
        <button key={item} className={tab === item ? "active" : ""} onClick={() => { setTab(item); setMenu(false) }}>{item.toUpperCase()}</button>)}
      <span className="officer-pill">OFFICER · {entity}</span>
      <Button variant="light" onClick={logout}><LogOut size={16} /> Log out</Button>
    </nav>
    <button className="menu-button inverse" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
  </header>
}

export default OfficerNav
