import { ZoomIn } from "lucide-react"
import { useState } from "react"

/**
 * Professional Click-to-Zoom Component
 * Shopify-style: Click to zoom, shows zoom icon indicator
 *
 * To disable: Comment out <ImageZoom> in ProductDetail.jsx
 */
export default function ImageZoom({ src, alt }) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    if (!isZoomed) return

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setPosition({ x, y })
  }

  const handleClick = () => {
    setIsZoomed(!isZoomed)
    if (!isZoomed) {
      setPosition({ x: 50, y: 50 })
    }
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${isZoomed ? "cursor-move" : "cursor-pointer"}`}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Main Image with Zoom */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 ease-out"
        style={{
          transform: isZoomed ? "scale(2)" : "scale(1)",
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />

      {/* Zoom Icon Indicator - Top Left */}
      {!isZoomed && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand-black p-2 rounded-full shadow-lg pointer-events-none z-10 flex items-center gap-2">
          <ZoomIn size={20} strokeWidth={2} />
        </div>
      )}

      {/* Active Zoom Badge */}
      {isZoomed && (
        <div className="absolute top-4 right-4 bg-brand-gold text-white px-3 py-1.5 rounded-full text-xs font-semibold pointer-events-none z-10 shadow-lg">
          🔍 Click to exit
        </div>
      )}
    </div>
  )
}
