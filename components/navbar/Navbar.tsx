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
        </div>
        {authStore.user ? (
          <div>
            <Link href="#" onClick={signout}>
              Signout
            </Link>
          </div>
        ) : (
          <div className="space-x-8">
            <Link href={routes.LOGIN}>Login</Link>
            <button
              type="button"
              className="bg-blue-800 text-white h-10 w-28 rounded-full hover:bg-blue-500"
            >
              <Link href={routes.SIGNUP}>Sign up</Link>
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}
