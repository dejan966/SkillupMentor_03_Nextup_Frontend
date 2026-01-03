'use client'

import { StatusCode } from '@/constants/errorConstants'
import { routes } from '@/constants/routesConstants'
import {
  useLoginForm,
  LoginUserFields,
} from '@/hooks/react-hook-forms/useLogin'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { login } from '@/lib/user'
import Button from '../ui/Button'
import Label from '../ui/Label'
import FormControl from '../ui/FormControl'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginForm() {
  const { handleSubmit, errors, control } = useLoginForm()
  const { setUser } = useAuth()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const router = useRouter()
  const { user, googleFirebaseSignIn } = useAuth()

  useEffect(() => {
    if (user) {
      router.push(routes.HOME)
    }
  }, [user])

  const onSubmit = handleSubmit(async (data: LoginUserFields) => {
    const response = await login(data)
    if (!response) {
      setApiError('Unable to establish connection with server')
      setShowError(true)
    } else if (response.status === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      setUser(response.data)
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
                <Label content="Email" />
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
                <FormControl message={errors?.email?.message} />
              </div>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <div className="mb-4">
                <Label content="Password" />
                <input
                  {...field}
                  type="password"
                  placeholder="******"
                  aria-label="Password"
                  aria-describedby="password"
                  className={
                    errors.password
                      ? 'tailwind-form-control-errors'
                      : 'tailwind-form-control'
                  }
                />
                <FormControl message={errors?.password?.message} />
                <FormControl message={apiError} />
              </div>
            )}
          />
          <div>
            <Button variant="default" className="mb-4" type="submit">
              Login
            </Button>
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
        <Button
          variant="default"
          className="mb-4"
          onClick={googleFirebaseSignIn}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}
