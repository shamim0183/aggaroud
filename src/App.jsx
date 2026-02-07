import { lazy, Suspense } from "react"
import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import SmoothScroll from "./components/SmoothScroll"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"
import { WishlistProvider } from "./contexts/WishlistContext"

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"))
const Products = lazy(() => import("./pages/Products"))
const ProductDetail = lazy(() => import("./pages/ProductDetail"))
const Men = lazy(() => import("./pages/Men"))
const Women = lazy(() => import("./pages/Women"))
const Cart = lazy(() => import("./pages/Cart"))
const Contact = lazy(() => import("./pages/Contact"))
const About = lazy(() => import("./pages/About"))
const Shipping = lazy(() => import("./pages/Shipping"))
const Privacy = lazy(() => import("./pages/Privacy"))
const Terms = lazy(() => import("./pages/Terms"))
const Login = lazy(() => import("./pages/Login"))
const MyOrders = lazy(() => import("./pages/MyOrders"))
const AccountSettings = lazy(() => import("./pages/AccountSettings"))
const AddressBook = lazy(() => import("./pages/AddressBook"))
const Wishlist = lazy(() => import("./pages/Wishlist"))
const NotFound = lazy(() => import("./pages/NotFound"))

// Import ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute"
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange"

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-light">Loading...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          {/* ========== SMOOTH SCROLL FEATURE ========== */}
          {/* Professional smooth scrolling (Lenis) */}
          {/* To DISABLE: Remove <SmoothScroll> wrapper */}
          <SmoothScroll>
            <BrowserRouter>
              <ScrollToTopOnRouteChange />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 2000,
                  style: {
                    background: "#1a1a1a",
                    color: "#fff",
                    padding: "16px",
                    borderRadius: "4px",
                  },
                  success: {
                    iconTheme: {
                      primary: "#C9A55A",
                      secondary: "#fff",
                    },
                  },
                }}
              />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/men" element={<Men />} />
                    <Route path="/women" element={<Women />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/login" element={<Login />} />
                    {/* Protected Account Routes */}
                    <Route
                      path="/orders"
                      element={
                        <ProtectedRoute>
                          <MyOrders />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/account"
                      element={
                        <ProtectedRoute>
                          <AccountSettings />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/address-book"
                      element={
                        <ProtectedRoute>
                          <AddressBook />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/wishlist"
                      element={
                        <ProtectedRoute>
                          <Wishlist />
                        </ProtectedRoute>
                      }
                    />
                    {/* 404 Catch-all */}
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </SmoothScroll>
          {/* ========================================= */}
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}

export default App
