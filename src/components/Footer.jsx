export default function Footer() {
  return (
    <footer className="bg-brand-black text-white py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl mb-4 text-brand-gold">
              AGAAR OUD
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
              Crafting the finest oud fragrances from the rarest agarwood. A
              legacy of luxury and tradition.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="uppercase tracking-wider text-xs font-semibold mb-4 text-white">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a
                  href="/products"
                  className="hover:text-brand-gold transition-colors"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="/men"
                  className="hover:text-brand-gold transition-colors"
                >
                  Men's Collection
                </a>
              </li>
              <li>
                <a
                  href="/women"
                  className="hover:text-brand-gold transition-colors"
                >
                  Women's Collection
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="uppercase tracking-wider text-xs font-semibold mb-4 text-white">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a
                  href="/about"
                  className="hover:text-brand-gold transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-brand-gold transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="hover:text-brand-gold transition-colors"
                >
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-xs mb-4 md:mb-0">
            © 2026 Agaar Oud. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-white/50 hover:text-brand-gold transition-colors text-xs"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-white/50 hover:text-brand-gold transition-colors text-xs"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
