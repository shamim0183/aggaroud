import { motion } from "framer-motion"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"
import productsData from "../data/products.json"

export default function Wishlist() {
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { wishlist, removeFromWishlist } = useWishlist()
  const [wishlistProducts, setWishlistProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWishlistProducts()
  }, [wishlist])

  const loadWishlistProducts = () => {
    if (!user) {
      setWishlistProducts([])
      setLoading(false)
      return
    }

    // Filter products based on wishlist IDs
    const products = productsData.filter((p) => wishlist.includes(p.id))
    setWishlistProducts(products)
    setLoading(false)
  }

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light text-brand-black mb-2 uppercase tracking-wider">
            Saved Items
          </h1>
          <p className="text-gray-600">
            {wishlistProducts.length}{" "}
            {wishlistProducts.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Wishlist Grid */}
        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-light text-brand-black mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Save your favorite items for later
            </p>
            <Link
              to="/products"
              className="inline-block bg-brand-black text-white px-8 py-3 hover:bg-gray-800 transition-colors uppercase tracking-wider text-sm cursor-pointer"
            >
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative mb-4 overflow-hidden bg-gray-50">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors cursor-pointer"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>

                <div className="space-y-2">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-light text-lg text-brand-black hover:text-brand-gold transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-lg font-semibold text-brand-black">
                    ${product.price}
                  </p>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-brand-black text-white py-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors mt-4 uppercase tracking-wider text-sm cursor-pointer"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
