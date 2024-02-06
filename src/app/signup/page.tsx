'use client'
import { routes } from '@/enums/routesConstants'
import {
  RegisterUserFields,
  useRegisterForm,
} from '@/hooks/react-hook-forms/useRegister'
import Link from 'next/link'
import * as API from '@/api/api'
import { Controller } from 'react-hook-form'
import { StatusCode } from '@/enums/errorConstants'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'

export default function RegisterForm() {
  const { handleSubmit, errors, control } = useRegisterForm()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const router = useRouter()

  const onSubmit = handleSubmit(async (data: RegisterUserFields) => {
    const response = await API.register(data)
    if (response.status === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      router.push(routes.LOGIN)
    }
  })
  return (
    <div className="flex justify-center items-center">
      <div className="px-8 pt-6 pb-8 mb-4 w-2/5">
        <h1 className="text-6xl">Hello!</h1>
        <p className="text-lg text-black font-bold mb-4">
          Get started with your free account today.
        </p>
        <form method="POST" onSubmit={onSubmit}>
          <div className="flex justify-center">
            <Image
              src="/default-profile.svg"
              alt="Avatar"
              width={110}
              height={110}
            />
          </div>
          <div className="flex justify-between">
            <div className="mb-4">
              <Controller
                control={control}
                name="first_name"
                render={({ field }) => (
                  <div className="w-[16.5rem]">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      First name
                    </label>
                    <input
                      {...field}
                      type="text"
                      aria-label="First name"
                      aria-describedby="first_name"
                      className={
                        errors.first_name
                          ? 'border border-red-500 rounded-full h-10 w-full'
                          : 'border rounded-full h-10 w-full'
                      }
                    />
                    {errors.first_name && (
                      <div className="text-red-500 text-xs">
                        {errors.first_name.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="col-md-5">
              <Controller
                control={control}
                name="last_name"
                render={({ field }) => (
                  <div className="w-[16.5rem]">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Last name
                    </label>
                    <input
                      {...field}
                      type="text"
                      aria-label="Last name"
                      aria-describedby="last_name"
                      className={
                        errors.last_name
                          ? 'border border-red-500 rounded-full h-10 w-full'
                          : 'border rounded-full h-10 w-full'
                      }
                    />
                    {errors.last_name && (
                      <div className="text-red-500 text-xs">
                        {errors.last_name.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
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
          <Controller
            control={control}
            name="confirm_password"
            render={({ field }) => (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm password
                </label>
                <input
                  {...field}
                  type="password"
                  aria-label="confirm_password"
                  aria-describedby="confirm_password"
                  className={
                    errors.confirm_password
                      ? 'border border-red-500 rounded-full h-10 w-full'
                      : 'border rounded-full h-10 w-full'
                  }
                />
                {errors.confirm_password && (
                  <div className="text-red-500 text-xs">
                    {errors.confirm_password.message}
                  </div>
                )}
                {showError && (
                  <div className="text-red-500 text-md">{apiError}</div>
                )}
              </div>
            )}
          />
          <div>
            <button
              className="bg-blue-800 text-white h-10 w-full rounded-full hover:bg-blue-500 mb-4"
              type="submit"
            >
              Sign up
            </button>
          </div>
          <div className="flex justify-between">
            <p className="text-black text-start">Already have an account?</p>
            <Link
              className="text-decoration-none hover:text-blue-500"
              href={routes.LOGIN}
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
