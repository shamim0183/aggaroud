import { motion } from "framer-motion"
import { Package } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function MyOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [user])

  const loadOrders = () => {
    if (!user) {
      setOrders([])
      setLoading(false)
      return
    }

    // Load orders from localStorage for now
    const saved = localStorage.getItem(`orders_${user.uid}`)
    if (saved) {
      setOrders(JSON.parse(saved))
    }
    setLoading(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50"
      case "shipped":
        return "text-blue-600 bg-blue-50"
      case "processing":
        return "text-yellow-600 bg-yellow-50"
      case "cancelled":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light text-brand-black mb-2 uppercase tracking-wider">
            My Orders
          </h1>
          <p className="text-gray-600">View and track your orders</p>
        </div>

        {/* Filter Tabs */}
        {orders.length > 0 && (
          <div className="mb-8 flex gap-4 border-b border-gray-200">
            {["all", "processing", "shipped", "delivered"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`pb-4 px-2 uppercase tracking-wider text-sm font-semibold transition-colors ${
                  filter === status
                    ? "border-b-2 border-brand-gold text-brand-black"
                    : "text-gray-500 hover:text-brand-black"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        )}

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-light text-brand-black mb-2">
              No orders found
            </h2>
            <p className="text-gray-600 mb-8">
              {filter === "all"
                ? "You haven't placed any orders yet"
                : `No ${filter} orders`}
            </p>
            <Link
              to="/products"
              className="inline-block bg-brand-black text-white px-8 py-3 hover:bg-gray-800 transition-colors uppercase tracking-wider text-sm"
            >
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      Order #
                      <span className="font-semibold text-brand-black">
                        {order.id}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover bg-gray-50"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-brand-black">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-brand-black">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"}
                  </p>
                  <p className="text-lg font-semibold text-brand-black">
                    Total: ${order.total.toFixed(2)}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-4">
                  <Link
                    to={`/order/${order.id}`}
                    className="text-sm text-brand-gold hover:underline uppercase tracking-wider"
                  >
                    View Details
                  </Link>
                  {order.status === "delivered" && (
                    <button className="text-sm text-gray-600 hover:text-brand-black uppercase tracking-wider">
                      Order Again
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
