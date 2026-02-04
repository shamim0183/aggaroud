import { useEffect, useState } from "react"
import { fetchProducts } from "../lib/shopify"

export default function ShopifyTest() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadProducts() {
            try {
                console.log("🔍 Fetching products from Shopify...")
                const shopifyProducts = await fetchProducts()

                console.log("✅ Products fetched from Shopify:", shopifyProducts)
                console.log(`📦 Total products: ${shopifyProducts.length}`)

                shopifyProducts.forEach((product, index) => {
                    console.log(`\n--- Product ${index + 1} ---`)
                    console.log("Name:", product.name)
                    console.log("Price:", product.price)
                    console.log("Variants:", product.variants)
                    console.log("Image:", product.image)
                })

                setProducts(shopifyProducts)
                setLoading(false)
            } catch (err) {
                console.error("❌ Error fetching products:", err)
                setError(err.message)
                setLoading(false)
            }
        }

        loadProducts()
    }, [])

    if (loading) {
        return (
            <div className="p-8 bg-blue-50 rounded-lg">
                <p className="text-lg">🔄 Loading products from Shopify...</p>
                <p className="text-sm text-gray-600 mt-2">Check browser console for logs</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-8 bg-red-50 rounded-lg">
                <p className="text-lg text-red-600">❌ Error: {error}</p>
                <p className="text-sm text-gray-600 mt-2">Check browser console for details</p>
            </div>
        )
    }

    return (
        <div className="p-8 bg-green-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">✅ Shopify Connection Working!</h2>
            <p className="text-lg mb-4">Found {products.length} products from Shopify</p>

            <div className="space-y-4">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-bold text-xl">{product.name}</h3>
                        <p className="text-gray-600">Price: ${product.price}</p>
                        <p className="text-sm text-gray-500">Variants: {product.variants?.length || 0}</p>
                        {product.image && (
                            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mt-2 rounded" />
                        )}
                    </div>
                ))}
            </div>

            <p className="text-sm text-gray-600 mt-4">✨ Check browser console for detailed logs</p>
        </div>
    )
}
