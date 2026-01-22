import { useEffect, useRef, useState } from "react"

/**
 * Professional lazy loading image component with WebP support
 * Automatically loads images when they enter viewport
 */
export default function LazyImage({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
}) {
  const imgRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
      },
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [])

  // Convert src to WebP if it's a JPG/PNG
  const getWebPSrc = (originalSrc) => {
    if (!originalSrc) return originalSrc
    // If it's already a /public path or external URL, return as-is
    if (originalSrc.startsWith("http") || originalSrc.startsWith("/images/")) {
      return originalSrc
    }
    // Convert /src/assets/images paths to /images (WebP optimized)
    return originalSrc
      .replace("/src/assets/images/", "/images/")
      .replace(/\.(jpg|jpeg|png)$/i, ".webp")
  }

  const webpSrc = getWebPSrc(src)

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={webpSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
        />
      )}
    </div>
  )
}
