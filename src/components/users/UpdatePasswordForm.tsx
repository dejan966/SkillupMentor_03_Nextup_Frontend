'use client'

import { updateUserPass } from '@/lib/user'
import { StatusCode } from '@/enums/errorConstants'
import { routes } from '@/enums/routesConstants'
import {
  useUpdateUserForm,
  UpdateUserFields,
} from '@/hooks/react-hook-forms/useUpdateUserForm'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

export default function UpdatePasswordForm() {
  const router = useRouter()
  const { handleSubmit, errors, control } = useUpdateUserForm({})

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const onSubmit = handleSubmit(async (data: UpdateUserFields) => {
    handleUpdate(data as UpdateUserFields)
  })

  const handleUpdate = async (data: UpdateUserFields) => {
    const response = await updateUserPass(data)
    if (response.status === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      router.push(routes.USERINFO)
    }
  }

  return (
    <div className="centered">
      <div className="px-8 pt-6 pb-8 mb-4 w-2/5">
        <h1 className="text-6xl font-bold">Profile settings</h1>
        <div className="mb-3">Change your password</div>
        <form method="POST" onSubmit={onSubmit}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <div className="mb-3">
                <label className="inputText">Current password</label>
                <input
                  {...field}
                  type="password"
                  placeholder="******"
                  aria-label="password"
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
            name="new_password"
            render={({ field }) => (
              <div className="mb-3">
                <label className="inputText">New password</label>
                <input
                  {...field}
                  type="password"
                  placeholder="******"
                  aria-label="newPassword"
                  aria-describedby="newPassword"
                  className={
                    errors.new_password
                      ? 'tailwind-form-control-errors'
                      : 'tailwind-form-control'
                  }
                />
                {errors.new_password && (
                  <div className="validation-feedback">
                    {errors.new_password.message}
                  </div>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="confirm_password"
            render={({ field }) => (
              <div className="mb-3">
                <label className="inputText">Confirm new password</label>
                <input
                  {...field}
                  type="password"
                  aria-label="Confirm new password"
                  aria-describedby="confirm_new_password"
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
          <div className="flex items-center justify-between">
            <button
              className="blue text-white rounded-full h-10 w-28 submit"
              type="submit"
            >
              Submit
            </button>
            <button type="button" onClick={() => router.back()}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
