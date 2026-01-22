import { gsap } from "gsap"
import { Star } from "lucide-react"
import { useEffect, useRef } from "react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

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
    text: "As someone who's tried countless luxury fragrances, Agaar Oud stands out for its authenticity and craftsmanship. The quality is unmatched, and the customer service is exceptional.",
    image: "/src/assets/images/aggaroud/insta/IMG-20250713-WA0007.jpg",
  },
  {
    id: 3,
    name: "Amira Rahman",
    title: "Perfume Enthusiast",
    rating: 5,
    text: "Finally, a brand that truly understands the art of Arabian perfumery. Each bottle is a masterpiece. The Midnight Oud is absolutely divine!",
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
    <section ref={sectionRef} className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="testimonial-title font-serif text-4xl md:text-5xl text-center mb-4 text-brand-black">
          What Our Clients Say
        </h2>
        <p className="text-center text-gray-600 mb-16 font-light">
          Trusted by discerning fragrance connoisseurs worldwide
        </p>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-gray-50 p-8 rounded-sm h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="#C9A55A" stroke="#C9A55A" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-8 font-light leading-relaxed flex-1">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-black">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .testimonials-swiper {
          padding-bottom: 60px;
        }

        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: #c9a55a;
        }

        :global(.swiper-pagination-bullet) {
          background: #c9a55a;
        }
      `}</style>
    </section>
  )
}
