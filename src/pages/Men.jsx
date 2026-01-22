import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import ProductGrid from "../components/ProductGrid"
import productsData from "../data/products.json"

export default function Men() {
  // Filter products for men
  const menProducts = productsData.filter(
    (product) => product.gender === "Men" || product.gender === "Unisex",
  )

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/aggaroud/insta/IMG-20250713-WA0007.jpg"
            alt="Men's Fragrance Collection"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-brand-gold text-xs md:text-sm uppercase tracking-[0.3em] mb-3 md:mb-4 font-semibold">
              For Him
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 md:mb-6 text-brand-black leading-tight">
              Men's Collection
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8 font-light max-w-2xl mx-auto px-4">
              Bold & Sophisticated
            </p>
            <Link
              to="/products"
              className="inline-block border-2 border-brand-black text-brand-black px-8 md:px-10 py-3 md:py-4 text-xs md:text-sm uppercase tracking-widest font-semibold hover:bg-brand-black hover:text-white transition-all duration-300 cursor-pointer"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Collection Description */}
      <section className="py-16 px-8 max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl mb-6 text-brand-black">
          Masculine Elegance
        </h2>
        <p className="text-gray-700 leading-relaxed font-light text-lg mb-4">
          Our men's collection embodies strength and refinement. Each fragrance
          is a masterful blend of rare agarwood, exotic spices, and precious
          resins, designed to leave a lasting impression.
        </p>
        <p className="text-gray-600 leading-relaxed font-light">
          From boardroom to evening events, these scents are your signature of
          distinction.
        </p>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <ProductGrid products={menProducts} />
      </section>

      {/* Fragrance Notes Section */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-serif text-4xl text-center mb-16 text-brand-black">
            Key Notes in Men's Fragrances
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌳</span>
              </div>
              <h4 className="font-serif text-2xl mb-3 text-brand-black">
                Woody
              </h4>
              <p className="text-gray-600 font-light">
                Deep agarwood, sandalwood, and cedarwood create a robust
                foundation
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔥</span>
              </div>
              <h4 className="font-serif text-2xl mb-3 text-brand-black">
                Spicy
              </h4>
              <p className="text-gray-600 font-light">
                Saffron, cardamom, and black pepper add warmth and intensity
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💎</span>
              </div>
              <h4 className="font-serif text-2xl mb-3 text-brand-black">
                Resinous
              </h4>
              <p className="text-gray-600 font-light">
                Amber and frankincense provide richness and longevity
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-gray-50 text-center">
        <h3 className="font-serif text-4xl mb-6 text-brand-black">
          Find Your Signature Scent
        </h3>
        <p className="text-gray-700 font-light mb-8 max-w-2xl mx-auto">
          Not sure which fragrance suits you best? Explore our full collection
          or contact our fragrance experts for personalized recommendations.
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
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
