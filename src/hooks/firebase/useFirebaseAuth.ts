import { useEffect, useState } from 'react'
import { auth } from '@/config/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import { isServer } from '../useServer'

const useFirebaseAuth = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    if (!isServer()) {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
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
  }

  return [token, firebaseSignout] as const
}

export default useFirebaseAuth
