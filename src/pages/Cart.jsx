import { Gift, Lock, Package, ShoppingBag, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import ProductGrid from "../components/ProductGrid"
import { useCart } from "../contexts/CartContext"
import productsData from "../data/products.json"

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const cartTotal = getCartTotal()

  // Get recommended products (exclude cart items, show featured products)
  const cartProductIds = cart.map((item) => item.id)
  const recommendedProducts = productsData
    .filter((p) => !cartProductIds.includes(p.id) && p.featured)
    .slice(0, 3)

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

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-sm text-gray-500">
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-semibold mb-8">
                  <span>Total</span>
                  <span className="text-brand-gold">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <button className="w-full bg-brand-black text-white py-4 rounded-sm font-semibold uppercase tracking-widest hover:bg-brand-gold transition-colors mb-4 cursor-pointer">
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
