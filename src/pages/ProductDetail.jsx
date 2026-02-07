import { ArrowLeft, Heart, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import ImageZoom from "../components/ImageZoom"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"
import { fetchProducts } from "../lib/shopify"

export default function ProductDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProduct() {
      try {
        const products = await fetchProducts()
        const foundProduct = products.find(
          (p) => p.id.includes(id) || p.shopifyId === id,
        )

        if (foundProduct) {
          setProduct(foundProduct)
          // Initialize selected variant when product loads
          if (foundProduct.variants && foundProduct.variants.length > 0) {
            setSelectedVariant(foundProduct.variants[0])
          }
        } else {
          setError("Product not found")
        }
        setLoading(false)
      } catch (err) {
        console.error("❌ Error loading product:", err)
        setError(err.message)
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  // Reset selected image when variant changes to show variant's primary image
  useEffect(() => {
    if (selectedVariant) {
      setSelectedImage(0)
    }
  }, [selectedVariant])

  if (loading) {
    return (
      <div className="min-h-screen py-32 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <h1 className="font-serif text-5xl mb-4 text-brand-black">
              Loading Product...
            </h1>
            <p className="text-gray-600">Fetching from Shopify</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
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

  // Get variants from product data (sizes like 6ml, 12ml)
  const variants = product.variants || [
    { id: "6ml", size: "6ml", price: product.price },
    { id: "12ml", size: "12ml", price: product.price * 1.8 },
  ]

  const handleAddToCart = () => {
    const productWithVariant = {
      ...product,
      selectedVariant: selectedVariant,
      price: selectedVariant ? selectedVariant.price : product.price,
    }
    addToCart(productWithVariant, quantity)
    toast.success(
      `${quantity}x ${product.name} (${selectedVariant?.size || "Default"}) added to cart!`,
    )
  }

  // Parse description to extract sections (main description, TOP, HEART, BASE)
  const parseDescription = (description) => {
    if (!description) return { main: "", top: "", heart: "", base: "" }

    // Try to extract sections even if they're on the same line
    const topMatch = description.match(/TOP[:\s]*(.*?)(?=HEART|BASE|$)/is)
    const heartMatch = description.match(/HEART[:\s]*(.*?)(?=BASE|$)/is)
    const baseMatch = description.match(/BASE[:\s]*(.*?)$/is)

    // Extract main description (everything before TOP, HEART, or BASE)
    const mainMatch = description.match(/^(.*?)(?=TOP|HEART|BASE|$)/is)

    return {
      main: mainMatch ? mainMatch[1].trim() : "",
      top: topMatch ? topMatch[1].trim() : "",
      heart: heartMatch ? heartMatch[1].trim() : "",
      base: baseMatch ? baseMatch[1].trim() : "",
    }
  }

  const parsedDescription = product
    ? parseDescription(product.description)
    : { main: "", top: "", heart: "", base: "" }

  const handleToggleWishlist = () => {
    // Check if user is logged in
    if (!user) {
      toast.error("Please sign in to save items to wishlist")
      return
    }

    if (product) {
      const isFavorite = isInWishlist(product.id)
      toggleWishlist(product.id)

      if (isFavorite) {
        toast.success(`Removed from wishlist`)
      } else {
        toast.success(`Added to wishlist!`)
      }
    }
  }

  const isFavorite = product ? isInWishlist(product.id) : false

  // Get current display image based on selected variant or product images
  const displayImages = selectedVariant?.image
    ? [
        selectedVariant.image,
        ...product.images.filter((img) => img !== selectedVariant.image),
      ]
    : product.images || [product.image]

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
              {/* ========== IMAGE ZOOM FEATURE ========== */}
              {/* Professional zoom-on-hover (Amazon/Nike style) */}
              {/* To DISABLE: Comment out <ImageZoom> and uncomment <img> below */}

              <ImageZoom
                src={displayImages[selectedImage]}
                alt={product.name}
              />

              {/* FALLBACK: Regular image (uncomment if disabling zoom) */}
              {/* <img
                src={displayImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              /> */}
              {/* ========================================= */}
            </div>
            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {displayImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden cursor-pointer ${
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
            <p className="text-4xl text-brand-gold mb-8">
              ${selectedVariant ? selectedVariant.price : product.price}
            </p>

            {parsedDescription.main && (
              <p className="text-gray-600 leading-relaxed mb-8">
                {parsedDescription.main}
              </p>
            )}

            {/* Size Selector - Variant Options */}
            {variants && variants.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm uppercase tracking-wider mb-3">
                  Bottle Size
                </label>
                <div className="flex gap-3">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`cursor-pointer px-6 py-2.5 border-2 text-sm uppercase tracking-wider transition-all ${
                        selectedVariant?.id === variant.id
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:border-black bg-white text-black"
                      }`}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm uppercase tracking-wider mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 hover:border-brand-gold transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="text-lg font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 hover:border-brand-gold transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="cursor-pointer flex-1 px-8 py-4 bg-brand-black text-white uppercase tracking-wider text-sm hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`px-4 py-4 border transition-colors cursor-pointer ${
                  isFavorite
                    ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                    : "border-gray-300 hover:border-brand-gold"
                }`}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Product Details */}
            {/* <div className="border-t border-gray-200 pt-8">
              <h3 className="uppercase tracking-wider text-sm font-semibold mb-4">
                Product Details
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Category: {product.category}</li>
                <li>• 100% Pure Oud Oil</li>
                <li>• Handcrafted in small batches</li>
                <li>• Ships within 2-3 business days</li>
              </ul>
            </div> */}

            {/* Fragrance Notes - Parsed from Shopify Description */}
            {(parsedDescription.top ||
              parsedDescription.heart ||
              parsedDescription.base) && (
              <div className="border-t border-gray-200 pt-8 mt-6">
                <h3 className="uppercase tracking-wider text-sm font-semibold mb-6">
                  Fragrance Notes
                </h3>
                <div className="space-y-6">
                  {parsedDescription.top && (
                    <div>
                      <h4 className="uppercase tracking-wider text-xs font-semibold mb-2 text-gray-900">
                        TOP
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {parsedDescription.top}
                      </p>
                    </div>
                  )}

                  {parsedDescription.heart && (
                    <div>
                      <h4 className="uppercase tracking-wider text-xs font-semibold mb-2 text-gray-900">
                        HEART
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {parsedDescription.heart}
                      </p>
                    </div>
                  )}

                  {parsedDescription.base && (
                    <div>
                      <h4 className="uppercase tracking-wider text-xs font-semibold mb-2 text-gray-900">
                        BASE
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {parsedDescription.base}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
