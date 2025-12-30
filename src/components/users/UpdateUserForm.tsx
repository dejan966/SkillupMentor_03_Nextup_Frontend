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
import FormControl from '../ui/FormControl'
import Input from '../ui/Input'
import Label from '../ui/Label'

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
            <div>
              <Label content="First name" />
              <Input
                defaultValue={defaultValues?.first_name || ''}
                name="first_name"
                type="text"
                aria-label="First name"
                aria-describedby="first_name"
                errors={state?.errors}
              />
              <FormControl message={state?.errors?.first_name} />
            </div>
            <div className="col-md-5">
              <Label content="Last name" />
              <Input
                defaultValue={defaultValues?.last_name || ''}
                name="last_name"
                type="text"
                aria-label="Last name"
                aria-describedby="last_name"
                errors={state?.errors}
              />
              <FormControl message={state?.errors?.last_name} />
            </div>
          </div>
          <Label content="Email" />
          <Input
            defaultValue={defaultValues?.email || ''}
            name="email"
            type="email"
            aria-label="Email"
            aria-describedby="email"
            errors={state?.errors}
          />
          <FormControl message={state?.errors?.email} />
          <FormControl message={state?.errors?.apiError} />
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
