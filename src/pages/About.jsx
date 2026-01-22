import { motion } from "framer-motion"
import { Award, Globe, Heart, Users } from "lucide-react"
import { Link } from "react-router-dom"

export default function About() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-white py-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-brand-gold font-semibold">
            Our Story
          </p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6 text-brand-black">
            About Agaar Oud
          </h1>
          <p className="text-xl font-light text-gray-700 leading-relaxed">
            Crafting excellence in Arabian perfumery since the beginning. We
            bring you the finest oud fragrances from around the world.
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-4xl mb-6 text-brand-black">
              The Legacy of Agarwood
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Agaar Oud was born from a passion for authentic Arabian perfumery
              and a commitment to preserving ancient traditions. Our journey
              began with a simple mission: to bring the world's finest agarwood
              to discerning customers who appreciate true luxury.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Each bottle in our collection tells a story—of rare forests,
              skilled artisans, and centuries-old extraction methods. We source
              our oud from the most prestigious regions, ensuring every drop
              meets our exacting standards of purity and quality.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, Agaar Oud stands as a symbol of excellence, trusted by
              connoisseurs worldwide for our unwavering commitment to
              authenticity and craftsmanship.
            </p>
          </div>
          <div className="h-[500px] rounded-sm overflow-hidden">
            <img
              src="/src/assets/images/aggaroud/insta/IMG-20250713-WA0011.jpg"
              alt="Oud Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl mb-4 text-brand-black">
              Our Values
            </h2>
            <p className="text-gray-600 font-light">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-serif text-2xl mb-3 text-brand-black">
                Excellence
              </h3>
              <p className="text-gray-600 font-light">
                We settle for nothing less than perfection in every bottle we
                create.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-serif text-2xl mb-3 text-brand-black">
                Authenticity
              </h3>
              <p className="text-gray-600 font-light">
                Pure, uncut agarwood sourced from sustainable, ethical
                suppliers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-serif text-2xl mb-3 text-brand-black">
                Heritage
              </h3>
              <p className="text-gray-600 font-light">
                Honoring centuries-old traditions in Arabian perfumery.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-serif text-2xl mb-3 text-brand-black">
                Community
              </h3>
              <p className="text-gray-600 font-light">
                Building relationships with customers and artisans alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl mb-6 text-brand-black">
              Our Sourcing
            </h2>
            <p className="text-gray-700 font-light max-w-3xl mx-auto leading-relaxed">
              We travel the world to find the finest agarwood. From the ancient
              forests of Cambodia to the mystical groves of India, our master
              perfumers personally select each ingredient with care and
              expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 text-center">
              <h3 className="font-serif text-2xl mb-3 text-brand-black">
                Cambodia
              </h3>
              <p className="text-gray-600 font-light">
                Home to some of the world's most prized agarwood, known for its
                deep, complex aroma.
              </p>
            </div>
            <div className="bg-white p-8 text-center">
              <h3 className="font-serif text-2xl mb-3 text-brand-black">
                India
              </h3>
              <p className="text-gray-600 font-light">
                Rich, creamy oud with legendary status among perfume
                connoisseurs.
              </p>
            </div>
            <div className="bg-white p-8 text-center">
              <h3 className="font-serif text-2xl mb-3 text-brand-black">
                Middle East
              </h3>
              <p className="text-gray-600 font-light">
                Traditional blending expertise and rare botanical ingredients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-serif text-4xl mb-6 text-brand-black">
            Experience Agaar Oud
          </h3>
          <p className="text-gray-700 font-light mb-8 leading-relaxed">
            Discover our collection of exceptional fragrances, each one a
            masterpiece of Arabian perfumery. Let us help you find your
            signature scent.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/products"
              className="border-2 border-brand-black text-brand-black px-10 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-brand-black hover:text-white transition-all duration-300"
            >
              Shop Collection
            </Link>
            <Link
              to="/contact"
              className="bg-brand-gold text-white px-10 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-brand-gold/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
