import { useState } from "react"
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, Package } from "lucide-react"
import { entityFor, peso, Product, swatchColors, totalStock } from "../data/mockData"
import { Role } from "../types"
import Button from "../components/common/Button"
import ProductArt from "../components/common/ProductArt"

/** Product detail route. Props: product, role and navigation actions. State: selected color, size and size-guide visibility. */
function Details({ product, role, back, login, preorder }: { product: Product; role: Role; back: () => void; login: () => void; preorder: (color: string, size: string) => void }) {
  const [color, setColor] = useState("")
  const [size, setSize] = useState(product.type === "ONE" ? "ONE" : "")
  const [guide, setGuide] = useState(false)
  const total = totalStock(product)
  const selectedStock = color && size ? product.stock[`${color}|${size}`] || 0 : null
  const thumbnails = product.images?.length
    ? [...product.images, ...product.colors].slice(0, 3)
    : product.colors.slice(0, 3)
  return <main className="detail-page page">
    <button className="back-link" onClick={back}><ArrowLeft size={18} /> Back to catalog</button>
    <div className="detail-grid">
      <div className="gallery"><div className="main-art"><ProductArt product={product} color={color || product.colors[0]} /></div>
        <div className="thumbs">{thumbnails.map((item, index) => {
          const isImage = product.images?.includes(item)
          const linkedColor = isImage && product.imageByColor
            ? Object.keys(product.imageByColor).find((key) => product.imageByColor?.[key] === item)
            : item
          return <button key={item} className={(linkedColor && color === linkedColor) || (!color && index === 0) ? "active" : ""} onClick={() => linkedColor && setColor(linkedColor)}>
            <ProductArt product={product} color={linkedColor} image={isImage ? item : undefined} small />
          </button>
        })}</div>
      </div>
      <section className="product-info">
        <span className="full-entity">{product.entity} · {entityFor(product.entity).name}</span>
        <h1>{product.name}</h1><strong className="detail-price">{peso(product.price)}</strong>
        <div className={`detail-stock ${total <= 5 ? "low" : ""} ${total === 0 ? "out" : ""}`}><i />{total === 0 ? "Sold out" : `Stock: ${total} left`}</div>
        <div className="divider" />
        <fieldset><legend>Color <small>{color}</small></legend><div className="swatches">{product.colors.map((item) => <button key={item} className={color === item ? "selected" : ""} onClick={() => { setColor(item); if (size && !product.stock[`${item}|${size}`]) setSize(product.type === "ONE" ? "ONE" : "") }}><span style={{ background: swatchColors[item] }} />{item}</button>)}</div></fieldset>
        {product.type !== "ONE" && <fieldset><legend>Size <small>{size || "Choose a size"}</small></legend><div className="size-row">{product.sizes.map((item) => { const available = !color || product.stock[`${color}|${item}`] > 0; return <button key={item} disabled={!available} className={size === item ? "selected" : ""} onClick={() => setSize(item)}>{item}</button> })}</div></fieldset>}
        {color && size && <p className="variant-stock"><CheckCircle2 size={17} /> {selectedStock ? `${selectedStock} available in ${color} / ${size === "ONE" ? "One size" : size}` : "This variant is unavailable"}</p>}
        <div className="specs"><h3>Item specs</h3><dl><div><dt>Material</dt><dd>{product.specs.material}</dd></div><div><dt>Fit / Size</dt><dd>{product.specs.fit}</dd></div><div><dt>Print</dt><dd>{product.specs.print}</dd></div><div><dt>Care</dt><dd>{product.specs.care}</dd></div></dl></div>
        {product.type !== "ONE" && <div className="size-guide"><button onClick={() => setGuide(!guide)}>Size guide <ChevronDown size={18} /></button>{guide && <table><thead><tr><th>Size</th><th>Chest</th><th>Length</th></tr></thead><tbody>{product.sizes.map((item, index) => <tr key={item}><td>{item}</td><td>{36 + index * 2}"</td><td>{25 + index}"</td></tr>)}</tbody></table>}</div>}
        <div className="pickup-box"><Package size={20} /><div><b>Campus pickup</b><p>{entityFor(product.entity).office}</p><small>{entityFor(product.entity).hours}</small></div></div>
        <Button className="wide" disabled={!color || !size || !selectedStock} onClick={() => role === "student" ? preorder(color, size) : login()}>Pre-order now <ArrowRight size={17} /></Button>
        <p className="order-note">One item per pre-order. You can place another pre-order after this one.</p>
      </section>
    </div>
  </main>
}

export default Details
