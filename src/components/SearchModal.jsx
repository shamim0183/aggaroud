import { AnimatePresence, motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchProducts } from "../lib/shopify"

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch all products from Shopify when modal opens
  useEffect(() => {
    if (isOpen && allProducts.length === 0) {
      setLoading(true)
      fetchProducts()
        .then((products) => {
          setAllProducts(products)
          setLoading(false)
        })
        .catch((err) => {
          console.error("Error fetching products for search:", err)
          setLoading(false)
        })
    }
  }, [isOpen, allProducts.length])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Search products with smart prioritization
  useEffect(() => {
    if (searchQuery.trim() && allProducts.length > 0) {
      const query = searchQuery.toLowerCase()

      // Separate matches by priority
      const nameMatches = []
      const descriptionMatches = []

      allProducts.forEach((product) => {
        const name = product.name.toLowerCase()
        const description = product.description?.toLowerCase() || ""

        // Priority 1: Name contains the search query
        if (name.includes(query)) {
          nameMatches.push(product)
        }
        // Priority 2: Description contains the query (but not in name)
        else if (description.includes(query)) {
          descriptionMatches.push(product)
        }
      })

      // Combine results: name matches first, then description matches
      const combined = [...nameMatches, ...descriptionMatches]
      setSearchResults(combined.slice(0, 5)) // Show max 5 results
    } else {
      setSearchResults([])
    }
  }, [searchQuery, allProducts])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-lg shadow-2xl z-50 p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl text-brand-black">
                Search Products
              </h3>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-6">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for fragrances..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-gold transition-colors"
                autoFocus
              />
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <p className="text-center text-gray-500 py-8">
                  Loading products...
                </p>
              ) : searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-brand-black">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          ${product.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <p className="text-center text-gray-500 py-8">
                  No products found
                </p>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  Start typing to search...
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
