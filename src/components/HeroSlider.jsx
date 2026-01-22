import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

// Import hero images
import hero1 from '../assets/images/aggaroud/IMG_0002.JPG';
import hero2 from '../assets/images/aggaroud/IMG_0007.JPG';
import hero3 from '../assets/images/aggaroud/IMG_0008.JPG';

export default function HeroSlider() {
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
        className="absolute inset-0 w-full h-full"
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <p className="text-white/90 uppercase tracking-[0.4em] mb-6 text-sm font-light">
            The Essence of Luxury
          </p>
          <h1 className="text-white font-serif text-6xl md:text-8xl italic mb-8">
            Divine Oud
          </h1>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Crafted from the rarest agarwood, each bottle tells a story of tradition and excellence
          </p>
          <button className="px-10 py-4 bg-white text-brand-black uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-gold hover:text-white transition-all duration-300 transform hover:scale-105">
            Discover the Collection
          </button>
        </div>
      </div>
    </section>
  );
}
