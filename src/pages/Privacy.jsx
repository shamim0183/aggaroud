import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function Privacy() {
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
            Privacy Policy
          </h1>
          <p className="text-gray-600 font-light">Last updated: January 2026</p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-16 px-8 max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <h2 className="font-serif text-3xl mb-6 text-brand-black">
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            At Agaar Oud, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website.
          </p>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li>
              Name and contact information (email address, phone number,
              shipping address)
            </li>
            <li>
              Payment information (processed securely through our payment
              providers)
            </li>
            <li>Order history and preferences</li>
            <li>Communication preferences</li>
            <li>Correspondence with customer service</li>
          </ul>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders and account</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our products and services</li>
            <li>Prevent fraud and enhance security</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. However, no internet
            transmission is completely secure, and we cannot guarantee absolute
            security.
          </p>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Cookies and Tracking
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We use cookies and similar tracking technologies to enhance your
            browsing experience, analyze site traffic, and understand user
            behavior. You can control cookies through your browser settings.
          </p>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Third-Party Services
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We may share your information with trusted third-party service
            providers who assist us in operating our website, processing
            payments, and delivering products. These providers are contractually
            obligated to protect your information.
          </p>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Your Rights
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
          </ul>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Children's Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our website is not intended for children under 13 years of age. We
            do not knowingly collect personal information from children under
            13.
          </p>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Changes to This Policy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We may update this Privacy Policy from time to time. We will notify
            you of any significant changes by posting the new policy on this
            page and updating the "Last updated" date.
          </p>

          <h2 className="font-serif text-3xl mb-6 mt-12 text-brand-black">
            Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have questions about this Privacy Policy or how we handle
            your personal information, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-sm">
            <p className="text-gray-700">
              <strong>Agaar Oud</strong>
              <br />
              Email: privacy@agaaroud.com
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
          Questions About Your Data?
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
