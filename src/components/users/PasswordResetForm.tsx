'use client'
import * as API from '@/api/api'
import { StatusCode } from '@/enums/errorConstants'
import {
  UpdateUserFields,
  useUpdateUserForm,
} from '@/hooks/react-hook-forms/useUpdateUserForm'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

export default function PasswordResetForm() {
  const { handleSubmit, errors, control } = useUpdateUserForm({})

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const router = useRouter()

  const onSubmit = handleSubmit(async (data: UpdateUserFields) => {
    handleChange(data as UpdateUserFields)
  })

  const handleChange = async (data: UpdateUserFields) => {
    const response = await API.passwordResetEmail(data)
    if (response.status === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="centered">
      <div className="px-8 pt-6 pb-8 mb-4 w-2/5">
        <h1 className="text-6xl font-bold mb-4">Reset your password</h1>
        <div className="mb-4">
          Enter your email address and we will send you a password reset link.
        </div>
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
                {showError && (
                  <div className="text-red-500 text-md">{apiError}</div>
                )}
              </div>
            )}
          />
          <button className="blueButton" type="submit">
            Send password reset email
          </button>
        </form>
      </div>
    </div>
  )
}
