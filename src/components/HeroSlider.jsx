import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { Link } from "react-router-dom"
import "swiper/css"
import "swiper/css/effect-fade"
import { Autoplay, EffectFade } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

// Import hero images
import hero1 from "../assets/images/aggaroud/IMG_0002.JPG"
import hero2 from "../assets/images/aggaroud/IMG_0007.JPG"
import hero3 from "../assets/images/aggaroud/IMG_0008.JPG"

// Slide content data
const slideContent = [
  {
    subtitle: "The Essence of Luxury",
    title: ["Divine", "Oud"],
    description:
      "Crafted from the rarest agarwood, each bottle tells a story of tradition and excellence",
  },
  {
    subtitle: "Timeless Elegance",
    title: ["Premium", "Fragrance"],
    description:
      "Experience the captivating blend of ancient perfumery and modern sophistication",
  },
  {
    subtitle: "Arabian Heritage",
    title: ["Exquisite", "Collection"],
    description:
      "Discover our curated selection of authentic oud fragrances from the heart of Arabia",
  },
]

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0)

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.realIndex)
  }

  // Get current slide content with fallback
  const currentContent =
    slideContent[activeSlide % slideContent.length] || slideContent[0]

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={2000}
        onSlideChange={handleSlideChange}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${hero1})` }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${hero2})` }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${hero3})` }}
          />
        </SwiperSlide>
      </Swiper>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex items-center justify-center text-center px-4 pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Subtitle */}
              <motion.p
                className="text-white/90 uppercase tracking-[0.4em] mb-6 text-sm font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {currentContent.subtitle}
              </motion.p>

              {/* Main Title */}
              <motion.h1
                className="text-white font-serif text-6xl md:text-8xl italic mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <span className="inline-block">{currentContent.title[0]}</span>{" "}
                <span className="inline-block text-brand-gold">
                  {currentContent.title[1]}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-white/80 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {currentContent.description}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Link
                  to="/products"
                  className="pointer-events-auto inline-block px-10 py-4 bg-white text-brand-black uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-gold hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Discover the Collection
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
