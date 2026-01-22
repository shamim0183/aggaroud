import { motion } from "framer-motion"
import { Heart, ShoppingCart } from "lucide-react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const isFavorite = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  return (
    <Link to={`/products/${product.id}`}>
      <motion.div
        className="group relative"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden bg-gray-100 rounded-lg mb-4 aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-colors duration-300" />

          {/* Quick Actions - Heart Icon */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleToggleWishlist}
              className={`bg-white p-2 rounded-full hover:bg-brand-gold hover:text-white transition-colors cursor-pointer ${
                isFavorite ? "text-brand-gold" : ""
              }`}
            >
              <Heart
                size={18}
                strokeWidth={1.5}
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>
          </div>

          {/* Quick Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 left-4 right-4 bg-white text-brand-black px-6 py-3 uppercase tracking-wider text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-gold hover:text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingCart size={16} />
            Quick Add
          </button>
        </div>

        {/* Product Info */}
        <div>
          <h3 className="font-serif text-xl mb-2 text-brand-black group-hover:text-brand-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{product.category}</p>
          <p className="text-brand-gold font-semibold text-lg">
            ${product.price}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}
