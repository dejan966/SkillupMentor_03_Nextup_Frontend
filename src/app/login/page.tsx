'use client'
import { StatusCode } from '@/enums/errorConstants'
import {
  LoginUserFields,
  useLoginForm,
} from '@/hooks/react-hook-forms/useLogin'
import authStore from '@/stores/auth.store'
import { useState } from 'react'
import * as API from '@/api/api'
import { routes } from '@/enums/routesConstants'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Controller } from 'react-hook-form'

export default function LoginForm() {
  const { handleSubmit, errors, control } = useLoginForm()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const router = useRouter()

  const onSubmit = handleSubmit(async (data: LoginUserFields) => {
    const response = await API.login(data)
    if (response.status === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      authStore.login(response.data)
      router.push(routes.HOME)
    }
  })
  return (
    <div className="flex justify-center items-center">
      <div className="px-8 pt-6 pb-8 mb-4">
        <h1 className="text-6xl">Welcome back!</h1>
        <p className="text-lg text-black font-bold">
          We are glad you are back.
        </p>
        <form method="POST" onSubmit={onSubmit}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  {...field}
                  type="email"
                  placeholder="example@gmail.com"
                  aria-label="Email"
                  aria-describedby="email"
                  className={
                    errors.email
                      ? 'border border-red-500 rounded-full h-10 w-full'
                      : 'border rounded-full h-10 w-full'
                  }
                />
                {errors.email && (
                  <div className="text-red-500 text-xs">
                    {errors.email.message}
                  </div>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  {...field}
                  type="password"
                  placeholder="******************"
                  aria-label="Password"
                  aria-describedby="password"
                  className={
                    errors.password
                      ? 'border border-red-500 rounded-full h-10 w-full'
                      : 'border rounded-full h-10 w-full'
                  }
                />
                {errors.password && (
                  <div className="text-red-500 text-xs">
                    {errors.password.message}
                  </div>
                )}
              </div>
            )}
          />
          <div>
            <button
              className="bg-blue-800 text-white h-10 w-full rounded-full hover:bg-blue-500 mb-4"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="flex justify-between">
            <p className="text-black text-start">Dont have an account yet?</p>
            <Link
              className="text-decoration-none hover:text-blue-500"
              href={routes.SIGNUP}
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
