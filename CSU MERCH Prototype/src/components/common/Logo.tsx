/** Brand lockup. Props: optional inverse color treatment. State: none. */
function Logo({ inverse = false }: { inverse?: boolean }) {
  return <span className={`logo-lockup ${inverse ? "inverse" : ""}`}>
    <span className="logo-mark"><img src="/assets/csu-logo.png" alt="Caraga State University logo" /></span>
    <span className="wordmark"><strong>CSU</strong><small>MERCH</small></span>
  </span>
}

export default Logo
