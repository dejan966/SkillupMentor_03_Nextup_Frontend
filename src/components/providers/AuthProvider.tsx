'use client'

import { useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { UserType } from '@/models/auth'
import { isServer } from '@/hooks/useServer'

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

  return (
    <AuthContext.Provider value={{ user, isInitialized, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
