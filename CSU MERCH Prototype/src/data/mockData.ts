export type Entity = {
  code: string
  name: string
  office: string
  hours: string
}

export type Product = {
  id: string
  entity: string
  name: string
  price: number
  type: "SHIRT" | "POLO" | "HOOD" | "ONE"
  colors: string[]
  sizes: string[]
  description: string
  specs: { material: string; fit: string; print: string; care: string }
  stock: Record<string, number>
  category: string
  images?: string[]
  imageByColor?: Record<string, string>
}

export type OrderStatus = "Pending Verification" | "Ready for Pickup" | "Claimed"

export type Order = {
  id: string
  student: string
  studentId: string
  productId: string
  size: string
  color: string
  amount: number
  method: "GCash" | "Maya"
  reference: string
  date: string
  status: OrderStatus
  claimCode?: string
  receipt?: string
}

export const entities: Entity[] = [
  { code: "USG", name: "University Student Government", office: "USG Office, Student Center", hours: "Mon–Fri · 1:00–4:00 PM" },
  { code: "LCO", name: "League of Campus Organizations", office: "LCO Hub, Student Center", hours: "Mon–Fri · 1:00–4:00 PM" },
  { code: "CCIS", name: "College of Computing and Information Sciences", office: "CCIS Council Office, Room 105", hours: "Mon–Fri · 1:00–4:00 PM" },
  { code: "CED", name: "College of Education", office: "CED Student Council Office, Room 204", hours: "Mon–Fri · 1:00–4:00 PM" },
  { code: "CAA", name: "College of Agriculture and Agri-Industries", office: "CAA Council Office, Agri Building", hours: "Mon–Fri · 1:00–4:00 PM" },
  { code: "CMNS", name: "College of Mathematics and Natural Sciences", office: "CMNS Council Office, Science Building", hours: "Mon–Fri · 1:00–4:00 PM" },
  { code: "COFES", name: "College of Forestry and Environmental Science", office: "COFES Council Office, Forestry Building", hours: "Mon–Fri · 1:00–4:00 PM" },
  { code: "CEGS", name: "College of Engineering and Geo-Sciences", office: "CEGS Council Office, Engineering Complex", hours: "Mon–Fri · 1:00–4:00 PM" },
  { code: "CHASS", name: "College of Humanities and Social Sciences", office: "CHASS Council Office, Academic Building", hours: "Mon–Fri · 1:00–4:00 PM" },
]

/* ------------------------------------------------------------------ */
/* REAL MERCHANDISE (USG, LCO, CCIS, CAA, CMNS, COFES, CEGS, CHASS)    */
/* ------------------------------------------------------------------ */

type MerchItem = {
  name: string
  price: number
  type: Product["type"]
  category: string
  colors: string[]
  sizes: string[]
  limited?: boolean
}

const SIZES = ["XS", "S", "M", "L"]
const ONE = ["ONE"]

// Default prices (used by USG, CCIS, CMNS, CHASS)
const PRICE = { lanyard: 100, pin: 50, keychain: 30, tote: 220, shirt: 350, jacket: 850 }
// Per-entity prices
const LCO_PRICE = { lanyard: 100, pin: 40, tote: 180, shirt: 350, jacket: 1300 }
const CEGS_PRICE = { lanyard: 89, shirt: 350 }
const COFES_PRICE = { lanyard: 100, shirt: 350 }
const CMNS_PRICE = { lanyard: 120, pin:50, shirt: 350 }
const CHASS_PRICE = { lanyard: 100, shirt: 350 }
const CCIS_PRICE = { lanyard: 100, pin:45, shirt: 350 }
const CED_PRICE = {shirt: 350}

const lanyard = (name: string, colors: string[], limited = false): MerchItem =>
  ({ name, price: PRICE.lanyard, type: "ONE", category: "LANYARD", colors, sizes: ONE, limited })
const pin = (name: string, colors: string[], limited = false): MerchItem =>
  ({ name, price: PRICE.pin, type: "ONE", category: "PIN", colors, sizes: ONE, limited })
const keychain = (name: string, colors: string[]): MerchItem =>
  ({ name, price: PRICE.keychain, type: "ONE", category: "KEYCHAIN", colors, sizes: ONE })
const tote = (name: string, colors: string[]): MerchItem =>
  ({ name, price: PRICE.tote, type: "ONE", category: "TOTE", colors, sizes: ONE })
const shirt = (name: string, colors: string[]): MerchItem =>
  ({ name, price: PRICE.shirt, type: "SHIRT", category: "SHIRT", colors, sizes: SIZES })
