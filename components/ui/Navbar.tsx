'use client'
import { StatusCode } from '@/enums/errorConstants'
import { routes } from '@/enums/routesConstants'
import authStore from '@/stores/auth.store'
import Image from 'next/image'
import Link from 'next/link'
import * as API from '@/api/api'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const router = useRouter()

  const signout = async () => {
    const response = await API.signout()
    if (response.status === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      authStore.signout()
      router.push(routes.HOME)
    }
  }
  return (
    <header>
      <nav className="flex justify-between items-center pl-24 pb-9 pr-24 pt-9">
        <Link href={routes.HOME}>
          <Image src="/cgp.png" alt="Nextup logo" height={30} width={30} />
        </Link>
        <div className="space-x-8">
          <Link href={routes.HOME}>Home</Link>
          <Link href="#">Search</Link>
          {authStore.user && <Link href="/events/add">Event manager</Link>}
        </div>
        {authStore.user ? (
          <div className="space-x-7">
            <Link href={routes.USERINFO}>Profile settings</Link>
            <Link href={routes.HOME} onClick={signout}>
              Signout
            </Link>
            <Link href={routes.EVENTADD}>
              <Image
                src="/default-profile.svg"
                alt="User avatar"
                height={60}
                width={50}
              />
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
