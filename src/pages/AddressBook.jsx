import { motion } from "framer-motion"
import { MapPin, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useAuth } from "../contexts/AuthContext"

export default function AddressBook() {
  const { user } = useAuth()
  const [addresses, setAddresses] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: false,
  })

  useEffect(() => {
    loadAddresses()
  }, [user])

  const loadAddresses = () => {
    if (!user) return
    const saved = localStorage.getItem(`addresses_${user.uid}`)
    if (saved) {
      setAddresses(JSON.parse(saved))
    }
  }

  const saveAddresses = (newAddresses) => {
    if (!user) return
    localStorage.setItem(`addresses_${user.uid}`, JSON.stringify(newAddresses))
    setAddresses(newAddresses)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingId) {
      // Update existing address
      const updated = addresses.map((addr) =>
        addr.id === editingId ? { ...formData, id: editingId } : addr,
      )
      saveAddresses(updated)
      toast.success("Address updated successfully")
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        id: Date.now().toString(),
      }

      // If this is set as default, unset all others
      let updated = formData.isDefault
        ? addresses.map((addr) => ({ ...addr, isDefault: false }))
        : addresses

      updated = [...updated, newAddress]
      saveAddresses(updated)
      toast.success("Address added successfully")
    }

    resetForm()
  }

  const handleEdit = (address) => {
    setFormData(address)
    setEditingId(address.id)
    setShowAddForm(true)
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this address?")) {
      const updated = addresses.filter((addr) => addr.id !== id)
      saveAddresses(updated)
      toast.success("Address deleted")
    }
  }

  const handleSetDefault = (id) => {
    const updated = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    }))
    saveAddresses(updated)
    toast.success("Default address updated")
  }

  const resetForm = () => {
    setFormData({
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      isDefault: false,
    })
    setEditingId(null)
    setShowAddForm(false)
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-light text-brand-black mb-2 uppercase tracking-wider">
              Address Book
            </h1>
            <p className="text-gray-600">Manage your shipping addresses</p>
          </div>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-brand-black text-white px-6 py-3 flex items-center gap-2 hover:bg-gray-800 transition-colors uppercase tracking-wider text-sm cursor-pointer"
            >
              <Plus size={20} />
              Add Address
            </button>
          )}
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 p-8 mb-8"
          >
            <h2 className="text-xl font-light text-brand-black mb-6 uppercase tracking-wider">
              {editingId ? "Edit Address" : "Add New Address"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-gold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-gold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-gold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-gold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                    ZIP/Postal Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-gold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-gold"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-brand-gold focus:ring-brand-gold border-gray-300"
                />
                <label
                  htmlFor="isDefault"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Set as default shipping address
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-brand-black text-white px-6 py-3 hover:bg-gray-800 transition-colors uppercase tracking-wider text-sm"
                >
                  {editingId ? "Update Address" : "Save Address"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-gray-300 text-brand-black px-6 py-3 hover:bg-gray-50 transition-colors uppercase tracking-wider text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Address List */}
        {addresses.length === 0 && !showAddForm ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <MapPin size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-light text-brand-black mb-2">
              No addresses saved
            </h2>
            <p className="text-gray-600 mb-8">
              Add a shipping address to speed up checkout
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-block bg-brand-black text-white px-8 py-3 hover:bg-gray-800 transition-colors uppercase tracking-wider text-sm cursor-pointer"
            >
              Add Address
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address, index) => (
              <motion.div
                key={address.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 p-6 relative"
              >
                {address.isDefault && (
                  <span className="absolute top-4 right-4 bg-brand-gold text-white text-xs px-3 py-1 uppercase tracking-wider">
                    Default
                  </span>
                )}

                <div className="mb-4">
                  <p className="font-semibold text-brand-black">
                    {address.name}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">{address.street}</p>
                  <p className="text-gray-600 text-sm">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-gray-600 text-sm">{address.country}</p>
                </div>

                <div className="flex gap-2">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="text-sm text-brand-gold hover:underline uppercase tracking-wider"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-sm text-gray-600 hover:text-brand-black uppercase tracking-wider"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="text-sm text-red-600 hover:text-red-700 uppercase tracking-wider flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
