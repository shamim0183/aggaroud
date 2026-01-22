import { Link } from "react-router-dom"
import HeroSlider from "../components/HeroSlider"
import OurStory from "../components/OurStory"
import ProductGrid from "../components/ProductGrid"
import Testimonials from "../components/Testimonials"
import productsData from "../data/products.json"
import {
  useFadeIn,
  useFadeInLeft,
  useFadeInRight,
  useScrollTriggerCleanup,
  useStaggerIn,
} from "../utils/animations"

export default function Home() {
  // Cleanup ScrollTrigger on unmount
  useScrollTriggerCleanup()

  // Animation refs
  const featuredTitleRef = useFadeIn(0)
  const featuredDescRef = useFadeIn(0.1)
  const featuredGridRef = useStaggerIn(0.15)

  const collectionTitleRef = useFadeIn(0)
  const collectionDescRef = useFadeIn(0.1)
  const menCardRef = useFadeInLeft(0.2)
  const womenCardRef = useFadeInRight(0.2)

  const menTitleRef = useFadeInLeft(0)
  const menGridRef = useStaggerIn(0.15)

  const womenTitleRef = useFadeInRight(0)
  const womenGridRef = useStaggerIn(0.15)

  // Get featured products
  const featuredProducts = productsData.filter((product) => product.featured)

  // Get products by gender
  const menProducts = productsData
    .filter((p) => p.gender === "Men" || p.gender === "Unisex")
    .slice(0, 3)

  const womenProducts = productsData
    .filter((p) => p.gender === "Women" || p.gender === "Unisex")
    .slice(0, 3)

  return (
    <div>
      <HeroSlider />

      {/* Featured Products Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            ref={featuredTitleRef}
            className="font-serif text-5xl mb-4 text-brand-black"
          >
            Featured Collection
          </h2>
          <p ref={featuredDescRef} className="text-gray-600 font-light">
            Discover our most exquisite fragrances
          </p>
        </div>
        <div ref={featuredGridRef}>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Shop by Collection Section */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              ref={collectionTitleRef}
              className="font-serif text-5xl mb-4 text-brand-black"
            >
              Shop by Collection
            </h2>
            <p ref={collectionDescRef} className="text-gray-600 font-light">
              Curated fragrances for every personality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Men's Collection Card */}
            <Link
              ref={menCardRef}
              to="/men"
              className="group relative h-[500px] overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10 group-hover:from-brand-gold/80 group-hover:to-brand-gold/20 transition-all duration-500" />
              <img
                src="/src/assets/images/aggaroud/insta/IMG-20250713-WA0007.jpg"
                alt="Men's Collection"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                <h3 className="font-serif text-5xl mb-4">Men's Collection</h3>
                <p className="text-lg font-light mb-6">Bold & Sophisticated</p>
                <span className="border border-white px-8 py-3 rounded-sm group-hover:bg-white group-hover:text-brand-black transition-all duration-300">
                  Explore Collection
                </span>
              </div>
            </Link>

            {/* Women's Collection Card */}
            <Link
              ref={womenCardRef}
              to="/women"
              className="group relative h-[500px] overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 to-purple-900/20 z-10 group-hover:from-rose-600/80 group-hover:to-purple-600/20 transition-all duration-500" />
              <img
                src="/src/assets/images/aggaroud/insta/IMG-20250713-WA0015.jpg"
                alt="Women's Collection"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                <h3 className="font-serif text-5xl mb-4">Women's Collection</h3>
                <p className="text-lg font-light mb-6">Elegant & Captivating</p>
                <span className="border border-white px-8 py-3 rounded-sm group-hover:bg-white group-hover:text-rose-900 transition-all duration-300">
                  Explore Collection
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Men's Preview Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div ref={menTitleRef}>
            <h2 className="font-serif text-4xl mb-2 text-brand-black">
              Men's Fragrances
            </h2>
            <p className="text-gray-600 font-light">
              Masculine scents that command attention
            </p>
          </div>
          <Link
            to="/men"
            className="text-brand-gold hover:text-brand-black transition-colors font-semibold cursor-pointer"
          >
            View All →
          </Link>
        </div>
        <div ref={menGridRef}>
          <ProductGrid products={menProducts} />
        </div>
      </section>

      {/* Women's Preview Section */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div ref={womenTitleRef}>
              <h2 className="font-serif text-4xl mb-2 text-brand-black">
                Women's Fragrances
              </h2>
              <p className="text-gray-600 font-light">
                Elegant scents that captivate the senses
              </p>
            </div>
            <Link
              to="/women"
              className="text-brand-gold hover:text-brand-black transition-colors font-semibold cursor-pointer"
            >
              View All →
            </Link>
          </div>
          <div ref={womenGridRef}>
            <ProductGrid products={womenProducts} />
          </div>
        </div>
      </section>

      {/* Our Story Section with Image Carousel */}
      <OurStory />

      {/* Testimonials Carousel */}
      <Testimonials />
    </div>
  )
}
