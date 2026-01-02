import { createContext, useContext } from 'react'
import { UserType } from '@/models/auth'

type AuthContextType = {
  user: UserType | null
  isInitialized: boolean
  setUser: (user: UserType) => void
  signOut: () => void
  googleFirebaseSignIn: () => void
  firebaseSignout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth has to be used within AuthProvider')
  }
  return ctx
}
