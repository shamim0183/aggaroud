import { AnimatePresence, motion } from "framer-motion"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function AccountDropdown({ isOpen, onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.success("Logged out successfully")
    onClose()
    navigate("/")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
          />

          {/* Dropdown - Gucci Style */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[70px] right-8 w-64 bg-white shadow-lg z-50"
          >
            <nav className="py-2">
              {!user ? (
                <>
                  {/* Not Logged In - Show Sign In Option */}
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="block px-6 py-3 text-sm font-semibold text-brand-black hover:bg-gray-50 transition-colors uppercase tracking-wider"
                  >
                    SIGN IN
                  </Link>
                </>
              ) : (
                <>
                  {/* Logged In - Show Account Options */}
                  <Link
                    to="/orders"
                    onClick={onClose}
                    className="block px-6 py-3 text-sm font-semibold text-brand-black hover:bg-gray-50 transition-colors uppercase tracking-wider"
                  >
                    MY ORDERS
                  </Link>
                  <Link
                    to="/account"
                    onClick={onClose}
                    className="block px-6 py-3 text-sm font-semibold text-brand-black hover:bg-gray-50 transition-colors uppercase tracking-wider"
                  >
                    ACCOUNT SETTINGS
                  </Link>
                  <Link
                    to="/address-book"
                    onClick={onClose}
                    className="block px-6 py-3 text-sm font-semibold text-brand-black hover:bg-gray-50 transition-colors uppercase tracking-wider"
                  >
                    ADDRESS BOOK
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={onClose}
                    className="block px-6 py-3 text-sm font-semibold text-brand-black hover:bg-gray-50 transition-colors uppercase tracking-wider"
                  >
                    SAVED ITEMS
                  </Link>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-2"></div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-6 py-3 text-sm font-semibold text-brand-black hover:bg-gray-50 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    SIGN OUT
                  </button>
                </>
              )}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
