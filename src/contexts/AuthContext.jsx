import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../firebase/config"

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Sign up with email/password
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Sign in with email/password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Sign in with Google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  // Sign out
  const logout = () => {
    return signOut(auth)
  }

  // Update user profile
  const updateUserProfile = (profileData) => {
    if (!auth.currentUser) return Promise.reject(new Error("No user logged in"))
    return updateProfile(auth.currentUser, profileData)
  }

  const value = {
    user,
    signup,
    login,
    signInWithGoogle,
    logout,
    loading,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
