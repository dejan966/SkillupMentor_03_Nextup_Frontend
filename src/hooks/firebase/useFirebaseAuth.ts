import { useEffect, useState } from 'react'
import { auth } from '@/config/firebase-config'
import { onAuthStateChanged, User } from 'firebase/auth'
import { isServer } from '../useServer'

const useFirebaseAuth = () => {
  const [firebaseUser, setFirebaseUser] = useState<User>(
    {} as User,
  )

  useEffect(() => {
    if (!isServer()) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setFirebaseUser(currentUser)
          window.localStorage.setItem(
            'refreshToken',
            currentUser.refreshToken,
          )
        }
      })
      return () => unsubscribe()
    }
  }, [auth])

  const firebaseSignout = () => {
    auth.signOut()
    localStorage.clear()
    setFirebaseUser({} as User)
  }

  return [firebaseUser, firebaseSignout] as const
}

export default useFirebaseAuth
