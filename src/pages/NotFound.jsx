import { motion } from "framer-motion"
import { Home, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* 404 Number */}
        <h1 className="font-serif text-9xl mb-4 text-brand-gold">404</h1>

        {/* Message */}
        <h2 className="font-serif text-4xl mb-4 text-brand-black">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-12 text-lg">
          The page you're looking for has wandered off like a rare fragrance in
          the wind. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-black text-white px-8 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-brand-gold transition-colors cursor-pointer"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 border-2 border-brand-black text-brand-black px-8 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-brand-black hover:text-white transition-all duration-300 cursor-pointer"
          >
            <ShoppingBag size={20} />
            Shop Products
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Popular pages:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/about" className="text-brand-gold hover:underline">
              About Us
            </Link>
            <Link to="/shipping" className="text-brand-gold hover:underline">
              Shipping Info
            </Link>
            <Link to="/contact" className="text-brand-gold hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
