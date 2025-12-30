'use client'

import { useRouter } from 'next/navigation'
import { useCreateUpdateUser } from '@/hooks/react-hook-forms/useCreateUpdateUser'
import { useEffect, useState } from 'react'
import { routes } from '@/constants/routesConstants'
import Link from 'next/link'
import { fetchCurrUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import LoadingCircle from '../ui/LoadingCircle'
import Button from '../ui/Button'
import { useFormState } from 'react-dom'
import { updateUserAction } from '@/actions/createUpdateUser'
import { UserFormState } from '@/models/userFormState'

const initialState = {
  success: '',
  errors: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    new_password: '',
    confirm_password: '',
    role: '',
    userImage: '',
    apiError: '',
  },
}

export default function UpdateUserForm() {
  const {
    data: currUser,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['currUser'],
    queryFn: fetchCurrUser,
  })

  const defaultValues = currUser?.data
  const { handleSubmit, errors, control } = useCreateUpdateUser({
    defaultValues,
  })

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const actionWithId = async (prevState: UserFormState, formData: FormData) => {
    return updateUserAction(prevState, formData, defaultValues._id)
  }

  const [state, formAction] = useFormState(actionWithId, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      router.back()
    }
  }, [state.success])

  if (isLoading) {
    return (
      <div>
        <LoadingCircle />
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <h2>Something went wrong!</h2>
        <Button variant="error" className="h-12 w-20" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    )
  }

  return (
    <div className="centered">
      <div className="px-8 pt-6 pb-8 mb-4 w-2/5">
        <h1 className="text-6xl font-bold">Profile settings</h1>
        <div className="mb-4">Change your profile settings</div>
        <form action={formAction}>
          <div className="flex justify-between">
            <div className="mb-4">
              <label className="inputText">First name</label>
              <input
                defaultValue={defaultValues.first_name}
                name="first_name"
                type="text"
                aria-label="First name"
                aria-describedby="first_name"
                className={
                  state?.errors?.first_name
                    ? 'tailwind-form-control-errors'
                    : 'tailwind-form-control'
                }
              />
              {state?.errors?.first_name && (
                <div className="validation-feedback">
                  {state.errors.first_name}
                </div>
              )}
            </div>
            <div className="col-md-5">
              <label className="inputText">Last name</label>
              <input
                defaultValue={defaultValues.last_name}
                name="last_name"
                type="text"
                aria-label="Last name"
                aria-describedby="last_name"
                className={
                  state?.errors?.first_name
                    ? 'tailwind-form-control-errors'
                    : 'tailwind-form-control'
                }
              />
              {state?.errors?.last_name && (
                <div className="validation-feedback">
                  {state.errors.last_name}
                </div>
              )}
            </div>
          </div>
          <label className="inputText">Email</label>
          <input
            defaultValue={defaultValues.email}
            name="email"
            type="email"
            aria-label="Email"
            aria-describedby="email"
            className={
              state?.errors?.email
                ? 'tailwind-form-control-errors'
                : 'tailwind-form-control'
            }
          />
          {state?.errors?.email && (
            <div className="validation-feedback">{state.errors.email}</div>
          )}
          {state?.errors?.apiError && (
            <div className="text-red-500 text-md">{state.errors.apiError}</div>
          )}
          <Button className="bg-pink-500 hover:bg-pink-300 mb-4">
            <Link href={routes.USERAVATAREDIT}>Change your avatar</Link>
          </Button>
          <Button className="mb-4">
            <Link href={routes.USERPASSWORDRESET}>Change your password</Link>
          </Button>
          <div className="flex items-center justify-between">
            <Button variant="default" className="w-28 uppercase" type="submit">
              Submit
            </Button>
            <a href={routes.USERINFO}>Cancel</a>
          </div>
        </form>
      </div>
    </div>
  )
}
