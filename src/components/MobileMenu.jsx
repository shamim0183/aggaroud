import { AnimatePresence, motion } from "framer-motion"
import { gsap } from "gsap"
import { ChevronRight, X } from "lucide-react"
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"

export default function MobileMenu({ isOpen, onClose }) {
  const menuItemsRef = useRef([])
  const secondaryItemsRef = useRef([])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // GSAP animation when menu opens
  useEffect(() => {
    if (isOpen) {
      // Animate menu items in with stagger
      gsap.fromTo(
        menuItemsRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.1,
        },
      )

      // Animate secondary items
      gsap.fromTo(
        secondaryItemsRef.current,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.06,
          ease: "power2.out",
          delay: 0.5,
        },
      )
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with Blur Glass Effect - Gucci Style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-50"
          />

          {/* Sidebar Panel - Full Width on Mobile like Gucci */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Close Button Only - No Menu Text (Gucci Style) */}
            <div className="flex justify-end items-center p-6">
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 0.9, rotate: 90 }}
                whileTap={{ scale: 0.85 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-12 h-12 rounded-full bg-brand-black text-white flex items-center justify-center hover:bg-brand-gold transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={2} />
              </motion.button>
            </div>

            {/* Primary Navigation */}
            <nav className="flex-1 px-6 pb-8">
              <div className="space-y-1">
                <Link
                  ref={(el) => (menuItemsRef.current[0] = el)}
                  to="/"
                  onClick={onClose}
                  className="flex items-center justify-between py-4 text-lg hover:text-brand-gold transition-colors cursor-pointer border-b border-gray-100"
                >
                  <span>Home</span>
                </Link>
                <Link
                  ref={(el) => (menuItemsRef.current[1] = el)}
                  to="/products"
                  onClick={onClose}
                  className="flex items-center justify-between py-4 text-lg hover:text-brand-gold transition-colors cursor-pointer border-b border-gray-100"
                >
                  <span>Shop All</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </Link>
                <Link
                  ref={(el) => (menuItemsRef.current[2] = el)}
                  to="/men"
                  onClick={onClose}
                  className="flex items-center justify-between py-4 text-lg hover:text-brand-gold transition-colors cursor-pointer border-b border-gray-100"
                >
                  <span>Men's Collection</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </Link>
                <Link
                  ref={(el) => (menuItemsRef.current[3] = el)}
                  to="/women"
                  onClick={onClose}
                  className="flex items-center justify-between py-4 text-lg hover:text-brand-gold transition-colors cursor-pointer border-b border-gray-100"
                >
                  <span>Women's Collection</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </Link>
                <Link
                  ref={(el) => (menuItemsRef.current[4] = el)}
                  to="/cart"
                  onClick={onClose}
                  className="flex items-center justify-between py-4 text-lg hover:text-brand-gold transition-colors cursor-pointer border-b border-gray-100"
                >
                  <span>Shopping Cart</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </Link>
              </div>

              {/* Secondary Links - Subtle styling like Gucci */}
              <div className="mt-8 space-y-1">
                <Link
                  ref={(el) => (secondaryItemsRef.current[0] = el)}
                  to="/contact"
                  onClick={onClose}
                  className="flex items-center justify-between py-3 text-sm text-gray-600 hover:text-brand-gold transition-colors cursor-pointer"
                >
                  <span>Contact Us</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
                <Link
                  ref={(el) => (secondaryItemsRef.current[1] = el)}
                  to="/about"
                  onClick={onClose}
                  className="flex items-center justify-between py-3 text-sm text-gray-600 hover:text-brand-gold transition-colors cursor-pointer"
                >
                  <span>About Us</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
                <Link
                  ref={(el) => (secondaryItemsRef.current[2] = el)}
                  to="/shipping"
                  onClick={onClose}
                  className="flex items-center justify-between py-3 text-sm text-gray-600 hover:text-brand-gold transition-colors cursor-pointer"
                >
                  <span>Shipping Info</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
