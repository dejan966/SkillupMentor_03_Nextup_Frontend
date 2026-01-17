'use client'

import { StatusCode } from '@/constants/errorConstants'
import { routes } from '@/constants/routesConstants'
import Image from 'next/image'
import Link from 'next/link'
import { checkUserRole, userSignout } from '@/lib/user'
import { useEffect, useState } from 'react'
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
  const [showAvatarMenu, setShowAvatarMenu] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const router = useRouter()

  const checkRole = async () => {
    const response = await checkUserRole()
    setIsAdmin(response.data)
  }
  useEffect(() => {
    checkRole()
  }, [user])

  useEffect(() => {
    if (!isMobile && showMenu) {
      setShowMenu(false)
    }
  }, [isMobile, showMenu])

  const toggleHamburger = () => {
    setShowMenu((showMenu) => !showMenu)
  }

  const toggleAvatarMenu = () => {
    setShowAvatarMenu((showAvatarMenu) => !showAvatarMenu)
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
            <div className="cursor-pointer" onClick={toggleHamburger}>
              x
            </div>
          </div>
          <div className="flex justify-center text-center items-center mb-3">
            <ul onClick={toggleHamburger} className="space-y-2">
              <li>
                <Link href={routes.HOME}>Home</Link>
              </li>
              <li>
                <Link href="/search">Search</Link>
              </li>
              {user ? (
                <div className="relative">
                  <button onClick={toggleAvatarMenu}>
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
                  </button>
                  {showAvatarMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={toggleAvatarMenu}
                      />
                      <ul
                        onClick={toggleAvatarMenu}
                        className="border-2 border-blue-700 bg-white text-left absolute right-6 px-4 py-2 z-50 whitespace-nowrap"
                      >
                        <li className="text-black uppercase border-b-2 border-dashed border-black">
                          <Link href={routes.USERINFO}>{user.full_name}</Link>
                        </li>
                        <li className="cursor-pointer py-1">
                          <Link href={routes.USERPROFILE}>Profile</Link>
                        </li>
                        <li className="cursor-pointer py-1">
                          <Link href={routes.CURRUSER_CREATEDEVENTS}>
                            Created events
                          </Link>
                        </li>
                        <li className="cursor-pointer py-1">
                          <Link href={routes.CURRUSER_UPCOMINGEVENTS}>
                            Upcoming events
                          </Link>
                        </li>
                        <li className="cursor-pointer py-1">
                          <Link href={routes.CURRUSER_RECENTEVENTS}>
                            Recent events
                          </Link>
                        </li>
                        <li className="cursor-pointer pt-1">
                          <Link href={routes.HOME} onClick={signout}>
                            Signout
                          </Link>
                        </li>
                      </ul>
                    </>
                  )}
                  <li>
                    <Link href="/events/add">Event manager</Link>
                  </li>
                  <li>
                    <Link href={routes.HOME} onClick={signout}>
                      Signout
                    </Link>
                  </li>
                </div>
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
              <span className="block h-0.5 w-6 bg-black" />
              <span className="block h-0.5 w-6 bg-black" />
              <span className="block h-0.5 w-6 bg-black" />
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
                {isAdmin === true && (
                  <Link href="/dashboard">Admin dashboard</Link>
                )}
              </div>
            </>
          )}
          {user ? (
            <>
              <button onClick={toggleAvatarMenu}>
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
              </button>
              {showAvatarMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={toggleAvatarMenu}
                  />
                  <ul
                    onClick={toggleAvatarMenu}
                    className="border-2 border-blue-700 bg-white text-left fixed right-6 top-20 px-4 py-2 z-50 whitespace-nowrap"
                  >
                    <li className="text-black uppercase border-b-2 border-dashed border-black">
                      <Link href={routes.USERINFO}>{user.full_name}</Link>
                    </li>
                    <li className="cursor-pointer py-1">
                      <Link href={routes.USERPROFILE}>Profile</Link>
                    </li>
                    <li className="cursor-pointer py-1">
                      <Link href={routes.CURRUSER_CREATEDEVENTS}>
                        Created events
                      </Link>
                    </li>
                    <li className="cursor-pointer py-1">
                      <Link href={routes.CURRUSER_UPCOMINGEVENTS}>
                        Upcoming events
                      </Link>
                    </li>
                    <li className="cursor-pointer py-1">
                      <Link href={routes.CURRUSER_RECENTEVENTS}>
                        Recent events
                      </Link>
                    </li>
                    <li className="cursor-pointer pt-1">
                      <Link href={routes.HOME} onClick={signout}>
                        Signout
                      </Link>
                    </li>
                  </ul>
                </>
              )}
            </>
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
