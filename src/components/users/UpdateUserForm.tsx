'use client'
import { useRouter } from 'next/navigation'
import * as API from '@/api/api'
import { StatusCode } from '@/enums/errorConstants'
import {
  useUpdateUserForm,
  UpdateUserFields,
} from '@/hooks/react-hook-forms/useUpdateUserForm'
import { useState } from 'react'
import { routes } from '@/enums/routesConstants'
import Link from 'next/link'
import { Controller } from 'react-hook-form'
import { getCurrUser } from '@/hooks/useUsers'

export default function UpdateUserForm() {
  const { data: currUser } = getCurrUser()
  const defaultValues = currUser?.data
  const { handleSubmit, errors, control } = useUpdateUserForm({
    defaultValues,
  })

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const onSubmit = handleSubmit(async (data: UpdateUserFields) => {
    handleUpdate(data as UpdateUserFields)
  })

  const handleUpdate = async (data: UpdateUserFields) => {
    const { first_name, last_name, email } = data
    const response = await API.updateUser(
      { first_name, last_name, email },
      defaultValues._id,
    )
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
  const router = useRouter()
  return (
    <div className="centered">
      <div className="px-8 pt-6 pb-8 mb-4 w-2/5">
        <h1 className="text-4xl font-bold">Profile settings</h1>
        <div className="mb-3">Change your profile settings</div>
        <form method="POST" onSubmit={onSubmit}>
          <div className="flex justify-between">
            <div className="col-md-5">
              <Controller
                control={control}
                name="first_name"
                render={({ field }) => (
                  <div className="mb-3">
                    <label className="inputText">First name</label>
                    <input
                      {...field}
                      type="text"
                      aria-label="First name"
                      aria-describedby="first_name"
                      className={
                        errors.first_name
                          ? 'tailwind-form-control-errors'
                          : 'tailwind-form-control'
                      }
                    />
                    {errors.first_name && (
                      <div className="validation-feedback">
                        {errors.first_name.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="col-md-5">
              <Controller
                control={control}
                name="last_name"
                render={({ field }) => (
                  <div className="mb-3">
                    <label className="inputText">Last name</label>
                    <input
                      {...field}
                      type="text"
                      aria-label="Last name"
                      aria-describedby="last_name"
                      className={
                        errors.last_name
                          ? 'tailwind-form-control-errors'
                          : 'tailwind-form-control'
                      }
                    />
                    {errors.last_name && (
                      <div className="validation-feedback">
                        {errors.last_name.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <div className="mb-3">
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
                  <div className="invalid-feedback text-danger">
                    {errors.email.message}
                  </div>
                )}
                {showError && (
                  <div className="text-red-500 text-md">{apiError}</div>
                )}
              </div>
            )}
          />
          <button className="pinkButton" type="button">
            <Link href={routes.USERAVATAREDIT}>Change your avatar</Link>
          </button>
          <button className="blueButton" type="button">
            <Link href={routes.USERPASSWORDRESET}>Change your password</Link>
          </button>
          <div className="flex items-center justify-between">
            <button
              className="blue text-white rounded-full h-10 w-28 submit"
              type="submit"
            >
              Submit
            </button>
            <a href={routes.USERINFO}>Cancel</a>
          </div>
        </form>
      </div>
    </div>
  )
}
