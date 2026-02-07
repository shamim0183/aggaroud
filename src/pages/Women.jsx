import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ProductGrid from "../components/ProductGrid"
import { fetchProducts } from "../lib/shopify"

export default function Women() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch and filter products for women (case-insensitive)
  useEffect(() => {
    async function loadProducts() {
      try {
        const allProducts = await fetchProducts()
        const womenProducts = allProducts.filter(
          (product) =>
            product.gender?.toLowerCase() === "women" ||
            product.gender?.toLowerCase() === "unisex",
        )
        setProducts(womenProducts)
        setLoading(false)
      } catch (err) {
        console.error("Error loading women's products:", err)
        setError(err.message)
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen py-32 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <h1 className="font-serif text-5xl mb-4 text-brand-black">
              Loading Women's Collection...
            </h1>
            <p className="text-gray-600">Fetching from Shopify</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen py-32 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-5xl mb-4 text-red-600">
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
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-black overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="images/aggaroud/insta/women.webp"
            alt="Women's Fragrance Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-rose-950/40 to-black/70" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-rose-300 text-xs md:text-sm uppercase tracking-[0.3em] mb-3 md:mb-4 font-semibold"
            >
              For Her
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 md:mb-6 text-white leading-tight"
            >
              Women's Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 font-light max-w-2xl mx-auto px-4"
            >
              Elegant & Captivating
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {/* <Link
                to="/products"
                className="inline-block border-2 border-white text-white px-8 md:px-10 py-3 md:py-4 text-xs md:text-sm uppercase tracking-widest font-semibold hover:bg-white hover:text-rose-900 transition-all duration-300 cursor-pointer"
              >
                Explore Collection
              </Link> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collection Description */}
      <section className="py-16 px-8 max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl mb-6 text-brand-black">
          Timeless Femininity
        </h2>
        <p className="text-gray-700 leading-relaxed font-light text-lg mb-4">
          Our women's collection celebrates the multifaceted nature of
          femininity. Each scent is a harmonious blend of delicate florals,
          exotic oud, and precious ingredients that capture elegance and allure.
        </p>
        <p className="text-gray-600 leading-relaxed font-light">
          From intimate moments to grand occasions, these fragrances are your
          statement of refined beauty.
        </p>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <p className="text-gray-600">
            {products.length} {products.length === 1 ? "product" : "products"}{" "}
            available
          </p>
        </div>
        <ProductGrid products={products} />
      </section>

      {/* Fragrance Notes Section */}
      {/* <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-serif text-4xl text-center mb-16 text-brand-black">
            Key Notes in Women's Fragrances
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌹</span>
              </div>
              <h4 className="font-serif text-2xl mb-3 text-brand-black">
                Floral
              </h4>
              <p className="text-gray-600 font-light">
                Rose, jasmine, and neroli create a delicate, romantic bouquet
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌸</span>
              </div>
              <h4 className="font-serif text-2xl mb-3 text-brand-black">
                Exotic
              </h4>
              <p className="text-gray-600 font-light">
                Rare oud and saffron add depth and sophistication
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✨</span>
              </div>
              <h4 className="font-serif text-2xl mb-3 text-brand-black">
                Sweet
              </h4>
              <p className="text-gray-600 font-light">
                Vanilla and amber provide warmth and sensual allure
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 px-8 bg-gray-50 text-center">
        <h3 className="font-serif text-4xl mb-6 text-brand-black">
          Discover Your Signature
        </h3>
        <p className="text-gray-700 font-light mb-8 max-w-2xl mx-auto">
          Each woman deserves a fragrance as unique as she is. Explore our
          collection or let our experts help you find the perfect scent.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/products"
            className="border-2 border-brand-black text-brand-black px-8 py-3 text-sm uppercase tracking-widest font-semibold hover:bg-brand-black hover:text-white transition-all duration-300"
          >
            View All Products
          </Link>
          <Link
            to="/contact"
            className="bg-brand-gold text-white px-8 py-3 text-sm uppercase tracking-widest font-semibold hover:bg-brand-gold/90 transition-colors"
          >
            Get Personalized Help
          </Link>
        </div>
      </section>
    </div>
  )
}
