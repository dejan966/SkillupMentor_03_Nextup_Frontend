'use client'

import { notFound, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { RoleType } from '@/models/role'
import { fetchCurrUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import Button from '../ui/Button'
import { createRoleAction, updateRoleAction } from '@/actions/createUpdateRole'
import { useFormState } from 'react-dom'
import { FormState } from '@/models/formState'

type Props = {
  defaultValues?: RoleType
  title: string
}

const initialState = {
  success: '',
  errors: {
    name: '',
    apiError: '',
  },
}

export default function CreateUpdateRole({ defaultValues, title }: Props) {
  const actionWithId = async (prevState: FormState, formData: FormData) => {
    if (defaultValues) {
      return updateRoleAction(prevState, formData, defaultValues._id)
    }
    return createRoleAction(prevState, formData)
  }

  const [state, formAction] = useFormState(actionWithId, initialState)

  const router = useRouter()

  const { data: currUser } = useQuery({
    queryKey: ['currUser'],
    queryFn: fetchCurrUser,
  })

  useEffect(() => {
    if (state.success) {
      router.back()
    }
  }, [state.success])

  if (currUser) {
    if (currUser?.data.role.name !== 'ADMIN') {
      notFound()
    }
  }

  return (
    <div className="centeredRoles">
      <div>
        <h1 className="text-2xl text-black font-bold mb-4">{title}</h1>
        <form action={formAction}>
          <label className="inputText">Role</label>
          <input
            defaultValue={defaultValues?.name}
            name="name"
            type="text"
            aria-label="name"
            aria-describedby="name"
            className={
              state?.errors?.name
                ? 'tailwind-form-control-errors'
                : 'tailwind-form-control'
            }
          />
          {state?.errors?.name && (
            <div className="validation-feedback">{state.errors.name}</div>
          )}
          {state?.errors?.apiError && (
            <div className="text-red-600 mb-4">{state.errors.apiError}</div>
          )}
          {state?.success && (
            <div className="text-green-600 mb-4">{state.success}</div>
          )}
          <div>
            <Button variant="default" className="mb-4" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
