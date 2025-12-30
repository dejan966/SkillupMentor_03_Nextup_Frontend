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
import Input from '../ui/Input'
import FormControl from '../ui/FormControl'
import Label from '../ui/Label'

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
          <Label content="Password" />
          <Input
            name="password"
            type="password"
            placeholder="******"
            aria-label="Password"
            aria-describedby="password"
            errors={state?.errors}
          />
          <FormControl message={state?.errors?.password} />
          {defaultValues && (
            <>
              <Label content="New password" />
              <Input
                name="new_password"
                type="password"
                placeholder="******"
                aria-label="newPassword"
                aria-describedby="newPassword"
                errors={state?.errors}
              />
              <FormControl message={state?.errors?.new_password} />
            </>
          )}
          <Label content="Confirm password" />
          <Input
            name="confirm_password"
            type="password"
            placeholder="******"
            aria-label="confirm_password"
            aria-describedby="confirm_password"
            errors={state?.errors}
          />
          <FormControl message={state?.errors?.confirm_password} />
          <Label content="Role" />
          <select
            name="role"
            key={defaultValues?.role}
            defaultValue={defaultValues?.role || ''}
            className={
              state?.errors?.role
                ? 'w-full rounded-full border border-red-600 px-5 py-2 text-md mb-4'
                : 'w-full rounded-full border border-gray-300 px-5 py-2 text-md mb-4'
            }
          >
            <option value="">Select role</option>
            {roles?.map((role: RoleType) => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>
          <FormControl message={state?.errors?.role} />
          <FormControl message={state?.errors?.apiError} />
          <FormControl classname="text-green-600" message={state?.success} />
          <Button variant="default" className="mb-4" type="submit">
            {title}
          </Button>
        </form>
      </div>
    </div>
  )
}
