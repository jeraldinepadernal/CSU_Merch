import { useState } from "react"
import { ArrowRight, Check, ChevronDown, Package, Plus, Sparkles, X } from "lucide-react"
import { entities, entityFor, heroImage, Product } from "../data/mockData"
import Button from "../components/common/Button"
import ProductCard from "../components/student/ProductCard"
import OrderGuide from "../components/student/OrderGuide"

/** Catalog route. Props: products, search/filter state and open action. State: sort and visible item limit. */
function Home({ products, search, selectedEntity, setSelectedEntity, setSearch, open }: {
  products: Product[]; search: string; selectedEntity: string; setSelectedEntity: (value: string) => void; setSearch: (value: string) => void; open: (product: Product) => void
}) {
  const [sort, setSort] = useState("recommended")
  const [limit, setLimit] = useState(12)
  const filtered = (() => {
    const term = search.trim().toLowerCase()
    const items = products.filter((product) => {
      const entity = entityFor(product.entity)
      return (!selectedEntity || product.entity === selectedEntity) &&
        (!term || `${product.name} ${product.entity} ${entity.name} ${product.type} ${product.category}`.toLowerCase().includes(term))
    })
    return [...items].sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : sort === "name" ? a.name.localeCompare(b.name) : a.id.localeCompare(b.id))
  })()
  const entity = selectedEntity ? entityFor(selectedEntity) : null
  return <>
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(2,44,34,.98) 0%, rgba(6,78,59,.9) 43%, rgba(6,78,59,.54) 100%), url(${heroImage})` }}>
      <div className="contours" />
      <div className="hero-content">
        <span className="eyebrow light"><Sparkles size={16} /> CARAGA STATE UNIVERSITY</span>
        <h1>Campus<br />merchandise</h1>
        <p>Official pieces from the USG, LCO, and every college—reserved online, picked up on campus.</p>
        <Button variant="light" onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}>Browse the collection <ArrowRight size={17} /></Button>
        <div className="trust-row">
          {["USG, LCO & 7 Colleges", "Secure GCash Uploads", "100% Inventory", "24100+ Guarantees"].map((item) => <span key={item}><Check size={14} />{item}</span>)}
        </div>
      </div>
    </section>
    <main id="catalog" className="catalog-shell">
      <div className="filter-scroll">
        {["", ...entities.map((item) => item.code)].map((code) =>
          <button key={code || "All"} className={`filter-pill ${selectedEntity === code ? "selected" : ""}`} onClick={() => { setSelectedEntity(code); setLimit(12) }}>{code || "All"}</button>)}
      </div>
      {entity && <div className="entity-banner"><div><span className="entity-monogram">{entity.code}</span><div><h2>{entity.name}</h2><p><Package size={16} /> Pickup at {entity.office} · {entity.hours}</p></div></div><button onClick={() => setSelectedEntity("")}><X size={18} /> Clear</button></div>}
      <div className="catalog-heading">
        <div><span className="eyebrow">OFFICIAL CSU COLLECTION</span><h2>{search ? `Results for “${search}”` : entity ? `${entity.code} merchandise` : "Explore the catalog"}</h2><p>Showing {filtered.length} items</p></div>
        <label className="sort-label">Sort by<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recommended</option><option value="low">Price low to high</option><option value="high">Price high to low</option><option value="name">Name A–Z</option></select><ChevronDown size={16} /></label>
      </div>
      {filtered.length ? <>
        <div className="product-grid">{filtered.slice(0, limit).map((product) => <ProductCard key={product.id} product={product} open={open} />)}</div>
        {limit < filtered.length && <div className="load-more"><Button variant="secondary" onClick={() => setLimit(limit + 12)}>Load more products <Plus size={16} /></Button></div>}
      </> : <div className="empty-state"><Package /><h2>No items found</h2><p>Try another college or keyword.</p><Button onClick={() => { setSearch(""); setSelectedEntity("") }}>Clear filters</Button></div>}
    </main>
    <OrderGuide />
  </>
}

export default Home
