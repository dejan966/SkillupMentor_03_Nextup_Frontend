'use client'

import { StatusCode } from '@/enums/errorConstants'
import { routes } from '@/enums/routesConstants'
import Image from 'next/image'
import Link from 'next/link'
import { userSignout } from '@/lib/user'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import useLocalStorage from '@/hooks/useLocalStorage'

const Navbar = () => {
  const [value, setValue, logout] = useLocalStorage()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const router = useRouter()
  const location = usePathname()

  const onSubmit = (event: any) => {
    event.preventDefault()
    router.push(
      `/search?location=${event.target.searchValue.value}&date=${event.target.dateValue.value}`,
    )
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

  if (location === '/search') {
    return (
      <header>
        <nav style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image
            src="/background-search.png"
            alt="Background image"
            layout="fill"
          />
          <div
            style={{ position: 'relative' }}
            className="pl-24 pb-9 pr-24 pt-9"
          >
            <nav className="flex justify-between items-center pb-9">
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
                {Object.keys(value).length > 0 && (
                  <Link href="/events/add">Event manager</Link>
                )}
              </div>
              {Object.keys(value).length > 0 ? (
                <div className="flex items-center">
                  <Link href={routes.USERPROFILE}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/avatars/${value.avatar}`}
                      alt="Avatar"
                      className="navbarAvatar"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <div>
                    <Link href={routes.USERINFO}>Profile settings</Link>
                    <Link href={routes.HOME} onClick={signout}>
                      Signout
                    </Link>
                  </div>
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
            <div>SEARCH FOR EVENTS</div>
            <h1 className="text-6xl mb-8">What is next?</h1>
            <form onSubmit={onSubmit} className="mb-8">
              <div className="flex">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <Image
                      src="/locationIcon.svg"
                      alt="Location icon"
                      height={20}
                      width={20}
                    />
                  </div>
                  <input
                    type="search"
                    name="searchValue"
                    id="searchValue"
                    className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-s-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by location"
                    required
                  />
                </div>
                <div className="relative w-full">
                  <input
                    type="date"
                    name="dateValue"
                    id="dateValue"
                    defaultValue={new Date().toISOString().substring(0, 10)}
                    min="2018-01-01"
                    max="2031-12-31"
                    className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-e-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="blue absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white rounded-e-lg border border-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-500"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </nav>
      </header>
    )
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
