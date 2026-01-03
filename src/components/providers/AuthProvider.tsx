'use client'

import { useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { UserType } from '@/models/auth'
import { isServer } from '@/hooks/useServer'
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/config/firebase-config'
import {
  fetchCurrUser,
  firebaseLogin,
  firebaseUserSignout,
  refreshTokens,
  userSignout,
} from '@/lib/user'
import { StatusCode } from '@/constants/errorConstants'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<UserType | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const timerRef = useRef<any>(null)

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
        if (localStorage.getItem('user') == null) {
          const idToken = await currentUser.getIdToken()
          try {
            const loginResponse = await firebaseLogin(idToken)
            setUser(loginResponse.data)
          } catch (error) {
            console.log(error)
          }
        }
      } else {
        setUserState(null)
      }
    })
    return () => unsubscribe()
  }, [auth])

  const googleFirebaseSignIn = async () => {
    //After login: Cross-Origin-Opener-Policy policy would block the window.closed call.
    await signInWithPopup(auth, provider)
  }

  const firebaseSignout = async () => {
    auth.signOut()
    await firebaseUserSignout()
    setUserState(null)
    localStorage.clear()
  }

  const refreshTokensRefresh = async () => {
    const response = await refreshTokens()
    if (
      response.data.statusCode === StatusCode.UNAUTHORIZED ||
      response.data.statusCode === StatusCode.FORBIDDEN
    ) {
      await userSignout()
      signOut()
    } else {
      setUser(response.data)
    }
  }

  useEffect(() => {
    if (isServer()) return

    if (localStorage.getItem('user')) {
      ;(async () => {
        const response = await fetchCurrUser()
        if (response.data.email) {
          setUser(response.data)
          clearInterval(timerRef.current)
          timerRef.current = setInterval(refreshTokensRefresh, 840000)
        } else if (response.data.statusCode === StatusCode.UNAUTHORIZED) {
          signOut()
        }
      })()
    }
  }, [])

  useEffect(() => {
    if (user) {
      clearInterval(timerRef.current)
      timerRef.current = setInterval(refreshTokens, 840000)
    }
  }, [user])

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
