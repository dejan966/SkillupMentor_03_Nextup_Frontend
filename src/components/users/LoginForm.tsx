'use client'

import { StatusCode } from '@/enums/errorConstants'
import { routes } from '@/enums/routesConstants'
import {
  useLoginForm,
  LoginUserFields,
} from '@/hooks/react-hook-forms/useLogin'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { login } from '@/lib/user'
import useLocalStorage from '@/hooks/useLocalStorage'
import { auth, provider } from '@/config/firebase-config'
import { signInWithPopup } from 'firebase/auth'

export default function LoginForm() {
  const { handleSubmit, errors, control } = useLoginForm()
  const [value, setValue] = useLocalStorage()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const router = useRouter()

  const googleFirebaseSignIn = () => {
    signInWithPopup(auth, provider).then((response) => {
      router.push('/')
    })
  }
  const onSubmit = handleSubmit(async (data: LoginUserFields) => {
    const response = await login(data)
    if (response.status === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      setValue(response.data)
      router.push(routes.HOME)
    }
  })

  return (
    <div className="centered">
      <div className="px-8 pt-6 pb-8 mb-4 w-2/5">
        <h1 className="text-6xl">Welcome back!</h1>
        <p className="text-lg text-black font-bold mb-4">
          We are glad you are back.
        </p>
        <form method="POST" onSubmit={onSubmit}>
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
                {showError && (
                  <div className="text-red-500 text-md">{apiError}</div>
                )}
              </div>
            )}
          />
          <div>
            <button className="blueButton" type="submit">
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
          <div></div>
        </form>
        <button className="blueButton" onClick={googleFirebaseSignIn}>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