const jacket = (name: string, colors: string[]): MerchItem =>
  ({ name, price: PRICE.jacket, type: "HOOD", category: "JACKET", colors, sizes: SIZES })

const merch: Record<string, { event?: string; items: MerchItem[] }> = {
  USG: {
    event: "Sangka",
    items: [
      lanyard("USG Lanyard", ["Black", "Red", "White"]),
      keychain("USG Keychain", ["Black", "Blue", "Orange", "Gold", "Vermilion", "Emerald Green", "Purple", "Crimson Red"]),
      pin("USG Button Pin", ["Black", "Blue", "Orange", "Gold", "Vermilion", "Crimson Red", "Emerald Green", "Purple"]),
    ],
  },
  LCO: {
    event: "Dagyaw",
    items: [
      { ...lanyard("LCO Lanyard", ["White", "Brown"]), price: LCO_PRICE.lanyard },
      { ...pin("LCO Button-Pin", ["White", "Brown"]), price: LCO_PRICE.pin },
      { ...tote("LCO Tote Bag", ["Emerald Green", "White", "Brown"]), price: LCO_PRICE.tote },
      { ...shirt("LCO T-Shirt (Design 1)", ["Black", "White"]), price: LCO_PRICE.shirt },
      { ...shirt("LCO T-Shirt (Design 2)", ["White", "Brown"]), price: LCO_PRICE.shirt },
      { ...jacket("LCO Jacket (Black & Gold)", ["Black", "Gold"]), price: LCO_PRICE.jacket },
      { ...jacket("LCO Jacket (White & Gold)", ["White", "Gold"]), price: LCO_PRICE.jacket },
    ],
  },
  CCIS: {
    event: "Sangka",
    items: [
      { ...lanyard("CCIS Lanyard", ["Black", "Red", "White"], true), price: CCIS_PRICE.lanyard },
      { ...pin("CCIS Button Pin", ["Orange", "White", "Red", "Black"], true), price: CCIS_PRICE.pin },
      { ...shirt("CCIS T-Shirt (Design 1)", ["White", "Orange", "Red"]), price: CCIS_PRICE.shirt },
      { ...shirt("CCIS T-Shirt (Design 2)", ["Black", "Orange", "Red"]), price: CCIS_PRICE.shirt },
    ],
  },
  CAA: { items: [] }, // CAA has no merchandise
  CMNS: {
    event: "Sangka",
    items: [
      { ...lanyard("CMNS Lanyard (Red & White)", ["Crimson Red", "White"]), price: CMNS_PRICE.lanyard },
      { ...lanyard("CMNS Lanyard (Red & Black)", ["Crimson Red", "Black"]), price: CMNS_PRICE.lanyard },
      { ...pin("CMNS Button Pin", ["White", "Crimson Red", "Black"]), price: CMNS_PRICE.pin },
      { ...shirt("CMNS T-Shirt", ["White", "Black", "Crimson Red"]), price: CMNS_PRICE.shirt },
    ],
  },
  CEGS: {
    event: "Sangka",
    items: [
      { ...lanyard("CEGS Lanyard", ["Olive Green", "Mustard Gold", "Black", "White"]), price: CEGS_PRICE.lanyard },
      { ...shirt("CEGS T-Shirt (Design 1)", ["Olive Green", "Mustard Gold", "Black", "White"]), price: CEGS_PRICE.shirt },
      { ...shirt("CEGS T-Shirt (Design 2)", ["Maroon", "Black", "White"]), price: CEGS_PRICE.shirt },
    ],
  },
  CHASS: {
    event: "Sangka",
    items: [
      { ...lanyard("CHASS Lanyard", ["Dark Violet", "Magenta", "Indigo", "White"]),  price: CHASS_PRICE.lanyard },
      { ...shirt("CHASS T-Shirt (Design 1)", ["Royal Purple", "Lavender", "Black", "White"]),  price: CHASS_PRICE.shirt },
      { ...shirt("CHASS T-Shirt (Design 2)", ["White", "Lavender"]),  price: CHASS_PRICE.shirt },
    ],
  },
  COFES: {
    event: "Sangka",
    items: [
      { ...lanyard("COFES Lanyard", ["Forest Green", "White", "Black"]), price: COFES_PRICE.lanyard },
      { ...shirt("COFES T-Shirt", ["Forest Green", "White", "Black"]), price: COFES_PRICE.shirt },
    ],
  },
  CED: {
    event: "Sangka",
    items: [
      { ...lanyard("CED T-Shirt", ["Forest Green", "White", "Black"]), price: CED_PRICE.shirt },
      
    ],
  },
}

