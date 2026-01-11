'use client'

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
import { SafeError } from '@/models/safeError'
import FormContainer from '../ui/FormContainer'
import DivCentered from '../ui/DivCentered'

export default function LoginForm() {
  const { handleSubmit, errors, control } = useLoginForm()
  const { setUser } = useAuth()
  const [apiError, setApiError] = useState('')

  const router = useRouter()
  const { user, googleFirebaseSignIn } = useAuth()

  useEffect(() => {
    if (user) {
      router.push(routes.HOME)
    }
  }, [user])

  const onSubmit = handleSubmit(async (data: LoginUserFields) => {
    try {
      const response = await login(data)
      setUser(response)
      router.push(routes.HOME)
    } catch (error) {
      const safeError = error as SafeError
      setApiError(safeError.message)
    }
  })

  return (
    <DivCentered>
      <FormContainer>
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
                      ? 'border border-red-500 rounded-full h-10 w-full p-3.5 focus:outline-none focus:ring-0 focus:border-2 focus:border-red-500'
                      : 'w-full rounded-full border border-gray-300 px-5 py-2 text-md'
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
                      ? 'border border-red-500 rounded-full h-10 w-full p-3.5 focus:outline-none focus:ring-0 focus:border-2 focus:border-red-500'
                      : 'w-full rounded-full border border-gray-300 px-5 py-2 text-md'
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
      </FormContainer>
    </DivCentered>
  )
}
