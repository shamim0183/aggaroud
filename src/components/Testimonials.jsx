import { gsap } from "gsap"
import { Star } from "lucide-react"
import { useEffect, useRef } from "react"
import "swiper/css"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

// Extended detailed testimonials for marquee effect
const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    title: "Luxury Lifestyle Blogger",
    rating: 5,
    text: "Agaar Oud's fragrances are simply extraordinary. The Pure Oud Royale has become my signature scent - it's sophisticated, long-lasting, and receives compliments everywhere I go.",
    image: "/src/assets/images/aggaroud/insta/IMG-20250713-WA0002.jpg",
  },
  {
    id: 2,
    name: "James Anderson",
    title: "Fashion Executive",
    rating: 5,
    text: "As someone who's tried countless luxury fragrances, Agaar Oud stands out for its authenticity and craftsmanship. The quality is unmatched.",
    image: "/src/assets/images/aggaroud/insta/IMG-20250713-WA0007.jpg",
  },
  {
    id: 3,
    name: "Amira Rahman",
    title: "Perfume Enthusiast",
    rating: 5,
    text: "Finally, a brand that truly understands the art of Arabian perfumery. Each bottle is a masterpiece. The Midnight Oud is absolutely divine! I highly recommend it to anyone looking for true luxury.",
    image: "/src/assets/images/aggaroud/insta/IMG-20250713-WA0015.jpg",
  },
  {
    id: 4,
    name: "David Chen",
    title: "Collector",
    rating: 5,
    text: "The presentation alone is worth the price. But the scent... it transports you. Truly a premium experience from unboxing to the last note.",
    image: "/src/assets/images/aggaroud/insta/IMG-20250713-WA0002.jpg",
  },
  {
    id: 5,
    name: "Elena Rossi",
    title: "Interior Designer",
    rating: 5,
    text: "I use their home fragrances to set the mood in my projects. My clients always ask what that incredible smell is. Simply the best oud I've found.",
    image: "/src/assets/images/aggaroud/insta/IMG-20250713-WA0007.jpg",
  },
  {
    id: 6,
    name: "Michael Chang",
    title: "Entrepreneur",
    rating: 5,
    text: "Bold, commanding, yet subtle. Exactly what I look for in a daily wear fragrance. It lasts all day without being overpowering.",
    image: "/src/assets/images/aggaroud/insta/IMG-20250713-WA0015.jpg",
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(
      section.querySelector(".testimonial-title"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <h2 className="testimonial-title font-serif text-4xl md:text-5xl text-center mb-4 text-brand-black">
          What Our Clients Say
        </h2>
        <p className="text-center text-gray-600 font-light">
          Trusted by discerning fragrance connoisseurs worldwide
        </p>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1.2}
        loop={true}
        centeredSlides={true}
        speed={4000} // Slower speed for smooth reading
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // Allow pausing to read
        }}
        breakpoints={{
          640: { slidesPerView: 2, centeredSlides: false },
          1024: { slidesPerView: 3, centeredSlides: false },
          1280: { slidesPerView: 3.5, centeredSlides: false },
        }}
        className="testimonials-swiper !pb-12"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="!h-auto flex">
            <div className="bg-white p-8 rounded-sm w-full flex flex-col mx-2 border border-brand-gold/10 shadow-md hover:shadow-xl transition-all duration-300 h-full">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#C9A55A" stroke="#C9A55A" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-8 font-light leading-relaxed flex-grow italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto border-t border-gray-100 pt-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-brand-black text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        /* Smooth marquee effect */
        :global(.swiper-wrapper) {
          transition-timing-function: linear !important;
        }
        /* Ensure slides stretch to equal height */
        :global(.swiper-slide) {
          height: auto;
          display: flex;
        }
      `}</style>
    </section>
  )
}