/**
 * Product images, keyed by product id (entity code + position in the lists above).
 * Files live in /public/assets. Products without an entry show built-in artwork.
 */
const merchImages: Record<string, string[]> = {
  "USG-1": ["/assets/usg-lanyard.jpg"],
  "USG-2": ["/assets/usg-keychains.jpg"],
  "USG-3": ["/assets/usg-pins.jpg"],
  // CCIS-1 (lanyard) and CCIS-2 (button pin): add their own photos here when available
  "CCIS-1": ["/assets/ccis-lanyard.png"],
  "CCIS-2": ["/assets/ccis-button-pins.png"],
  "CCIS-3": ["/assets/ccis-shirt-white.jpg"],
  "CCIS-4": ["/assets/ccis-shirt-black.jpg"],
  "LCO-1": ["/assets/lco-lanyard.png"],
  "LCO-2": ["/assets/lco-button-pin.png"],
  "LCO-3": ["/assets/lco-totebag.jpg"],
  "LCO-4": ["/assets/lco-T-Shirt1.png"],
  "LCO-5": ["/assets/lco-T-Shirt2.png"],
  "LCO-6": ["/assets/lco-Jacket.jpg"],
  "LCO-7": ["/assets/lco-Jacket2.jpg"],
  "CEGS-1": ["/assets/cegs-lanyard.png"],
  "CEGS-2": ["/assets/cegs-T-Shirt1.jpg"],
  "CEGS-3": ["/assets/cegs-T-Shirt2.jpg"],
  "COFES-1": ["/assets/cofes-lanyard.png"],
  "COFES-2": ["/assets/cofes-T-Shirt.jpg"],
  "CMNS-1": ["/assets/cmns-lanyard1.jpg"],
  "CMNS-2": ["/assets/cmns-lanyard2.jpg"],
  "CMNS-3": ["/assets/cmns-button-pins.jpg"],
  "CMNS-4": ["/assets/cmns-T-Shirt.jpg"],
  "CHASS-1": ["/assets/chass-lanyard.jpg"],
  "CHASS-2": ["/assets/chass-T-Shirt1.jpg"],
  "CHASS-3": ["/assets/chass-T-Shirt2.jpg"],
  "CED-1": ["/assets/ced-T-Shirt.jpg"],

}

/* ------------------------------------------------------------------ */
/* LEGACY SAMPLE CATALOG (CED only, no real data yet)                  */
/* ------------------------------------------------------------------ */

const legacyCatalog: Record<string, [string, number, Product["type"]][]> = {}

const colorSets = [
  ["Forest Green", "White", "Black"],
  ["Forest Green", "White", "Navy"],
  ["Black", "Gray", "Maroon"],
  ["Forest Green", "Navy"],
]

function categoryFor(name: string, type: Product["type"]) {
  if (type !== "ONE") return type
  const categories = ["Lanyard", "Pin", "Keychain", "Tote", "Tumbler", "Mug", "Notebook", "Cap", "Hat", "Sticker", "Holder", "Sleeve", "Pen"]
  return categories.find((category) => name.includes(category))?.toUpperCase() || "ACCESSORY"
}

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

function makeSpecs(name: string, type: Product["type"]): Product["specs"] {
  return {
    material: type === "HOOD" ? "Premium cotton fleece" : type === "ONE" ? "Durable campus-grade material" : "180 GSM combed cotton",
    fit: type === "ONE" ? "One size" : "Unisex regular fit",
    print: name.includes("Lanyard") ? "Sublimation" : "High-detail screen print",
    care: "Hand wash cold; dry in shade",
  }
}

function makeStock(colors: string[], sizes: string[], itemIndex: number, entityIndex: number, limited = false) {
  const stock: Record<string, number> = {}
  colors.forEach((color, ci) =>
    sizes.forEach((size, si) => {
      const key = `${color}|${size}`
      stock[key] = limited
        ? 2 + ((ci + si) % 3)
        : 4 + ((entityIndex * 7 + itemIndex * 5 + ci * 3 + si * 2) % 14)
    }),
  )
  return stock
}

