import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor code splitting for better caching
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "animation-vendor": ["gsap", "framer-motion"],
          "ui-vendor": ["lucide-react", "swiper", "react-hot-toast"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
})
