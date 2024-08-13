import { useEffect, useState } from 'react'
import { auth } from '@/config/firebase-config'
import { onAuthStateChanged, User } from 'firebase/auth'
import { FirebaseUserType } from '@/models/firebaseAuth'
import { isServer } from '../useServer'

const useFirebase = () => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUserType | null>({} as FirebaseUserType)

  const checkUser = (value: string) => {
    setFirebaseUser(value ? JSON.parse(value) : ({} as FirebaseUserType))
  }

  useEffect(() => {
    try {
      if (!isServer()) {
        const value = window.localStorage.getItem('firebaseUser')
        checkUser(value!)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const firebaseLogin = () => {
    try {
        if (!isServer()) {
            onAuthStateChanged(auth, (currentUser) => {
                setFirebaseUser({ uid: currentUser!.uid, displayName: currentUser!.displayName!, email: currentUser!.email!, photoURL: currentUser!.photoURL!})
                window.localStorage.setItem('firebaseUser', JSON.stringify(firebaseUser))
            })
          
        }
      } catch (error) {
        console.log(error)
      }
   
  }
  const firebaseSignout = () => {
    auth.signOut()
    localStorage.clear()
    setFirebaseUser({} as FirebaseUserType)
  }

  return [firebaseUser, firebaseLogin, firebaseSignout] as const
}

export default useFirebase
