import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import HeroSlider from "../components/HeroSlider"
import ProductGrid from "../components/ProductGrid"
import Testimonials from "../components/Testimonials"
import { fetchProducts } from "../lib/shopify"
import {
  useFadeIn,
  useFadeInLeft,
  useFadeInRight,
  useScrollTriggerCleanup,
  useStaggerIn,
} from "../utils/animations"
// Images now served from public directory
const menCollectionImg = "/images/aggaroud/insta/men.jpg"
const womenCollectionImg = "/images/aggaroud/insta/women.webp"

export default function Home() {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [featuredVendor, setFeaturedVendor] = useState("all") // Filter for featured products

  // Fetch products from Shopify
  useEffect(() => {
    async function loadProducts() {
      try {
        const products = await fetchProducts()
        setAllProducts(products)
        setLoading(false)
      } catch (error) {
        console.error("Error loading products:", error)
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

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

  // Get featured products from Shopify (case-insensitive)
  const allFeaturedProducts = allProducts.filter((product) => product.featured)

  // Filter featured products by vendor (case-insensitive)
  const featuredProducts =
    featuredVendor === "all"
      ? allFeaturedProducts
      : allFeaturedProducts.filter(
          (p) => p.gender?.toLowerCase() === featuredVendor.toLowerCase(),
        )

  // Get products by gender from Shopify (case-insensitive)
  const menProducts = allProducts
    .filter(
      (p) =>
        p.gender?.toLowerCase() === "men" ||
        p.gender?.toLowerCase() === "unisex",
    )
    .slice(0, 3)

  const womenProducts = allProducts
    .filter(
      (p) =>
        p.gender?.toLowerCase() === "women" ||
        p.gender?.toLowerCase() === "unisex",
    )
    .slice(0, 3)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-4xl mb-4 text-brand-black animate-pulse">
            Loading...
          </h2>
          <p className="text-gray-600">Fetching products from Shopify</p>
        </div>
      </div>
    )
  }

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
          <p ref={featuredDescRef} className="text-gray-600 font-light mb-8">
            Discover our most exquisite fragrances
          </p>
        </div>
        <div ref={featuredGridRef}>
          {allFeaturedProducts.length > 0 ? (
            <ProductGrid products={allFeaturedProducts.slice(0, 6)} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No featured products available at this time.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Shop by Collection Section */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              ref={collectionTitleRef}
              className="font-serif text-3xl md:text-5xl mb-4 text-brand-black"
            >
              Shop by Collection
            </h2>
            <p
              ref={collectionDescRef}
              className="text-gray-600 font-light text-sm md:text-base"
            >
              Curated fragrances for every personality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Men's Collection Card */}
            <Link
              ref={menCardRef}
              to="/men"
              className="group relative h-[400px] md:h-[500px] overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10 group-hover:from-brand-gold/80 group-hover:to-brand-gold/20 transition-all duration-500" />
              <img
                src={menCollectionImg}
                alt="Men's Collection"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
                <h3 className="font-serif text-3xl md:text-5xl mb-2 md:mb-4">
                  Men's Collection
                </h3>
                <p className="text-base md:text-lg font-light mb-4 md:mb-6">
                  Bold & Sophisticated
                </p>
                <span className="border border-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-sm group-hover:bg-white group-hover:text-brand-black transition-all duration-300">
                  Explore Collection
                </span>
              </div>
            </Link>

            {/* Women's Collection Card */}
            <Link
              ref={womenCardRef}
              to="/women"
              className="group relative h-[400px] md:h-[500px] overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 to-purple-900/20 z-10 group-hover:from-rose-600/80 group-hover:to-purple-600/20 transition-all duration-500" />
              <img
                src={womenCollectionImg}
                alt="Women's Collection"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
                <h3 className="font-serif text-3xl md:text-5xl mb-2 md:mb-4">
                  Women's Collection
                </h3>
                <p className="text-base md:text-lg font-light mb-4 md:mb-6">
                  Elegant & Captivating
                </p>
                <span className="border border-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-sm group-hover:bg-white group-hover:text-rose-900 transition-all duration-300">
                  Explore Collection
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Men's Preview Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 md:mb-12">
          <div ref={menTitleRef} className="flex-1">
            <h2 className="font-serif text-2xl md:text-4xl mb-2 text-brand-black">
              Men's Fragrances
            </h2>
            <p className="text-gray-600 font-light text-sm md:text-base">
              Masculine scents that command attention
            </p>
          </div>
          <Link
            to="/men"
            className="text-brand-gold hover:text-brand-black transition-colors font-semibold text-sm md:text-base cursor-pointer whitespace-nowrap"
          >
            View All →
          </Link>
        </div>
        <div ref={menGridRef}>
          <ProductGrid products={menProducts} />
        </div>
      </section>

      {/* Women's Preview Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 md:mb-12">
            <div ref={womenTitleRef} className="flex-1">
              <h2 className="font-serif text-2xl md:text-4xl mb-2 text-brand-black">
                Women's Fragrances
              </h2>
              <p className="text-gray-600 font-light text-sm md:text-base">
                Elegant scents that captivate the senses
              </p>
            </div>
            <Link
              to="/women"
              className="text-brand-gold hover:text-brand-black transition-colors font-semibold text-sm md:text-base cursor-pointer whitespace-nowrap"
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
      {/* <OurStory /> */}

      {/* Testimonials Carousel */}
      <Testimonials />
    </div>
  )
}
