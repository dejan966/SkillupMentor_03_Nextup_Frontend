'use client'

import { StatusCode } from '@/constants/errorConstants'
import { routes } from '@/constants/routesConstants'
import Image from 'next/image'
import Link from 'next/link'
import { userSignout } from '@/lib/user'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from './Button'
import { useAuth } from '../../contexts/AuthContext'
import Avatar from './Avatar'

const Navbar = () => {
  const { user, signOut, firebaseSignout } = useAuth()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const router = useRouter()

  const signout = async () => {
    if (user!.type === 'Google User') {
      firebaseSignout()
      return
    }
    const response = await userSignout()
    if (response?.status === StatusCode.BAD_REQUEST) {
      setApiError(response?.data.message)
      setShowError(true)
    } else if (response?.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response?.data.message)
      setShowError(true)
    } else {
      signOut()
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
          {user && <Link href="/events/add">Event manager</Link>}
        </div>
        {user ? (
          <div className="flex items-center space-x-8">
            <Link href={routes.USERPROFILE}>
              <Avatar
                src={
                  user?.avatar.startsWith('https')
                    ? user?.avatar
                    : `${process.env.NEXT_PUBLIC_API_URL}/uploads/avatars/${user?.avatar}`
                }
                alt="Avatar"
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
            <Button variant="default" className="w-28">
              <Link href={routes.SIGNUP}>Sign up</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
