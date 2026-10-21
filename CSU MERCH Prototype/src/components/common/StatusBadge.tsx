

/** Text-and-dot order or stock badge. Props: status label. State: none. */
function Badge({ status }: { status: string }) {
  const slug = status.toLowerCase().replaceAll(" ", "-")
  return <span className={`status ${slug}`}><i />{status}</span>
}

export default Badge
