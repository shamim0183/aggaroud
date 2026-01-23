import { createContext, useContext, useEffect, useRef, useState } from "react"
import promoCodes from "../data/promoCodes.json"
import shippingOptions from "../data/shipping.json"
import { useAuth } from "./AuthContext"

const CartContext = createContext()

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}

export function CartProvider({ children }) {
  const { user } = useAuth()
  const isFirstMount = useRef(true)
  const [cart, setCart] = useState(() => {
    // Look for any user cart (cart_<uid>) in localStorage
    const allKeys = Object.keys(localStorage)
    const userCartKey = allKeys.find(
      (key) => key.startsWith("cart_") && key !== "cart_guest",
    )

    if (userCartKey) {
      try {
        const savedCart = localStorage.getItem(userCartKey)
        if (savedCart) {
          // console.log("Loading user cart from:", userCartKey)
          return JSON.parse(savedCart)
        }
      } catch (e) {
        console.error("Error loading cart:", e)
      }
    }

    // Fallback to guest cart
    const guestCart = localStorage.getItem("cart_guest")
    if (guestCart) {
      return JSON.parse(guestCart)
    }

    return []
  })
  const [selectedShipping, setSelectedShipping] = useState(() => {
    // Initialize shipping from localStorage or default to standard
    const saved = localStorage.getItem("selected_shipping")
    return saved ? JSON.parse(saved) : shippingOptions[0] // Default to standard shipping
  })
  const [appliedPromo, setAppliedPromo] = useState(() => {
    // Initialize promo from localStorage
    const saved = localStorage.getItem("applied_promo")
    return saved ? JSON.parse(saved) : null
  })

  // Load/migrate cart when user auth state changes
  useEffect(() => {
    // On first mount with no user, skip (guest cart already loaded in initial state)
    if (isFirstMount.current && !user) {
      isFirstMount.current = false
      return
    }

    // Mark that we've passed first mount
    if (isFirstMount.current) {
      isFirstMount.current = false
    }

    if (user) {
      // User just logged in or page loaded while logged in
      const userCart = localStorage.getItem(`cart_${user.uid}`)
      const guestCart = localStorage.getItem("cart_guest")

      if (userCart) {
        // User has existing cart, load it
        setCart(JSON.parse(userCart))
      } else if (guestCart) {
        // Migrate guest cart to user cart
        const guestItems = JSON.parse(guestCart)
        setCart(guestItems)
        localStorage.setItem(`cart_${user.uid}`, guestCart)
      }

      // Clear guest cart after migration
      localStorage.removeItem("cart_guest")
    } else {
      // User logged out - load guest cart
      const guestCart = localStorage.getItem("cart_guest")
      setCart(guestCart ? JSON.parse(guestCart) : [])
    }
  }, [user])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cart))
    } else {
      localStorage.setItem("cart_guest", JSON.stringify(cart))
    }
  }, [cart, user])

  // Save selected shipping to localStorage
  useEffect(() => {
    localStorage.setItem("selected_shipping", JSON.stringify(selectedShipping))
  }, [selectedShipping])

  // Save applied promo to localStorage
  useEffect(() => {
    if (appliedPromo) {
      localStorage.setItem("applied_promo", JSON.stringify(appliedPromo))
    } else {
      localStorage.removeItem("applied_promo")
    }
  }, [appliedPromo])

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id)
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [...prevCart, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getDiscount = () => {
    if (!appliedPromo) return 0
    const subtotal = getCartSubtotal()

    if (appliedPromo.type === "percentage") {
      return (subtotal * appliedPromo.value) / 100
    }
    return 0
  }

  const getShippingCost = () => {
    const subtotal = getCartSubtotal()

    // Check if promo code gives free shipping
    if (appliedPromo && appliedPromo.type === "free_shipping") {
      return 0
    }

    // Check if order qualifies for free shipping
    if (
      selectedShipping.freeThreshold &&
      subtotal >= selectedShipping.freeThreshold
    ) {
      return 0
    }
    return selectedShipping.price
  }

  const getCartTotal = () => {
    return getCartSubtotal() - getDiscount() + getShippingCost()
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const selectShipping = (shippingOption) => {
    setSelectedShipping(shippingOption)
  }

  const applyPromoCode = (code) => {
    const promo = promoCodes.find(
      (p) => p.code.toUpperCase() === code.toUpperCase() && p.active,
    )

    if (!promo) {
      return { success: false, message: "Invalid promo code" }
    }

    const subtotal = getCartSubtotal()
    if (promo.minPurchase && subtotal < promo.minPurchase) {
      return {
        success: false,
        message: `Minimum purchase of $${promo.minPurchase} required`,
      }
    }

    setAppliedPromo(promo)
    return {
      success: true,
      message: `${promo.description} applied!`,
      promo,
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartSubtotal,
    getDiscount,
    getShippingCost,
    getCartTotal,
    getCartCount,
    selectedShipping,
    selectShipping,
    shippingOptions,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
