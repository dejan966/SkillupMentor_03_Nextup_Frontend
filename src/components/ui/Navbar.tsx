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
import useMediaQuery from '@/hooks/useMediaQuery'

const Navbar = () => {
  const { user, signOut, firebaseSignout } = useAuth()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const { isMobile } = useMediaQuery(1038)
  const [showMenu, setShowMenu] = useState(false)

  const router = useRouter()

  const toggleHamburger = () => {
    setShowMenu((showMenu) => !showMenu)
  }

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
      {showMenu ? (
        <nav className="bg-white -mx-24 px-24 -mt-9">
          <div className="flex items-center justify-between">
            <div>
              <Link href={routes.HOME}>
                <Image
                  src="/cgp.png"
                  alt="Nextup logo"
                  height={30}
                  width={30}
                />
              </Link>
            </div>
            <div onClick={toggleHamburger}>x</div>
          </div>
          <div className="flex justify-center text-center items-center mb-3">
            <ul className="space-y-2">
              <li>
                <Link href={routes.HOME}>Home</Link>
              </li>
              <li>
                <Link href="/search">Search</Link>
              </li>

              {user ? (
                <>
                  <li>
                    <Link href="/events/add">Event manager</Link>
                  </li>
                  <li>
                    <Link href={routes.HOME} onClick={signout}>
                      Signout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Button variant="default" className="w-28">
                      <Link href={routes.SIGNUP}>Sign up</Link>
                    </Button>
                  </li>
                  <li>
                    <Link href={routes.LOGIN}>Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="flex items-center justify-between">
          {isMobile ? (
            <button
              onClick={toggleHamburger}
              className="flex flex-col gap-1 p-2"
              aria-label="Toggle menu"
            >
              <span className="block h-0.5 w-6 bg-black"></span>
              <span className="block h-0.5 w-6 bg-black"></span>
              <span className="block h-0.5 w-6 bg-black"></span>
            </button>
          ) : (
            <>
              <Link href={routes.HOME}>
                <Image
                  src="/cgp.png"
                  alt="Nextup logo"
                  height={30}
                  width={30}
                />
              </Link>
              <div className="space-x-8">
                <Link href={routes.HOME}>Home</Link>
                <Link href="/search">Search</Link>
                {user && <Link href="/events/add">Event manager</Link>}
              </div>
            </>
          )}
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
      )}
    </header>
  )
}

export default Navbar
