'use client'

import {
  CreateRoleFields,
  UpdateRoleFields,
  useCreateUpdateRoleForm,
} from '@/hooks/react-hook-forms/useCreateUpdateRole'
import { notFound, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { StatusCode } from '@/constants/errorConstants'
import { createRole, updateRole } from '@/lib/role'
import { RoleType } from '@/models/role'
import { fetchCurrUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'

type Props = {
  defaultValues?: RoleType
  title: string
}

export default function CreateUpdateRole({ defaultValues, title }: Props) {
  const { handleSubmit, errors, control } = useCreateUpdateRoleForm({
    defaultValues,
  })

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const router = useRouter()

  const { data: currUser } = useQuery({
    queryKey: ['currUser'],
    queryFn: fetchCurrUser,
  })

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
    const response = await updateRole(data, defaultValues!._id)
    if (response?.status === StatusCode.BAD_REQUEST) {
      setApiError(response?.statusText)
      setShowError(true)
    } else if (response?.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response?.statusText)
      setShowError(true)
    } else {
      router.back()
    }
  }

  const handleCreate = async (data: CreateRoleFields) => {
    const response = await createRole(data)
    if (response?.status === StatusCode.BAD_REQUEST) {
      setApiError(response?.data.message)
      setShowError(true)
    } else if (response?.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response?.data.message)
      setShowError(true)
    } else {
      router.back()
    }
  }

  if (currUser) {
    if (currUser?.data.role.name !== 'ADMIN') {
      notFound()
    }
  }

  return (
    <div className="centeredRoles">
      <div>
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
                  <div className="validation-feedback">
                    {errors.name.message}
                  </div>
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
    </div>
  )
}
