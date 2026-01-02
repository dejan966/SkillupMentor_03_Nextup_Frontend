'use client'

import { useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { UserType } from '@/models/auth'
import { isServer } from '@/hooks/useServer'
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/config/firebase-config'
import { firebaseLogin, firebaseUserSignout } from '@/lib/user'
import { useRouter } from 'next/navigation'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<UserType | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isServer()) return

    try {
      const stored = localStorage.getItem('user')
      setUserState(stored ? JSON.parse(stored) : null)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  const setUser = (user: UserType) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUserState(user)
  }

  const signOut = () => {
    localStorage.removeItem('user')
    setUserState(null)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const loginResponse = await firebaseLogin(currentUser)
        setUser(loginResponse.data)
      } else {
        setUserState(null)
      }
    })
    return () => unsubscribe()
  }, [auth])

  const googleFirebaseSignIn = async () => {
    await signInWithPopup(auth, provider)
  }

  const firebaseSignout = async () => {
    auth.signOut()
    await firebaseUserSignout()
    setUserState(null)
    localStorage.clear()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isInitialized,
        setUser,
        signOut,
        googleFirebaseSignIn,
        firebaseSignout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
