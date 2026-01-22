import { motion } from "framer-motion"
import { Eye, EyeOff, LogIn, Mail, UserPlus } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Login() {
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { signup, login, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isSignup) {
        // Sign up
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords don't match")
          setLoading(false)
          return
        }
        if (formData.password.length < 6) {
          toast.error("Password must be at least 6 characters")
          setLoading(false)
          return
        }
        await signup(formData.email, formData.password)
        toast.success("Account created successfully!")
      } else {
        // Sign in
        await login(formData.email, formData.password)
        toast.success("Logged in successfully!")
      }
      navigate("/")
    } catch (error) {
      console.error("Auth error:", error)
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use")
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address")
      } else if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        toast.error("Invalid email or password")
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password")
      } else {
        toast.error(isSignup ? "Failed to create account" : "Failed to sign in")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
      toast.success("Signed in with Google!")
      navigate("/")
    } catch (error) {
      console.error("Google sign-in error:", error)
      toast.error("Failed to sign in with Google")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-md mx-auto px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl mb-4 text-brand-black">
            MY AGAAR OUD ACCOUNT
          </h1>
        </motion.div>

        {/* Google Sign In Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full border-2 border-gray-300 text-brand-black py-4 rounded-sm hover:border-brand-gold transition-all duration-300 font-semibold uppercase tracking-widest text-sm mb-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          CONTINUE WITH GOOGLE
        </motion.button>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 my-8"
        >
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-600 text-sm">OR</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </motion.div>

        {/* Email/Password Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-center text-lg mb-6 text-brand-black">
            CONTINUE WITH YOUR EMAIL ADDRESS
          </h2>
          <p className="text-center text-sm text-gray-600 mb-8">
            Sign in with your email and password or create a profile if you are
            new.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2 text-gray-700"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-brand-gold transition-colors"
                placeholder="name@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2 text-gray-700"
              >
                {isSignup ? "Create Password *" : "Password *"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-brand-gold transition-colors"
                  placeholder={
                    isSignup ? "Minimum 6 characters" : "Enter password"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {isSignup && (
                <p className="text-xs text-gray-500 mt-2">
                  • Minimum 6 characters
                  <br />• Please use a strong password
                </p>
              )}
            </div>

            {/* Confirm Password (Signup only) */}
            {isSignup && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-brand-gold transition-colors"
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-black text-white py-4 rounded-sm hover:bg-brand-gold transition-colors font-semibold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading
                ? "PLEASE WAIT..."
                : isSignup
                  ? "CREATE ACCOUNT"
                  : "CONTINUE"}
            </button>
          </form>

          {/* Toggle Sign In / Sign Up */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsSignup(!isSignup)
                setFormData({ email: "", password: "", confirmPassword: "" })
              }}
              className="text-sm text-gray-600 hover:text-brand-gold transition-colors cursor-pointer"
            >
              {isSignup ? (
                <>
                  Already have an account?{" "}
                  <span className="font-semibold underline">Sign In</span>
                </>
              ) : (
                <>
                  New to Agaar Oud?{" "}
                  <span className="font-semibold underline">
                    Create Account
                  </span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="font-serif text-2xl text-center mb-8 text-brand-black">
            JOIN AGAAR OUD
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="text-brand-gold" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Track Your Orders</h4>
              <p className="text-sm text-gray-600">
                Follow your orders every step of the way
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-brand-gold" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Streamline Checkout</h4>
              <p className="text-sm text-gray-600">
                Check out faster with saved addresses and payment methods
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="text-brand-gold" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Book an Appointment</h4>
              <p className="text-sm text-gray-600">
                Enjoy priority access to our boutique and in-store consultations
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
