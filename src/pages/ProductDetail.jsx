import { ArrowLeft, Heart, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import productsData from "../data/products.json"

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = productsData.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="min-h-screen py-32 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-4xl mb-4">Product not found</h1>
          <Link to="/products" className="text-brand-gold hover:underline">
            Return to products
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast.success(`${quantity}x ${product.name} added to cart!`)
  }

  const images = product.images || [product.image]

  return (
    <div className="min-h-screen py-32 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-gold transition-colors mb-12"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-brand-gold" : ""
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="font-serif text-5xl mb-4 text-brand-black">
              {product.name}
            </h1>
            <p className="text-4xl text-brand-gold mb-8">${product.price}</p>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm uppercase tracking-wider mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 hover:border-brand-gold transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 hover:border-brand-gold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 px-8 py-4 bg-brand-black text-white uppercase tracking-wider text-sm hover:bg-brand-gold transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button className="px-4 py-4 border border-gray-300 hover:border-brand-gold transition-colors">
                <Heart size={20} />
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="uppercase tracking-wider text-sm font-semibold mb-4">
                Product Details
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Category: {product.category}</li>
                <li>• 100% Pure Oud Oil</li>
                <li>• Handcrafted in small batches</li>
                <li>• Ships within 2-3 business days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
