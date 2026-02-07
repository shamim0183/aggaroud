import { motion } from "framer-motion"
import { Check, Heart, ShoppingCart } from "lucide-react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"

export default function ProductCard({ product }) {
  const { addToCart, cart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const navigate = useNavigate()
  const isFavorite = isInWishlist(product.id)
  const isInCart = cart.some((item) => item.id === product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (isInCart) {
      // Show toast if user clicks when already in cart
      toast("This item is already in your cart", {
        icon: "✓",
        duration: 2000,
      })
    } else {
      addToCart(product)
      toast.success(`${product.name} added to cart!`)
    }
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  return (
    <Link to={`/products/${product.id}`}>
      <motion.div className="group relative">
        {/* Product Image with Hover Swap */}
        <div className="relative overflow-hidden bg-gray-100 rounded-lg mb-4 aspect-square">
          {/* Primary Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-105"
          />

          {/* Secondary Image (shows on hover) */}
          {product.images && product.images.length > 1 && (
            <img
              src={product.images[1]}
              alt={`${product.name} - Alternate`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
            />
          )}

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

          {/* Quick Add to Cart - Smart Button */}
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-4 left-4 right-4 px-6 py-3 uppercase tracking-wider text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 ${
              isInCart
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-white text-brand-black hover:bg-black hover:text-white cursor-pointer"
            }`}
          >
            {isInCart ? (
              <>
                <Check size={16} />
                Already in Cart
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Quick Add
              </>
            )}
          </button>
        </div>

        {/* Product Info */}
        <div>
          <h3 className="font-serif text-xl mb-2 text-brand-black group-hover:text-black transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{product.category}</p>
          <p className="text-brand-black font-semibold text-lg">
            ${product.price}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}
