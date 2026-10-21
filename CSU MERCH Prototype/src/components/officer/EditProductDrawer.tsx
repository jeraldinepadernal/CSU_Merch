import { useState } from "react"
import { Check, CircleAlert, Image as ImageIcon, X } from "lucide-react"
import { Product, swatchColors } from "../../data/mockData"
import Button from "../common/Button"
import ProductArt from "../common/ProductArt"

/** Product editing drawer. Props: product, close and save actions. State: editable draft and validation error. */
function EditProduct({ product, close, save }: { product: Product; close: () => void; save: (product: Product) => void }) {
  const [draft, setDraft] = useState({ ...product, specs: { ...product.specs } })
  const [error, setError] = useState("")
  const submit = () => {
    if (!draft.name.trim() || !draft.description.trim() || draft.price <= 0) return setError("Name, description, and a valid price are required.")
    save(draft)
  }
  return <div className="drawer-backdrop" onMouseDown={close}><aside className="edit-drawer" onMouseDown={(e) => e.stopPropagation()}><div className="drawer-heading"><div><span className="eyebrow">CATALOG EDITOR</span><h2>Edit product</h2></div><button onClick={close}><X /></button></div>{error && <div className="error-banner"><CircleAlert size={16} />{error}</div>}
    <div className="drawer-art"><ProductArt product={draft} /><button><ImageIcon size={16} /> Replace image</button></div>
    <div className="drawer-form"><label>Item name<input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></label><label>Price (₱)<input type="number" value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} /></label><label>Description<textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /></label>
      <div className="two-fields"><label>Material<input value={draft.specs.material} onChange={(e) => setDraft({ ...draft, specs: { ...draft.specs, material: e.target.value } })} /></label><label>Fit / Size<input value={draft.specs.fit} onChange={(e) => setDraft({ ...draft, specs: { ...draft.specs, fit: e.target.value } })} /></label></div>
      <div className="two-fields"><label>Print method<input value={draft.specs.print} onChange={(e) => setDraft({ ...draft, specs: { ...draft.specs, print: e.target.value } })} /></label><label>Care<input value={draft.specs.care} onChange={(e) => setDraft({ ...draft, specs: { ...draft.specs, care: e.target.value } })} /></label></div>
      <fieldset><legend>Colors</legend><div className="chip-list">{draft.colors.map((color) => <span key={color}><i style={{ background: swatchColors[color] }} />{color}</span>)}</div></fieldset><fieldset><legend>Sizes</legend><div className="chip-list">{draft.sizes.map((size) => <span key={size}>{size}</span>)}</div></fieldset>
    </div><div className="drawer-actions"><Button variant="secondary" onClick={close}>Cancel</Button><Button onClick={submit}>Save changes <Check size={16} /></Button></div></aside></div>
}

export default EditProduct
