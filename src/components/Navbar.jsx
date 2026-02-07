import { motion, useScroll } from "framer-motion"
import { Menu, Search, ShoppingBag, User } from "lucide-react"
import React from "react"
import { Link, useLocation } from "react-router-dom"
import logoImg from "../assets/images/aggaroud/logo/agaar-oud-black.png"
import { useCart } from "../contexts/CartContext"
import AccountDropdown from "./AccountDropdown"
import MobileMenu from "./MobileMenu"
import SearchModal from "./SearchModal"

export default function Navbar() {
  const { scrollY } = useScroll()
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  // Initialize based on page - small logo on non-home pages
  const [isScrolled, setIsScrolled] = React.useState(!isHomePage)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [isAccountOpen, setIsAccountOpen] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)
  const { getCartCount } = useCart()

  // Mark as mounted after first render to enable animations
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update when page changes
  React.useEffect(() => {
    setIsScrolled(!isHomePage)
  }, [isHomePage])

  // Listen to scroll and switch states instantly
  React.useEffect(() => {
    return scrollY.on("change", (latest) => {
      // Force compact state on non-home pages
      setIsScrolled(latest > 1 || !isHomePage)
    })
  }, [scrollY, isHomePage])

  // Smooth transition for logo - no bounce
  const logoTransition = {
    type: "spring",
    stiffness: 120,
    damping: 20,
  }

  // Slower transition for background (appears after logo shrinks)
  const bgTransition = {
    type: "spring",
    stiffness: 80,
    damping: 20,
    delay: 0.15, // Small delay so logo shrinks first
  }

  return (
    <>
      {/* Desktop Navbar - Original Gucci-style Animation */}
      <motion.header
        animate={{
          height: "70px",
          backgroundColor:
            isHomePage && !isScrolled
              ? "rgba(255, 255, 255, 0)"
              : "rgba(255, 255, 255, 0.95)",
          boxShadow:
            isHomePage && !isScrolled
              ? "0 0 0 0 rgba(0,0,0,0)"
              : "0 2px 8px 0 rgba(0,0,0,0.08)",
          backdropFilter:
            isHomePage && !isScrolled ? "blur(0px)" : "blur(10px)",
          translateY: isHomePage && !isScrolled ? "-100%" : "0%",
        }}
        transition={isHomePage ? bgTransition : { duration: 0 }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-8"
      >
        {/* Left Action */}
        <motion.div
          className="flex-1 hidden md:flex"
          initial={{ opacity: isHomePage && !isScrolled ? 0 : 1 }}
          animate={{ opacity: isHomePage && !isScrolled ? 0 : 1 }}
          transition={isHomePage ? logoTransition : { duration: 0 }}
        >
          {/* <Link
            to="/contact"
            className="uppercase tracking-[0.3em] text-[10px] font-semibold hover:text-brand-gold transition-colors cursor-pointer"
          >
            Contact Us
          </Link> */}
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-brand-black hover:text-brand-gold active:text-brand-gold transition-colors cursor-pointer"
          >
            <Menu size={24} />
          </button>
        </motion.div>

        {/* Center Logo - Shrinks fast before background appears */}
        <motion.div
          className="flex-1 flex justify-center items-center relative"
          initial={{
            marginTop: isHomePage && !isScrolled ? "350px" : "0px",
            scale: isHomePage && !isScrolled ? 2 : 0.8,
          }}
          animate={{
            marginTop: isScrolled ? "0px" : "350px",
            scale: isHomePage && !isScrolled ? 2 : 0.8,
          }}
          transition={
            isMounted && isHomePage ? logoTransition : { duration: 0 }
          }
          style={{
            transformOrigin: "center center",
          }}
        >
          <Link to="/" className="flex items-center cursor-pointer">
            <img
              src={logoImg}
              alt="Agaar Oud Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </motion.div>

        {/* Right Icons - Appear quickly */}
        <motion.div
          className="flex-1 flex justify-end items-center gap-6 text-brand-black"
          initial={{ opacity: isScrolled ? 1 : 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={logoTransition}
        >
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hover:text-brand-gold transition-colors cursor-pointer"
          >
            <Search size={20} strokeWidth={1} />
          </button>
          <div className="relative">
            <button
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="hover:text-brand-gold transition-colors cursor-pointer"
            >
              <User size={20} strokeWidth={1} />
            </button>
            <AccountDropdown
              isOpen={isAccountOpen}
              onClose={() => setIsAccountOpen(false)}
            />
          </div>
          <Link
            to="/cart"
            className="hover:text-brand-gold transition-colors relative cursor-pointer"
          >
            <ShoppingBag size={20} strokeWidth={1} />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {getCartCount()}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden hover:text-brand-gold transition-colors cursor-pointer"
          >
            <Menu size={20} strokeWidth={1} />
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile Navbar - Simplified Always-Visible */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link to="/" className="flex-1">
            <img src={logoImg} alt="Agaar Oud" className="h-4 object-contain" />
          </Link>

          {/* Mobile Actions - Right Side Icons (Gucci Style: Bag, Account, Search, Menu) */}
          <div className="flex items-center gap-4">
            {/* Cart Icon with Badge */}
            <Link
              to="/cart"
              className="relative text-brand-black hover:text-brand-gold active:text-brand-gold transition-colors cursor-pointer"
            >
              <ShoppingBag size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Account Icon */}
            <div className="relative">
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className={`relative transition-colors cursor-pointer ${isAccountOpen ? "text-brand-gold" : "text-brand-black hover:text-brand-gold active:text-brand-gold"}`}
              >
                <User size={20} />
              </button>
              {/* Reuse the same dropdown - styling handles positioning */}
              <AccountDropdown
                isOpen={isAccountOpen}
                onClose={() => setIsAccountOpen(false)}
                isMobile={true}
              />
            </div>

            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-brand-black hover:text-brand-gold active:text-brand-gold transition-colors cursor-pointer"
            >
              <Search size={20} />
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className=" text-brand-black hover:text-brand-gold active:text-brand-gold transition-colors cursor-pointer"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  )
}
