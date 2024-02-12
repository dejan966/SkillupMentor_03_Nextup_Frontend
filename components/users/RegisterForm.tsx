'use client'
import * as API from '@/api/api'
import { StatusCode } from '@/enums/errorConstants'
import { routes } from '@/enums/routesConstants'
import {
  useRegisterForm,
  RegisterUserFields,
} from '@/hooks/react-hook-forms/useRegister'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

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
    <div className="centered">
      <div className="px-8 pt-6 pb-8 mb-4 w-2/5">
        <h1 className="text-6xl">Hello!</h1>
        <p className="text-lg text-black font-bold mb-4">
          Get started with your free account today.
        </p>
        <form method="POST" onSubmit={onSubmit}>
          <div className="flex justify-center">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/avatars/default-profile.png`}
              alt="Avatar"
              className="userAvatar"
              width={110}
            />
          </div>
          <div className="flex justify-between">
            <div className="mb-4">
              <Controller
                control={control}
                name="first_name"
                render={({ field }) => (
                  <div className="w-[16.5rem]">
                    <label className="inputText">First name</label>
                    <input
                      {...field}
                      type="text"
                      aria-label="First name"
                      aria-describedby="first_name"
                      className={
                        errors.first_name
                          ? 'tailwind-form-control-errors'
                          : 'tailwind-form-control'
                      }
                    />
                    {errors.first_name && (
                      <div className="validation-feedback">
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
                    <label className="inputText">Last name</label>
                    <input
                      {...field}
                      type="text"
                      aria-label="Last name"
                      aria-describedby="last_name"
                      className={
                        errors.last_name
                          ? 'tailwind-form-control-errors'
                          : 'tailwind-form-control'
                      }
                    />
                    {errors.last_name && (
                      <div className="validation-feedback">
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
                <label className="inputText">Email</label>
                <input
                  {...field}
                  type="email"
                  aria-label="Email"
                  aria-describedby="email"
                  className={
                    errors.email
                      ? 'tailwind-form-control-errors'
                      : 'tailwind-form-control'
                  }
                />
                {errors.email && (
                  <div className="validation-feedback">
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
                <label className="inputText">Password</label>
                <input
                  {...field}
                  type="password"
                  aria-label="Password"
                  aria-describedby="password"
                  className={
                    errors.password
                      ? 'tailwind-form-control-errors'
                      : 'tailwind-form-control'
                  }
                />
                {errors.password && (
                  <div className="validation-feedback">
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
                <label className="inputText">Confirm password</label>
                <input
                  {...field}
                  type="password"
                  aria-label="confirm_password"
                  aria-describedby="confirm_password"
                  className={
                    errors.confirm_password
                      ? 'tailwind-form-control-errors'
                      : 'tailwind-form-control'
                  }
                />
                {errors.confirm_password && (
                  <div className="validation-feedback">
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
            <button className="blueButton" type="submit">
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
