'use client'

import { UserFormData } from '@/hooks/react-hook-forms/useCreateUpdateUser'
import { RoleType } from '@/models/role'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import Button from '../ui/Button'
import { useFormState } from 'react-dom'
import { createUserAction, updateUserAction } from '@/actions/createUpdateUser'
import { UserFormState } from '@/models/userFormState'

type Props = {
  defaultValues?: UserFormData
  roles: RoleType[]
  title: string
}

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

export default function CreateUpdateUser({
  defaultValues,
  roles,
  title,
}: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const actionWithId = async (prevState: UserFormState, formData: FormData) => {
    if (defaultValues) {
      return updateUserAction(prevState, formData, defaultValues._id)
    }
    return createUserAction(prevState, formData)
  }

  const [state, formAction] = useFormState(actionWithId, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      router.back()
    }
  }, [state.success])

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const myfile = target.files[0]
      setFile(myfile)
    }
  }

  const uploadFile = () => {
    document.getElementById('avatarUpload')?.click()
  }

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }, [file])

  return (
    <div className="centered">
      <div className="px-8 pt-6 pb-8 mb-4 w-2/5">
        <h1 className="text-2xl text-black font-bold mb-4">{title}</h1>
        <form action={formAction}>
          <div className="flex justify-center">
            <Image
              src={
                preview
                  ? (preview as string)
                  : `${process.env.NEXT_PUBLIC_API_URL}/uploads/avatars/${defaultValues?.avatar}`
              }
              alt="Avatar"
              className="userAvatar"
              width={110}
              height={110}
              onClick={uploadFile}
            />
          </div>
          <input
            onChange={handleFileChange}
            id="avatarUpload"
            name="userImage"
            type="file"
            aria-label="avatar"
            aria-describedby="avatar"
            className="hidden"
            accept="image/png, 'image/jpg', image/jpeg"
          />
          {state?.errors?.userImage && (
            <div className="validation-feedback">{state.errors.userImage}</div>
          )}
          <div className="flex justify-between">
            <div className="mb-4">
              <label className="inputText">First name</label>
              <input
                defaultValue={defaultValues?.first_name || ''}
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
                defaultValue={defaultValues?.last_name || ''}
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
            defaultValue={defaultValues?.email}
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
          <label className="inputText">Password</label>
          <input
            name="password"
            type="password"
            placeholder="******"
            aria-label="Password"
            aria-describedby="password"
            className={
              state?.errors?.password
                ? 'tailwind-form-control-errors'
                : 'tailwind-form-control'
            }
          />
          {state?.errors?.password && (
            <div className="validation-feedback">{state.errors.password}</div>
          )}
          {defaultValues && (
            <>
              <label className="inputText">New password</label>
              <input
                name="new_password"
                type="password"
                placeholder="******"
                aria-label="newPassword"
                aria-describedby="newPassword"
                className={
                  state?.errors.new_password
                    ? 'tailwind-form-control-errors'
                    : 'tailwind-form-control'
                }
              />
              {state?.errors?.new_password && (
                <div className="validation-feedback">
                  {state.errors.new_password}
                </div>
              )}
            </>
          )}
          <label className="inputText">Confirm password</label>
          <input
            name="confirm_password"
            type="password"
            placeholder="******"
            aria-label="confirm_password"
            aria-describedby="confirm_password"
            className={
              state?.errors?.confirm_password
                ? 'tailwind-form-control-errors'
                : 'tailwind-form-control'
            }
          />
          {state?.errors?.confirm_password && (
            <div className="validation-feedback">
              {state.errors.confirm_password}
            </div>
          )}
          <label className="inputText">Role</label>
          <select
            name="role"
            key={defaultValues?.role}
            defaultValue={defaultValues?.role || ''}
            className={
              state?.errors?.role
                ? 'w-full rounded-full border border-red-600 px-5 py-2 text-md'
                : 'w-full rounded-full border border-gray-300 px-5 py-2 text-md'
            }
          >
            <option value="">Select role</option>
            {roles?.map((role: RoleType) => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>
          {state?.errors.role && (
            <div className="validation-feedback">{state?.errors?.role}</div>
          )}
          {state?.errors?.apiError && (
            <div className="text-red-500 text-md">{state.errors.apiError}</div>
          )}
          <Button variant="default" className="mb-4" type="submit">
            {title}
          </Button>
        </form>
      </div>
    </div>
  )
}
