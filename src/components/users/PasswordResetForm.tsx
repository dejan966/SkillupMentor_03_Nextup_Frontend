'use client'

import { passwordResetEmail } from '@/lib/user'
import { StatusCode } from '@/constants/errorConstants'
import {
  UpdateUserFields,
  useCreateUpdateUser,
  UserFormData,
} from '@/hooks/react-hook-forms/useCreateUpdateUser'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import Button from '../ui/Button'
import Label from '../ui/Label'
import FormControl from '../ui/FormControl'
import { SafeError } from '@/models/safeError'

type Props = {
  defaultValues: UserFormData
}

export default function PasswordResetForm({ defaultValues }: Props) {
  const { handleSubmit, errors, control } = useCreateUpdateUser({
    defaultValues,
  })

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const router = useRouter()

  const onSubmit = handleSubmit(async (data: UpdateUserFields) => {
    handleChange(data as UpdateUserFields)
  })

  const handleChange = async (data: UpdateUserFields) => {
    try {
      await passwordResetEmail(data)
      router.push('/')
    } catch (error) {
      const safeError = error as SafeError
      setApiError(safeError.message)
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
                <FormControl message={apiError} />
              </div>
            )}
          />
          <Button variant="default" className="mb-4" type="submit">
            Send password reset email
          </Button>
        </form>
      </div>
    </div>
  )
}
