# Agaar Oud - Luxury Arabian Fragrances

A premium e-commerce website for luxury oud fragrances, built with React + Vite and powered by Shopify.

## 🌟 Features

- **Custom React Frontend** - Beautiful Gucci-inspired minimalist design
- **Shopify Backend** - Secure payment processing and order management
- **User Authentication** - Firebase Auth with Google Sign-In
- **Shopping Cart** - Persistent cart with Shopify integration
- **Wishlist/Favorites** - Save products for later
- **User Account** - Orders, settings, address book, saved items
- **Contact Form** - EmailJS with reCAPTCHA spam protection
- **Fully Responsive** - Mobile, tablet, and desktop optimized
- **SEO Optimized** - Meta tags, semantic HTML

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend & Services

- **Shopify** - E-commerce backend, payment processing
- **Firebase** - Authentication, user management
- **EmailJS** - Contact form emails
- **Vercel** - Hosting & deployment

### APIs

- **Shopify Storefront API** - Product data, cart management
- **Firebase Auth API** - User authentication
- **Google reCAPTCHA v2** - Spam protection

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/shamim0183/aggaroud.git

# Navigate to project directory
cd aggaroud

# Install dependencies
npm install

# Create .env file (see Environment Variables section)
cp .env.example .env

# Start development server
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Shopify
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# EmailJS
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Google reCAPTCHA
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub** (this repo)
2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Environment Variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env`
   - Redeploy

## 📱 Pages

- **Home** (`/`) - Hero, featured products, about preview
- **Products** (`/products`) - Full product catalog
- **Product Detail** (`/products/:id`) - Individual product page
- **Men's Collection** (`/men`) - Men's fragrances
- **Women's Collection** (`/women`) - Women's fragrances
- **Cart** (`/cart`) - Shopping cart
- **Contact** (`/contact`) - Contact form
- **About** (`/about`) - Brand story
- **Login** (`/login`) - Sign in / Sign up

### Protected Pages (Require Authentication)

- **My Orders** (`/orders`) - Order history
- **Account Settings** (`/account`) - Profile settings
- **Address Book** (`/address-book`) - Saved addresses
- **Wishlist** (`/wishlist`) - Saved products

## 🎨 Design Philosophy

Inspired by luxury brands like Gucci:

- Minimalist, clean layout
- Premium typography (serif headings)
- Gold accent color (#C4A962)
- Smooth animations
- High-quality imagery
- Professional spacing

## 🛒 E-commerce Flow

1. **Browse** - View products from Shopify
2. **Add to Cart** - Shopify cart integration
3. **Checkout** - Redirect to Shopify secure checkout
4. **Payment** - Shopify handles all payment processing
5. **Confirmation** - Email sent, order tracked in Shopify

## 🔒 Security

- **HTTPS** - SSL encryption (Vercel automatic)
- **Environment Variables** - Sensitive data not exposed
- **Firebase Auth** - Secure user authentication
- **Shopify Payments** - PCI DSS Level 1 compliant
- **reCAPTCHA** - Bot protection on forms
- **Per-user data** - Cart, wishlist, and orders isolated per user

## 📊 Performance

- **Lazy Loading** - Images and routes
- **Code Splitting** - React.lazy() for pages
- **CDN** - Vercel global CDN
- **Optimized Images** - WebP format where supported
- **Lighthouse Score:** 90+ (Performance, Accessibility, SEO)

## 🧪 Testing

Run tests before deployment:

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint
```

## 📝 License

© 2026 Agaar Oud. All rights reserved.

## 👨‍💻 Developer

**Shamim Hossain**

- GitHub: [@shamim0183](https://github.com/shamim0183)
- Repository: [aggaroud](https://github.com/shamim0183/aggaroud)

## 🙏 Acknowledgments

- **Shopify** - E-commerce platform
- **Firebase** - Authentication
- **Vercel** - Hosting
- **EmailJS** - Email service
- **React Team** - Framework

---

Made with ❤️ for luxury fragrance lovers
