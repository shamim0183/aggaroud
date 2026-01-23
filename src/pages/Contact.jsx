import emailjs from "@emailjs/browser"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"
import React from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { toast } from "react-hot-toast"

export default function Contact() {
  const formRef = React.useRef()
  const recaptchaRef = React.useRef()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [recaptchaToken, setRecaptchaToken] = React.useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if reCAPTCHA is completed
    // if (!recaptchaToken) {
    //   toast.error("Please complete the reCAPTCHA verification")
    //   return
    // }

    setIsSubmitting(true)

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    // Validate environment variables
    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS credentials missing:", {
        serviceId,
        templateId,
        publicKey,
      })
      toast.error("Email service not configured. Please contact support.")
      setIsSubmitting(false)
      return
    }

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey).then(
      () => {
        toast.success("Message sent successfully! We'll get back to you soon.")
        formRef.current.reset()
        setRecaptchaToken(null)
        recaptchaRef.current?.reset()
        setIsSubmitting(false)
      },
      (error) => {
        console.error("EmailJS error:", error)
        console.error("Error status:", error.status)
        console.error("Error text:", error.text)

        // Provide more specific error messages
        if (error.status === 404) {
          toast.error(
            "Email service configuration error. Please verify your EmailJS account settings.",
          )
        } else if (error.status === 401) {
          toast.error(
            "Email service authentication failed. Please check credentials.",
          )
        } else {
          toast.error(
            "Failed to send message. Please try again or contact us directly.",
          )
        }
        setIsSubmitting(false)
      },
    )
  }

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token)
  }

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-black to-gray-900 text-white py-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Get in Touch</h1>
          <p className="text-xl font-light text-white/80">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </motion.div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-serif text-4xl mb-8 text-brand-black">
              Send a Message
            </h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="user_name"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-brand-gold transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="user_email"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-brand-gold transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="user_phone"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="user_phone"
                  name="user_phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-brand-gold transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-brand-gold transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              {/* reCAPTCHA */}
              {/* <div>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={handleRecaptchaChange}
                  theme="light"
                />
              </div> */}

              <button
                type="submit"
                // disabled={isSubmitting || !recaptchaToken}
                disabled={isSubmitting}
                className="w-full bg-brand-gold text-white py-4 rounded-sm hover:bg-brand-gold/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:pl-12"
          >
            <h2 className="font-serif text-4xl mb-8 text-brand-black">
              Contact Information
            </h2>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-brand-gold" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-brand-black">
                    Visit Us
                  </h3>
                  <p className="text-gray-600 font-light">
                    123 Perfume Lane
                    <br />
                    Dubai, UAE 00000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-brand-gold" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-brand-black">
                    Call Us
                  </h3>
                  <p className="text-gray-600 font-light">
                    +971 (0) 123 4567
                    <br />
                    Mon - Sat: 9AM - 6PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-brand-gold" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-brand-black">
                    Email Us
                  </h3>
                  <p className="text-gray-600 font-light">
                    info@agaaroud.com
                    <br />
                    support@agaaroud.com
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gray-50 p-8 rounded-sm">
              <h3 className="font-serif text-2xl mb-6 text-brand-black">
                Business Hours
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-light">Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-light">Saturday</span>
                  <span className="font-semibold">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-light">Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ or Additional Info Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6 text-brand-black">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 font-light mb-12">
            Have questions? Check out our FAQ section or contact us directly for
            personalized assistance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-6 rounded-sm shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-brand-black">
                Do you offer international shipping?
              </h3>
              <p className="text-gray-600 font-light">
                Yes! We ship worldwide. Contact us for shipping rates and
                delivery times to your location.
              </p>
            </div>
            <div className="bg-white p-6 rounded-sm shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-brand-black">
                Can I request a custom blend?
              </h3>
              <p className="text-gray-600 font-light">
                Absolutely! Our master perfumers can create bespoke fragrances.
                Get in touch to discuss your preferences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-sm shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-brand-black">
                What is your return policy?
              </h3>
              <p className="text-gray-600 font-light">
                We offer a 30-day return policy for unopened products. Contact
                us for more details.
              </p>
            </div>
            <div className="bg-white p-6 rounded-sm shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-brand-black">
                Do you have a physical store?
              </h3>
              <p className="text-gray-600 font-light">
                Yes, visit our flagship store in Dubai. Appointments are
                recommended for personalized consultations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
