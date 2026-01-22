import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function Terms() {
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
            Legal
          </p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6 text-brand-black">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 font-light">Last updated: January 2026</p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-16 px-8 max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <h2 className="font-serif text-3xl mb-6 text-brand-black">
            Agreement to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            By accessing and using the Agaar Oud website, you accept and agree
            to be bound by the terms and provisions of this agreement. If you do
            not agree to these terms, please do not use our website or services.
          </p>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Use of Website
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You may use our website for lawful purposes only. You agree not to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li>
              Use the website in any way that violates applicable laws or
              regulations
            </li>
            <li>
              Attempt to gain unauthorized access to our systems or networks
            </li>
            <li>Transmit any viruses, malware, or harmful code</li>
            <li>Impersonate any person or entity</li>
            <li>Collect or harvest personal information of other users</li>
          </ul>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Product Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We strive to provide accurate product descriptions, images, and
            pricing. However, we do not warrant that product descriptions,
            images, pricing, or other content is accurate, complete, reliable,
            current, or error-free. We reserve the right to correct any errors
            and to update information at any time without prior notice.
          </p>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Orders and Payment
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By placing an order, you agree to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li>Provide accurate and complete payment information</li>
            <li>
              Pay all charges incurred by you at the prices in effect when
              charges are incurred
            </li>
            <li>
              Understand that we reserve the right to refuse or cancel any order
            </li>
            <li>
              Accept that pricing and availability are subject to change without
              notice
            </li>
          </ul>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Shipping and Delivery
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We will make every effort to deliver products within the estimated
            timeframes. However, delivery times are estimates and not
            guaranteed. We are not liable for delays caused by shipping carriers
            or circumstances beyond our control.
          </p>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Returns and Refunds
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Please refer to our{" "}
            <Link to="/shipping" className="text-brand-gold hover:underline">
              Shipping Information
            </Link>{" "}
            page for detailed information about our return and refund policy.
            Returns must be made within 30 days of purchase for unopened
            products.
          </p>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Intellectual Property
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            All content on this website, including but not limited to text,
            graphics, logos, images, and software, is the property of Agaar Oud
            or its content suppliers and protected by international copyright
            and trademark laws. You may not reproduce, distribute, or create
            derivative works without our express written permission.
          </p>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            To the maximum extent permitted by law, Agaar Oud shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly.
          </p>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Disclaimer of Warranties
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our website and products are provided "as is" without any
            warranties, express or implied. We do not guarantee that our website
            will be uninterrupted, secure, or error-free.
          </p>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Governing Law
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            These Terms and Conditions are governed by and construed in
            accordance with the laws of the United Arab Emirates. Any disputes
            shall be subject to the exclusive jurisdiction of the courts of
            Dubai, UAE.
          </p>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Changes to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting to the website. Your continued
            use of the website following the posting of changes constitutes your
            acceptance of such changes.
          </p>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Contact Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For questions about these Terms and Conditions, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-sm">
            <p className="text-gray-700">
              <strong>Agaar Oud</strong>
              <br />
              Email: legal@agaaroud.com
              <br />
              Phone: +971 (0) 123 4567
              <br />
              Address: 123 Perfume Lane, Dubai, UAE 00000
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8 bg-gray-50 text-center">
        <h3 className="font-serif text-3xl mb-6 text-brand-black">
          Questions About These Terms?
        </h3>
        <Link
          to="/contact"
          className="inline-block border-2 border-brand-black text-brand-black px-10 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-brand-black hover:text-white transition-all duration-300"
        >
          Contact Us
        </Link>
      </section>
    </div>
  )
}
