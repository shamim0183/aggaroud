import { useEffect, useState } from "react"
import ProductGrid from "../components/ProductGrid"
import { fetchProducts } from "../lib/shopify"

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        console.log("🔍 Loading products from Shopify...")
        const shopifyProducts = await fetchProducts()
        console.log("✅ Products loaded:", shopifyProducts.length)
        setProducts(shopifyProducts)
        setLoading(false)
      } catch (err) {
        console.error("❌ Error loading products:", err)
        setError(err.message)
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen py-32 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <h1 className="font-serif text-3xl md:text-5xl mb-4 text-brand-black">
              Loading Products...
            </h1>
            <p className="text-gray-600">Fetching from Shopify</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen py-32 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-3xl md:text-5xl mb-4 text-red-600">
            Error Loading Products
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-brand-black text-white rounded hover:bg-brand-gold transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="font-serif text-3xl md:text-5xl mb-4 text-brand-black">
            Our Collection
          </h1>
          <p className="text-gray-600">
            Explore our luxury oud fragrances ({products.length} products)
          </p>
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  )
}
