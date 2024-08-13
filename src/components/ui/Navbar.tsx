'use client'

import { StatusCode } from '@/enums/errorConstants'
import { routes } from '@/enums/routesConstants'
import Image from 'next/image'
import Link from 'next/link'
import { userSignout } from '@/lib/user'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useLocalStorage from '@/hooks/useLocalStorage'
import { auth } from '@/config/firebase-config'
import { onAuthStateChanged, User } from 'firebase/auth'

const Navbar = () => {
  const [value, setValue, logout] = useLocalStorage()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)

  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser)
    })
    return () => unsubscribe()
  }, [firebaseUser])

  const firebaseLogout = () => {
    auth.signOut();
  }


  const signout = async () => {
    const response = await userSignout()
    if (response.status === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      logout()
      router.push(routes.HOME)
    }
  }

  return (
    <header className="pl-24 pb-9 pr-24 pt-9">
      <nav className="flex items-center justify-between">
        <Link href={routes.HOME}>
          <Image src="/cgp.png" alt="Nextup logo" height={30} width={30} />
        </Link>
        <div className="space-x-8">
          <Link href={routes.HOME}>Home</Link>
          <Link href="/search">Search</Link>
          {Object.keys(value).length > 0 && (
            <Link href="/events/add">Event manager</Link>
          )}
        </div>
        {Object.keys(value).length > 0 ? (
          <div className="flex items-center space-x-8">
            <Link href={routes.USERPROFILE}>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/avatars/${value?.avatar}`}
                alt="Avatar"
                className="navbarAvatar"
                width={40}
                height={40}
              />
            </Link>
            <Link href={routes.USERINFO}>Profile settings</Link>
            <Link href={routes.HOME} onClick={signout}>
              Signout
            </Link>
          </div>
        ) : (
          <div className="space-x-8">
            <Link href={routes.LOGIN}>Login</Link>
            <button
              type="button"
              className="blue text-white h-10 w-28 rounded-full"
            >
              <Link href={routes.SIGNUP}>Sign up</Link>
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
