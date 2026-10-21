import { ArrowRight } from "lucide-react"
import { Product, peso, totalStock } from "../../data/mockData"
import Button from "../common/Button"
import ProductArt from "../common/ProductArt"
import Badge from "../common/StatusBadge"

/** Catalog product card. Props: product and open callback. State: none. */
function ProductCard({ product, open }: { product: Product; open: (product: Product) => void }) {
  const stock = totalStock(product)
  return <article className="product-card" onClick={() => open(product)}>
    <div className={`card-image ${stock === 0 ? "sold" : ""}`}><ProductArt product={product} />
      <span className="entity-tag">{product.entity}</span>
      {stock === 0 && <Badge status="Sold out" />}
      {stock > 0 && stock <= 5 && <Badge status={`Only ${stock} left`} />}
    </div>
    <div className="card-body">
      <h3>{product.name}</h3><strong className="price">{peso(product.price)}</strong>
      {stock > 5 && <p className="stock-line"><i />Stock: {stock} left</p>}
      <Button variant="ghost" disabled={stock === 0} onClick={(event) => { event.stopPropagation(); open(product) }}>Pre-order <ArrowRight size={16} /></Button>
    </div>
  </article>
}

export default ProductCard