export const initialProducts: Product[] = entities.flatMap((entity, entityIndex) => {
  const real = merch[entity.code]
  if (real) {
    return real.items.map((item, itemIndex): Product => {
      const id = `${entity.code}-${itemIndex + 1}`
      return {
        id,
        entity: entity.code,
        name: item.name,
        price: item.price,
        type: item.type,
        colors: item.colors,
        sizes: item.sizes,
        description: `Official ${entity.code} merchandise for ${real.event ?? "campus events"}${item.limited ? ". Limited supply." : "."}`,
        specs: makeSpecs(item.name, item.type),
        stock: makeStock(item.colors, item.sizes, itemIndex, entityIndex, item.limited),
        category: item.category,
        images: merchImages[id],
      }
    })
  }

  // Sample data for entities without real merchandise yet (CED)
  return (legacyCatalog[entity.code] ?? []).map(([name, price, type], itemIndex): Product => {
    const colors = colorSets[(entityIndex + itemIndex) % colorSets.length]
    const sizes = type === "ONE" ? ["ONE"] : ["S", "M", "L", "XL", "XXL"]
    return {
      id: `${entity.code}-${itemIndex + 1}`,
      entity: entity.code,
      name,
      price,
      type,
      colors,
      sizes,
      description: `Official ${entity.code} merchandise made for everyday campus life, events, and organization activities.`,
      specs: makeSpecs(name, type),
      stock: makeStock(colors, sizes, itemIndex, entityIndex),
      category: categoryFor(name, type),
    }
  })
})

export const totalStock = (product: Product) => Object.values(product.stock).reduce((sum, value) => sum + value, 0)
export const entityFor = (code: string) => entities.find((entity) => entity.code === code)!
export const peso = (value: number) => `₱${value.toLocaleString("en-PH")}`

export function seedOrders(entity = "CCIS"): Order[] {
  const productIds = initialProducts.filter((product) => product.entity === entity && totalStock(product) > 0).map((product) => product.id)
  if (productIds.length === 0) return [] // e.g. CAA has no merchandise
  const names = ["Mika Santos", "Lance Rivera", "Aya Villanueva", "Noel Dela Cruz", "Bea Mendoza", "Paolo Reyes", "Iris Flores", "Ken Navarro", "Sam Aquino"]
  const statuses: OrderStatus[] = ["Pending Verification","Pending Verification","Pending Verification","Pending Verification","Pending Verification","Ready for Pickup","Ready for Pickup","Claimed","Claimed"]
  return statuses.map((status, index) => {
    const product = initialProducts.find((item) => item.id === productIds[index % productIds.length])!
    return {
      id: `CSU-${["A18F2C","B49D7E","C62A8F","D91B3A","E20C5D","7F3A9B","8E1D4C","5A9B2E","3C7F1D"][index]}`,
      student: names[index],
      studentId: `2023-00${128 + index}`,
      productId: product.id,
      size: product.sizes[0],
      color: product.colors[0],
      amount: product.price,
      method: index % 2 ? "Maya" : "GCash",
      reference: `92${38104510 + index}`,
      date: `Jun ${14 + index}, 2025 · ${9 + index}:20 AM`,
      status,
      claimCode: status === "Pending Verification" ? undefined : `CSU-${["7F3A9B","8E1D4C","5A9B2E","3C7F1D"][index % 4]}`,
    }
  })
}

export const demoStudentOrders: Order[] = [
  { ...seedOrders("CCIS")[0], id: "CSU-4D8A1E", student: "Alex Garcia", studentId: "2023-00123" },
  { ...seedOrders("USG")[5], id: "CSU-7F3A9B", student: "Alex Garcia", studentId: "2023-00123", status: "Ready for Pickup", claimCode: "CSU-7F3A9B" },
  { ...seedOrders("CED")[8], id: "CSU-1C6E9D", student: "Alex Garcia", studentId: "2023-00123", status: "Claimed", claimCode: "CSU-1C6E9D" },
]

/** Static demo credentials used by the client-only login form. */
export const demoUsers = {
  student: { id: "2023-00123", password: "student123", name: "Alex Garcia", initials: "AG" },
  officer: { id: "OFC-0001", password: "officer123", name: "Demo Officer" },
}

/** Visual asset and color values shared by product presentation components. */
export const heroImage = "/assets/csu-campus.jpg"
export const swatchColors: Record<string, string> = {
  "Forest Green": "#14532d", White: "#ffffff", Black: "#171717", Navy: "#172554", Maroon: "#7f1d1d", Gray: "#6b7280",
  Red: "#dc2626", "Crimson Red": "#b91c1c", Orange: "#f97316", Blue: "#2563eb",
  Gold: "#d4a017", "Mustard Gold": "#d4a017", Vermilion: "#e34234",
  "Emerald Green": "#047857", "Olive Green": "#6b7f2a",
  Purple: "#7e22ce", "Royal Purple": "#6b21a8", "Dark Violet": "#5b21b6",
  Magenta: "#c026d3", Indigo: "#4338ca", Lavender: "#c4b5fd", Brown: "#78350f",
}