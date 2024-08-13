import { useEffect, useState } from 'react'
import { auth } from '@/config/firebase-config'
import { onAuthStateChanged, User } from 'firebase/auth'
import { isServer } from '../useServer'
import { NextResponse } from 'next/server'

const useFirebaseAuth = () => {
  const [firebaseUser, setFirebaseUser] = useState<User>({} as User)

  useEffect(() => {
    if (!isServer()) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setFirebaseUser(currentUser)
        }
      })
      return () => unsubscribe()
    }
  }, [auth])

  const firebaseSignout = () => {
    auth.signOut()
    localStorage.clear()
    const response = NextResponse.next()
    setFirebaseUser({} as User)
  }

  return [firebaseUser, firebaseSignout] as const
}

export default useFirebaseAuth
