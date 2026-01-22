import { gsap } from "gsap"
import { useEffect, useRef, useState } from "react"
import "swiper/css"
import "swiper/css/effect-fade"
import { Autoplay, EffectFade } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const storyImages = [
  "/images/aggaroud/insta/IMG-20250713-WA0004.jpg",
  "/images/aggaroud/insta/IMG-20250713-WA0005.jpg",
  "/images/aggaroud/insta/IMG-20250713-WA0008.jpg",
]

export default function OurStory() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return

    // Animate text on scroll
    gsap.fromTo(
      text.children,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      },
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div ref={textRef} className="space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              The Legacy of Oud
            </h2>
            <p className="text-gray-100 leading-relaxed font-light text-lg">
              Crafted from the rarest agarwood resin, our collection represents
              the pinnacle of olfactory excellence. Each scent tells a story of
              tradition, patience, and uncompromising quality.
            </p>
            <p className="text-gray-200 leading-relaxed font-light">
              Experience the ancient art of Arabian perfumery, where every
              bottle carries centuries of heritage and craftsmanship.
            </p>
            <div className="pt-4">
              <div className="flex items-center gap-4">
                {storyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 cursor-pointer ${
                      index === activeIndex ? "bg-brand-gold" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative">
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="rounded-lg overflow-hidden shadow-2xl"
            >
              {storyImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-[4/3] relative">
                    <img
                      src={image}
                      alt={`Oud heritage ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}
