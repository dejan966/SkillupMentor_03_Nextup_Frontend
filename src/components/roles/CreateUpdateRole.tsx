'use client'

import {
  CreateRoleFields,
  UpdateRoleFields,
  useCreateUpdateRoleForm,
} from '@/hooks/react-hook-forms/useCreateUpdateRole'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { StatusCode } from '@/enums/errorConstants'
import { fetchCurrUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import useFirebaseAuth from '@/hooks/firebase/useFirebaseAuth'
import { createRole, updateRole } from '@/lib/role'
import { RoleType } from '@/models/role'

type Props = {
  defaultValues?: RoleType
  title: string
}

export default function CreateUpdateRole({ defaultValues, title }: Props) {
  const [token] = useFirebaseAuth()
  const { data: currUser } = useQuery({
    queryKey: ['currUser'],
    queryFn: async () => {
      let data
      if (token !== '')
        data = await fetchCurrUser({
          headers: { Authorization: `Bearer ${token}` },
        })
      else data = await fetchCurrUser()
      return data
    },
  })

  const { handleSubmit, errors, control } = useCreateUpdateRoleForm({
    defaultValues,
  })

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const router = useRouter()

  const onSubmit = handleSubmit(
    async (data: CreateRoleFields | UpdateRoleFields) => {
      if (defaultValues) {
        handleUpdate(data as UpdateRoleFields)
      } else if (!defaultValues) {
        handleCreate(data as CreateRoleFields)
      }
    },
  )

  const handleUpdate = async (data: UpdateRoleFields) => {
    let response
    if (token !== '')
      response = await updateRole(data, defaultValues!._id, {
        headers: { Authorization: `Bearer ${token}` },
      })
    else response = await updateRole(data, defaultValues!._id)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      router.back()
    }
  }

  const handleCreate = async (data: CreateRoleFields) => {
    let response
    if (token !== '')
      response = await createRole(data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    else response = await createRole(data)

    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      router.back()
    }
  }

  return (
    <div className="centered">
      <h1 className="text-2xl text-black font-bold mb-4">{title}</h1>
      <form method="POST" onSubmit={onSubmit}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <div className="mb-4">
              <label className="inputText">Role</label>
              <input
                {...field}
                type="text"
                aria-label="name"
                aria-describedby="name"
                className={
                  errors.name
                    ? 'tailwind-form-control-errors'
                    : 'tailwind-form-control'
                }
              />
              {errors.name && (
                <div className="validation-feedback">{errors.name.message}</div>
              )}
            </div>
          )}
        />
        <div>
          <button
            className="blue text-white h-10 w-full rounded-full mb-4"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
