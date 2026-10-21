import type React from "react"

/** Shared pill button. Props: native button props plus visual variant. State: none. */
function Button({ children, variant = "primary", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "light" | "danger" }) {
  return <button className={`button ${variant} ${className}`} {...props}>{children}</button>
}

export default Button
