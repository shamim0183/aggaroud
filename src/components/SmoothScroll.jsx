import Lenis from "lenis"
import { useEffect } from "react"

/**
 * Professional Smooth Scroll Component using Lenis
 * Provides buttery-smooth scrolling like Apple, Awwwards sites
 *
 * To DISABLE: Remove <SmoothScroll> from App.jsx
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Scroll duration (adjust for speed)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
      orientation: "vertical", // Vertical scroll only
      gestureOrientation: "vertical",
      smoothWheel: true, // Enable smooth wheel scrolling
      wheelMultiplier: 1, // Scroll speed multiplier
      touchMultiplier: 2, // Touch scroll multiplier (mobile)
      infinite: false, // Disable infinite scroll
    })

    // Animation loop
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup on unmount
    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
