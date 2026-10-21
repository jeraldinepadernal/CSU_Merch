import type React from "react"
import { Check, Minus, Plus } from "lucide-react"
import { Product, totalStock } from "../../data/mockData"
import Button from "../common/Button"
import ProductArt from "../common/ProductArt"
import Badge from "../common/StatusBadge"

/** Officer stock editor. Props: products, product setter and toast callback. State: lives in parent products state. */
function Inventory({ products, setProducts, toast }: { products: Product[]; setProducts: React.Dispatch<React.SetStateAction<Product[]>>; toast: (message: string) => void }) {
  const update = (id: string, key: string, value: number) => setProducts((current) => current.map((product) => product.id === id ? { ...product, stock: { ...product.stock, [key]: Math.max(0, value) } } : product))
  const soldOut = (product: Product, checked: boolean) => {
    const amount = checked ? 0 : Number(window.prompt("Restock each variant with how many items?", "5") || 0)
    setProducts((current) => current.map((item) => item.id === product.id ? { ...item, stock: Object.fromEntries(Object.keys(item.stock).map((key) => [key, amount])) } : item))
  }
  return <section className="dash-panel inventory-panel"><div className="panel-heading"><div><h2>Inventory</h2><p>Adjust stock by color and size. Changes appear in the catalog instantly.</p></div><Button onClick={() => toast("Inventory changes saved.")}>Save changes <Check size={16} /></Button></div>
    <div className="inventory-list">{products.map((product) => <article key={product.id}><div className="inventory-product"><ProductArt product={product} small /><div><h3>{product.name}</h3><p>{totalStock(product)} total units</p>{totalStock(product) === 0 ? <Badge status="Sold out" /> : totalStock(product) <= 5 ? <Badge status="Low stock" /> : null}</div><label className="switch-label">Sold out<input type="checkbox" checked={totalStock(product) === 0} onChange={(e) => soldOut(product, e.target.checked)} /><span /></label></div>
      <div className="variant-grid">{Object.entries(product.stock).map(([key, value]) => <label key={key}><span>{key.replace("|", " · ")}</span><div><button onClick={() => update(product.id, key, value - 1)}><Minus size={14} /></button><input type="number" value={value} onChange={(e) => update(product.id, key, Number(e.target.value))} /><button onClick={() => update(product.id, key, value + 1)}><Plus size={14} /></button></div></label>)}</div>
    </article>)}</div>
  </section>
}

export default Inventory
