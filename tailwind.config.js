/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Luxury Palette
        "brand-black": "#0a0a0a",
        "brand-white": "#ffffff",
        "brand-gold": "#d4af37",
        "brand-emerald": "#1b4d3e",
        "brand-gray": "#f5f5f5",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        "header-expanded": "200px",
        "header-collapsed": "80px",
      },
    },
  },
  plugins: [],
}
