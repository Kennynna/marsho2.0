"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import ProductCard from "@/components/product-card"
import CopyNotification from "@/components/copy-notification"

// Образцы товаров
const PRODUCTS = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-quality sound with noise cancellation",
    price: 129.99,
    sku: "SKU-WH-001",
    image: "/wireless-headphones.png",
  },
  {
    id: 2,
    name: "USB-C Fast Charger",
    description: "Quick charging technology, universal compatibility",
    price: 24.99,
    sku: "SKU-CH-002",
    image: "/usb-charger.jpg",
  },
  {
    id: 3,
    name: "Portable Power Bank",
    description: "20000mAh capacity, dual USB ports",
    price: 39.99,
    sku: "SKU-PB-003",
    image: "/portable-power-bank.png",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    description: "Waterproof, 360° sound, 12-hour battery",
    price: 79.99,
    sku: "SKU-BS-004",
    image: "/bluetooth-speaker.jpg",
  },
  {
    id: 5,
    name: "Phone Screen Protector",
    description: "Tempered glass, easy installation",
    price: 9.99,
    sku: "SKU-SP-005",
    image: "/screen-protector.png",
  },
  {
    id: 6,
    name: "Wireless Mouse",
    description: "Ergonomic design, precision tracking",
    price: 34.99,
    sku: "SKU-MS-006",
    image: "/wireless-mouse.png",
  },
  {
    id: 7,
    name: "Laptop Stand",
    description: "Adjustable height, aluminum construction",
    price: 44.99,
    sku: "SKU-LS-007",
    image: "/laptop-stand.png",
  },
  {
    id: 8,
    name: "USB Hub",
    description: "7-port expansion, high-speed data transfer",
    price: 49.99,
    sku: "SKU-UH-008",
    image: "/usb-hub.png",
  },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedSku, setCopiedSku] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const query = searchQuery.toLowerCase()
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
      )
    })
  }, [searchQuery])

  const handleCopySku = (sku: string) => {
    navigator.clipboard.writeText(sku)
    setCopiedSku(sku)
    setTimeout(() => setCopiedSku(null), 2000)
  }

  return (
    <main className="flex flex-col h-screen w-screen bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border px-4 py-4 bg-card">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-primary">ShopHub</h1>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Browse our collection</p>
      </header>

      {/* Search Bar */}
      <div className="flex-shrink-0 px-4 py-3 bg-secondary border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-background text-foreground border border-input focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 pb-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onCopySku={handleCopySku}
                isCopied={copiedSku === product.sku}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-foreground font-medium">No products found</p>
            <p className="text-sm text-muted-foreground mt-1">Try different search terms</p>
          </div>
        )}
      </div>

      {/* Copy Notification */}
      {copiedSku && <CopyNotification sku={copiedSku} />}
    </main>
  )
}
