/** Route keys for the prototype's page-per-screen navigation. */
export type Screen = "home" | "details" | "login" | "preorder" | "orders" | "officer" | "restricted"

/** The authenticated role that controls which navigation and pages are available. */
export type Role = "guest" | "student" | "officer"

/** Tabs nested within the officer dashboard route. */
export type OfficerTab = "orders" | "inventory" | "products"
