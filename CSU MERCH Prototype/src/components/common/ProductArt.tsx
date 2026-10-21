import type React from "react"
import { BookOpen, Package, ShoppingBag } from "lucide-react"
import { Product, swatchColors } from "../../data/mockData"

/** Product image or fallback placeholder. Props: product, optional color/image, compact flag. State: none. */
function ProductArt({ product, color, image, small = false }: { product: Product; color?: string; image?: string; small?: boolean }) {
  const selected = color || product.colors[0]
  const productImage = image || (color && product.imageByColor?.[color]) || product.images?.[0]
  const icon = product.type === "ONE" ? (product.name.includes("Tote") ? <ShoppingBag /> : product.name.includes("Notebook") ? <BookOpen /> : <Package />) : <ShoppingBag />
  return <div className={`product-art ${small ? "small" : ""}`} style={{ "--product-color": swatchColors[selected] || "#14532d" } as React.CSSProperties}>
    {productImage
      ? <img src={productImage} alt={`${product.entity} ${product.category.toLowerCase()} merchandise`} />
      : <>
          <span className="art-orbit" />
          <span className="art-icon">{icon}</span>
          <small>{product.type === "ONE" ? product.name.split(" ").slice(-2).join(" ") : product.type}</small>
        </>}
  </div>
}

export default ProductArt
