import { useEffect, useState } from 'react'
import { auth } from '@/config/firebase-config'
import { onAuthStateChanged, User } from 'firebase/auth'
import { isServer } from '../useServer'
import { NextResponse } from 'next/server'

const useFirebaseAuth = () => {
  const [firebaseUser, setFirebaseUser] = useState<User>({} as User)
  const [token, setToken] = useState('')

  useEffect(() => {
    if (!isServer()) {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          setFirebaseUser(currentUser)
          setToken(await currentUser.getIdToken())
        }
      })
      return () => unsubscribe()
    }
  }, [auth])

  const firebaseSignout = () => {
    auth.signOut()
    localStorage.clear()
    setToken('')
    setFirebaseUser({} as User)
  }

  return [token, firebaseUser, firebaseSignout] as const
}

export default useFirebaseAuth
