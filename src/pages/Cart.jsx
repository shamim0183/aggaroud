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

  const handleCheckout = () => {
    if (!user) {
      // Not logged in - redirect to login with return URL
      toast.error("Please sign in to continue to checkout")
      navigate("/login?redirect=/cart")
    } else {
      // Logged in - proceed to checkout
      // TODO: Implement actual checkout flow (Shopify integration)
      toast.success("Proceeding to checkout...")
      // navigate("/checkout") // When checkout page is ready
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
                        className={`w-full p-4 border-2 rounded-sm transition-all duration-200 text-left cursor-pointer ${
                          selectedShipping.id === option.id
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

                <button
                  onClick={handleCheckout}
                  className="w-full bg-brand-black text-white py-4 rounded-sm font-semibold uppercase tracking-widest hover:bg-brand-gold transition-colors mb-4 cursor-pointer"
                >
                  Proceed to Checkout
                </button>

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
