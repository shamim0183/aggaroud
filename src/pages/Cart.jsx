import {
  Check,
  Gift,
  Lock,
  Package,
  ShoppingBag,
  Tag,
  Trash2,
  X,
  Truck,
} from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import ProductGrid from "../components/ProductGrid"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { createCheckout } from "../lib/shopify"
import productsData from "../data/products.json"

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartSubtotal,
    getDiscount,
    getShippingCost,
    getCartTotal,
    selectedShipping,
    selectShipping,
    shippingOptions,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
  } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [promoInput, setPromoInput] = useState("")

  const subtotal = getCartSubtotal()
  const discount = getDiscount()
  const shippingCost = getShippingCost()
  const total = getCartTotal()
  const isFreeShipping =
    selectedShipping.freeThreshold && subtotal >= selectedShipping.freeThreshold

  // Calculate free shipping progress
  const freeShippingThreshold =
    shippingOptions.find((opt) => opt.freeThreshold)?.freeThreshold || 150
  const progressToFreeShipping = Math.min(
    (subtotal / freeShippingThreshold) * 100,
    100,
  )
  const amountToFreeShipping = Math.max(freeShippingThreshold - subtotal, 0)

  // Get recommended products (exclude cart items, show featured products)
  const cartProductIds = cart.map((item) => item.id)
  const recommendedProducts = productsData
    .filter((p) => !cartProductIds.includes(p.id) && p.featured)
    .slice(0, 3)

  const handleCheckout = async () => {
    try {
      // Show loading toast
      const loadingToast = toast.loading("Creating checkout...")

      // Create Shopify checkout with cart items
      const checkoutUrl = await createCheckout(cart)

      // Dismiss loading toast
      toast.dismiss(loadingToast)

      // Success message
      toast.success("Redirecting to secure checkout...")

      // Redirect to Shopify checkout page (includes PayPal and all payment options)
      window.location.href = checkoutUrl
    } catch (error) {
      console.error("Checkout error:", error)
      toast.error("Failed to create checkout. Please try again.")
    }
  }

  const handleApplyPromo = () => {
    if (!promoInput.trim()) {
      toast.error("Please enter a promo code")
      return
    }

    const result = applyPromoCode(promoInput.trim())
    if (result.success) {
      toast.success(result.message)
      setPromoInput("")
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <h1 className="font-serif text-5xl mb-2 text-brand-black">
          Shopping Cart
        </h1>
        <p className="text-gray-600 mb-12">
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </p>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            {/* Empty Cart State */}
            <div className="bg-gray-50 rounded-sm p-16 mb-12">
              <ShoppingBag
                size={64}
                className="mx-auto mb-6 text-gray-300"
                strokeWidth={1}
              />
              <h2 className="font-serif text-3xl mb-4 text-brand-black">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Discover our exquisite collection of luxury fragrances
              </p>
              <Link
                to="/products"
                className="inline-block border-2 border-brand-black text-brand-black px-10 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-brand-black hover:text-white transition-all duration-300 cursor-pointer"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Cart Items List */}
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 pb-6 border-b border-gray-200"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-sm"
                    />
                    <div className="flex-1">
                      <h3 className="font-serif text-xl mb-2 text-brand-black">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {item.category}
                      </p>
                      <p className="text-brand-gold font-semibold text-lg mb-4">
                        ${item.price}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-sm">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                          >
                            −
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary - Shopify Style */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-8 rounded-sm sticky top-24">
                <h2 className="font-serif text-2xl mb-6 text-brand-black">
                  Order Summary
                </h2>

                {/* Free Shipping Progress Bar */}
                {amountToFreeShipping > 0 && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-sm border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck size={16} className="text-blue-600" />
                      <p className="text-sm font-semibold text-blue-900">
                        ${amountToFreeShipping.toFixed(2)} away from FREE
                        shipping!
                      </p>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressToFreeShipping}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Promo Code Input */}
                <div className="mb-6">
                  <h3 className="font-semibold text-sm mb-3 text-brand-black uppercase tracking-wide">
                    Promo Code
                  </h3>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-500 rounded-sm">
                      <div className="flex items-center gap-2">
                        <Tag className="text-green-600" size={18} />
                        <div>
                          <p className="font-semibold text-green-900 text-sm">
                            {appliedPromo.code}
                          </p>
                          <p className="text-xs text-green-700">
                            {appliedPromo.description}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          removePromoCode()
                          toast.success("Promo code removed")
                        }}
                        className="text-green-700 hover:text-green-900 cursor-pointer"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) =>
                          setPromoInput(e.target.value.toUpperCase())
                        }
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleApplyPromo()
                        }
                        placeholder="Enter code"
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-sm focus:border-brand-gold focus:outline-none text-sm uppercase"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-6 py-3 bg-brand-black text-white rounded-sm hover:bg-brand-gold transition-colors font-semibold text-sm uppercase tracking-wide cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* Shipping Options */}
                <div className="mb-6">
                  <h3 className="font-semibold text-sm mb-4 text-brand-black uppercase tracking-wide">
                    Select Shipping
                  </h3>
                  <div className="space-y-3">
                    {shippingOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => selectShipping(option)}
                        className={`w-full p-4 border-2 rounded-sm transition-all duration-200 text-left cursor-pointer ${selectedShipping.id === option.id
                          ? "border-brand-gold bg-brand-gold/5"
                          : "border-gray-200 hover:border-brand-gold/50"
                          }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-brand-black text-sm">
                                {option.name}
                              </span>
                              {selectedShipping.id === option.id && (
                                <Check size={16} className="text-brand-gold" />
                              )}
                            </div>
                            <p className="text-xs text-gray-600">
                              {option.description}
                            </p>
                          </div>
                          <span className="font-semibold text-brand-gold ml-2 text-sm">
                            ${option.price.toFixed(2)}
                          </span>
                        </div>
                        {option.note && (
                          <p className="text-xs text-gray-500 mt-2">
                            {option.note}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estimated Delivery Date */}
                <div className="mb-6 p-4 bg-gray-100 rounded-sm">
                  <p className="text-xs text-gray-600 mb-1">
                    Estimated Delivery
                  </p>
                  <p className="font-semibold text-brand-black">
                    {new Date(
                      Date.now() + 7 * 24 * 60 * 60 * 1000,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(
                      Date.now() + 14 * 24 * 60 * 60 * 1000,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="space-y-4 mb-6 pb-6 border-t border-gray-200 pt-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedPromo?.value}% off)</span>
                      <span className="font-semibold">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span
                      className={`font-semibold ${isFreeShipping || appliedPromo?.type === "free_shipping" ? "text-green-600" : ""}`}
                    >
                      {isFreeShipping || appliedPromo?.type === "free_shipping"
                        ? "FREE"
                        : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  {(isFreeShipping ||
                    appliedPromo?.type === "free_shipping") && (
                      <p className="text-xs text-green-600">
                        🎉 You qualified for free shipping!
                      </p>
                    )}
                </div>

                <div className="flex justify-between text-xl font-semibold mb-8">
                  <span>Total</span>
                  <span className="text-brand-gold">${total.toFixed(2)}</span>
                </div>

                {/* PayPal Style Checkout Button */}
                <div className="space-y-3 mb-4">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#FFC439] hover:bg-[#F7B731] text-[#003087] py-4 rounded font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 overflow-hidden"
                  >
                    <span className="font-bold animate-slideInRight">Pay with</span>
                    <svg
                      viewBox="0 0 124 33"
                      className="h-7 animate-fadeIn"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid"
                      style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
                    >
                      <path
                        fill="#003087"
                        d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zM66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.075h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895z"
                      />
                      <path
                        fill="#009cde"
                        d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906zM115.434 13.075h-3.273a.567.567 0 0 0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0-.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zM119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822c.469 0 .867-.34.939-.803l2.768-17.536a.57.57 0 0 0-.562-.659h-3.16a.571.571 0 0 0-.562.482z"
                      />
                      <path
                        fill="#003087"
                        d="M7.266 29.154l.523-3.322-1.165-.027H1.061L4.927 1.292a.316.316 0 0 1 .314-.268h9.38c3.114 0 5.263.648 6.385 1.927.526.6.861 1.227 1.023 1.917.17.724.173 1.589.007 2.644l-.012.077v.676l.526.298a3.69 3.69 0 0 1 1.065.812c.45.513.741 1.165.864 1.938.127.795.085 1.741-.123 2.812-.24 1.232-.628 2.305-1.152 3.183a6.547 6.547 0 0 1-1.825 2c-.696.494-1.523.869-2.458 1.109-.906.236-1.939.355-3.072.355h-.73c-.522 0-1.029.188-1.427.525a2.21 2.21 0 0 0-.744 1.328l-.055.299-.924 5.855-.042.215c-.011.068-.03.102-.058.125a.155.155 0 0 1-.096.035H7.266z"
                      />
                      <path
                        fill="#009cde"
                        d="M23.048 7.667c-.028.179-.06.362-.096.55-1.237 6.351-5.469 8.545-10.874 8.545H9.326c-.661 0-1.218.48-1.321 1.132L6.596 26.83l-.399 2.533a.704.704 0 0 0 .695.814h4.881c.578 0 1.069-.42 1.16-.99l.048-.248.919-5.832.059-.32c.09-.572.582-.992 1.16-.992h.73c4.729 0 8.431-1.92 9.513-7.476.452-2.321.218-4.259-.978-5.622a4.667 4.667 0 0 0-1.336-1.03z"
                      />
                      <path
                        fill="#012169"
                        d="M21.754 7.151a9.757 9.757 0 0 0-1.203-.267 15.284 15.284 0 0 0-2.426-.177h-7.352a1.172 1.172 0 0 0-1.159.992L8.05 17.605l-.045.289a1.336 1.336 0 0 1 1.321-1.132h2.752c5.405 0 9.637-2.195 10.874-8.545.037-.188.068-.371.096-.55a6.594 6.594 0 0 0-1.017-.429 9.045 9.045 0 0 0-.277-.087z"
                      />
                      <path
                        fill="#003087"
                        d="M9.614 7.699a1.169 1.169 0 0 1 1.159-.991h7.352c.871 0 1.684.057 2.426.177a9.757 9.757 0 0 1 1.481.353c.365.121.704.264 1.017.429.368-2.347-.003-3.945-1.272-5.392C20.378.682 17.853 0 14.622 0h-9.38c-.66 0-1.223.48-1.325 1.133L.01 25.898a.806.806 0 0 0 .795.932h5.791l1.454-9.225 1.564-9.906z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={handleCheckout}
                    className="w-full text-center text-sm text-gray-600 hover:text-brand-black transition-colors cursor-pointer underline"
                  >
                    More payment options
                  </button>
                </div>

                <Link
                  to="/products"
                  className="block w-full text-center border-2 border-brand-black text-brand-black py-4 rounded-sm font-semibold uppercase tracking-widest hover:bg-brand-black hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Continue Shopping
                </Link>

                {/* Trust Badges */}
                <div className="mt-8 pt-8 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Lock size={18} className="text-brand-gold" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Package size={18} className="text-brand-gold" />
                    <span>30-Day Returns</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Gift size={18} className="text-brand-gold" />
                    <span>Free Gift Wrapping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* You May Also Like Section */}
        {recommendedProducts.length > 0 && (
          <section className="mt-20 pt-20 border-t border-gray-200">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl mb-4 text-brand-black">
                You May Also Like
              </h2>
              <p className="text-gray-600 font-light">
                Complete your collection with these exquisite fragrances
              </p>
            </div>
            <ProductGrid products={recommendedProducts} />
          </section>
        )}
      </div>
    </div>
  )
}
