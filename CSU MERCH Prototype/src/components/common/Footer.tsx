import { Screen } from "../../types"
import Logo from "./Logo"

/** Role-aware footer. Props: officer mode and navigation callback. State: none. */
function Footer({ officer = false, navigate }: { officer?: boolean; navigate: (screen: Screen) => void }) {
  if (officer) return <footer className="officer-footer"><Logo inverse /><span>Caraga State University · Campus Merch Order System · Prototype</span></footer>
  return <footer className="footer">
    <div><Logo inverse /><p>Official campus merchandise,<br />pre-ordered with ease.</p></div>
    <div className="footer-links"><button onClick={() => navigate("home")}>Home</button><button onClick={() => navigate("orders")}>My order</button><button onClick={() => navigate("home")}>Order guide</button></div>
    <small>Caraga State University · Prototype</small>
  </footer>
}

export default Footer
