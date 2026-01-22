import { motion } from "framer-motion"
import { Box, Clock, Globe, Package, Shield, Truck } from "lucide-react"

export default function Shipping() {
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
            Delivery Information
          </p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6 text-brand-black">
            Shipping & Delivery
          </h1>
          <p className="text-xl font-light text-gray-700 leading-relaxed">
            We ensure your luxury fragrances arrive safely and swiftly to your
            door, anywhere in the world.
          </p>
        </motion.div>
      </section>

      {/* Shipping Options */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl text- mb-12 text-center text-brand-black">
            Shipping Methods
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 text-center">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-serif text-2xl mb-3 text-brand-black">
                Standard Shipping
              </h3>
              <p className="text-gray-600 font-light mb-4">5-7 business days</p>
              <p className="text-2xl font-semibold text-brand-gold mb-2">
                $9.99
              </p>
              <p className="text-sm text-gray-500">Free on orders over $150</p>
            </div>

            <div className="bg-white p-8 text-center border-2 border-brand-gold relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-gold text-white px-4 py-1 text-xs uppercase tracking-wider">
                Most Popular
              </div>
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-serif text-2xl mb-3 text-brand-black">
                Express Shipping
              </h3>
              <p className="text-gray-600 font-light mb-4">2-3 business days</p>
              <p className="text-2xl font-semibold text-brand-gold mb-2">
                $24.99
              </p>
              <p className="text-sm text-gray-500">Expedited delivery</p>
            </div>

            <div className="bg-white p-8 text-center">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-serif text-2xl mb-3 text-brand-black">
                International
              </h3>
              <p className="text-gray-600 font-light mb-4">
                7-14 business days
              </p>
              <p className="text-2xl font-semibold text-brand-gold mb-2">
                From $39.99
              </p>
              <p className="text-sm text-gray-500">Worldwide delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Info */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl mb-12 text-center text-brand-black">
            Important Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center shrink-0">
                <Clock className="text-brand-gold" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-brand-black">
                  Processing Time
                </h3>
                <p className="text-gray-600 font-light">
                  All orders are processed within 1-2 business days. Orders
                  placed on weekends or holidays will be processed the next
                  business day.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center shrink-0">
                <Box className="text-brand-gold" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-brand-black">
                  Packaging
                </h3>
                <p className="text-gray-600 font-light">
                  Your fragrances are carefully packaged in protective materials
                  to ensure they arrive in perfect condition. All shipments
                  include elegant gift packaging.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center shrink-0">
                <Shield className="text-brand-gold" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-brand-black">
                  Insurance
                </h3>
                <p className="text-gray-600 font-light">
                  All shipments are fully insured at no extra cost. In the rare
                  event of loss or damage, we'll replace your order immediately.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center shrink-0">
                <Globe className="text-brand-gold" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-brand-black">
                  International Duties
                </h3>
                <p className="text-gray-600 font-light">
                  International customers are responsible for any customs duties
                  or taxes imposed by their country. These fees are not included
                  in our shipping costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6 text-brand-black">
            Order Tracking
          </h2>
          <p className="text-gray-700 font-light mb-8 leading-relaxed">
            Once your order ships, you'll receive a tracking number via email.
            You can track your package in real-time to know exactly when it will
            arrive.
          </p>
          <p className="text-gray-600 font-light">
            Need help with your order? Our customer service team is here to
            assist you.
          </p>
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-block border-2 border-brand-black text-brand-black px-10 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-brand-black hover:text-white transition-all duration-300"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-12 text-center text-brand-black">
            Shipping FAQs
          </h2>

          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-semibold text-lg mb-2 text-brand-black">
                Do you ship internationally?
              </h3>
              <p className="text-gray-600 font-light">
                Yes! We ship to over 100 countries worldwide. International
                shipping rates are calculated at checkout based on your location
                and order weight.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-semibold text-lg mb-2 text-brand-black">
                Can I change my shipping address after placing an order?
              </h3>
              <p className="text-gray-600 font-light">
                If your order hasn't shipped yet, we can update the address.
                Please contact us immediately at support@agaaroud.com with your
                order number.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-semibold text-lg mb-2 text-brand-black">
                What if my package is lost or damaged?
              </h3>
              <p className="text-gray-600 font-light">
                All orders are fully insured. If your package is lost or arrives
                damaged, contact us within 48 hours and we'll send a replacement
                at no charge.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="font-semibold text-lg mb-2 text-brand-black">
                Do you offer gift wrapping?
              </h3>
              <p className="text-gray-600 font-light">
                All our fragrances come in premium packaging suitable for
                gifting. For special occasions, we offer complimentary luxury
                gift wrapping—just add a note at checkout.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
