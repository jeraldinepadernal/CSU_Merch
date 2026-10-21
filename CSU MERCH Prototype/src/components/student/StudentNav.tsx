import { useState } from "react"
import { Menu, Search, X } from "lucide-react"
import { Role, Screen } from "../../types"
import Button from "../common/Button"
import Logo from "../common/Logo"

/** Student navigation. Props: role, screen, search and navigation actions. State: mobile menu visibility. */
function StudentNav({ role, screen, search, onSearch, navigate, logout }: {
  role: Role; screen: Screen; search: string; onSearch: (value: string) => void; navigate: (screen: Screen) => void; logout: () => void
}) {
  const [menu, setMenu] = useState(false)
  return <header className="student-nav">
    <button className="brand-button" onClick={() => navigate("home")} aria-label="Go to home"><Logo /></button>
    <nav className={menu ? "open" : ""} aria-label="Main navigation">
      <button className={screen === "home" ? "active" : ""} onClick={() => { navigate("home"); setMenu(false) }}>HOME</button>
      <button className={screen === "orders" ? "active" : ""} onClick={() => { navigate("orders"); setMenu(false) }}>MY ORDER</button>
      <label className="nav-search">
        <Search size={17} />
        <span className="sr-only">Search in catalog</span>
        <input value={search} placeholder="Search in catalog..." onChange={(event) => { onSearch(event.target.value); navigate("home") }} />
      </label>
      {role === "student" ? <div className="user-nav"><span className="avatar">AG</span><span>Hi, Alex</span><Button variant="ghost" onClick={logout}>Log out</Button></div>
        : <button onClick={() => navigate("login")}>LOG IN</button>}
    </nav>
    <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X /> : <Menu />}</button>
  </header>
}

export default StudentNav
