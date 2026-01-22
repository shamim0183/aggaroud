import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useAuth } from "./AuthContext"

const WishlistContext = createContext({})

export const useWishlist = () => useContext(WishlistContext)

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth()
  const [wishlist, setWishlist] = useState([])

  // Load wishlist when user changes
  useEffect(() => {
    loadWishlist()
  }, [user])

  const loadWishlist = () => {
    if (!user) {
      setWishlist([])
      return
    }
    const saved = localStorage.getItem(`wishlist_${user.uid}`)
    if (saved) {
      setWishlist(JSON.parse(saved))
    } else {
      setWishlist([])
    }
  }

  const saveWishlist = (newWishlist) => {
    if (!user) return
    localStorage.setItem(`wishlist_${user.uid}`, JSON.stringify(newWishlist))
    setWishlist(newWishlist)
  }

  const addToWishlist = (productId) => {
    if (!user) {
      toast.error("Please sign in to save items to wishlist")
      return
    }

    if (wishlist.includes(productId)) {
      toast("Already in wishlist")
      return
    }

    const updated = [...wishlist, productId]
    saveWishlist(updated)
    toast.success("Added to wishlist")
  }

  const removeFromWishlist = (productId) => {
    const updated = wishlist.filter((id) => id !== productId)
    saveWishlist(updated)
    toast.success("Removed from wishlist")
  }

  const toggleWishlist = (productId) => {
    if (!user) {
      toast.error("Please sign in to save items to wishlist")
      return
    }

    if (wishlist.includes(productId)) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(productId)
    }
  }

  const isInWishlist = (productId) => {
    return wishlist.includes(productId)
  }

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}
