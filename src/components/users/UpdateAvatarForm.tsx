'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { fetchCurrUser, uploadAvatar } from '@/lib/user'
import {
  useCreateUpdateUser,
  UserFormData,
} from '@/hooks/react-hook-forms/useCreateUpdateUser'
import { StatusCode } from '@/constants/errorConstants'
import { routes } from '@/constants/routesConstants'
import { useRouter } from 'next/navigation'
import useLocalStorage from '@/hooks/useLocalStorage'
import { Controller } from 'react-hook-form'
import Image from 'next/image'

type Props = {
  defaultValues?: UserFormData
}

export default function UpdateAvatarForm({ defaultValues }: Props) {
  const [value, setValue] = useLocalStorage()
  const router = useRouter()
  const { handleSubmit, errors, control } = useCreateUpdateUser({
    defaultValues,
  })

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const onSubmit = handleSubmit(async () => {
    const formData = new FormData()
    if (!file) {
      return
    }
    formData.append('avatar', file, file.name)
    const fileResponse = await uploadAvatar(formData, defaultValues!._id)
    if (!fileResponse) {
      setApiError('Unable to establish connection with server')
      setShowError(true)
    } else if (fileResponse.status === StatusCode.BAD_REQUEST) {
      setApiError(fileResponse.data.message)
      setShowError(true)
    } else if (fileResponse.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(fileResponse.data.message)
      setShowError(true)
    } else {
      const userResponse = await fetchCurrUser()
      if (userResponse?.status === StatusCode.INTERNAL_SERVER_ERROR) {
        setApiError(fileResponse?.data.message)
        setShowError(true)
      } else {
        setValue(userResponse?.data)
        router.push(routes.USERINFO)
      }
    }
  })

  const uploadFile = () => {
    document.getElementById('avatarUpload')?.click()
  }

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const myfile = target.files[0]
      setFile(myfile)
    }
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
        <h1 className="text-6xl font-bold">Profile settings</h1>
        <div className="mb-4">Change your profile photo</div>
        <form method="POST" onSubmit={onSubmit}>
          <div>
            <div className="flex justify-center mb-4">
              <Image
                src={
                  preview
                    ? (preview as string)
                    : `${process.env.NEXT_PUBLIC_API_URL}/uploads/avatars/${value?.avatar}`
                }
                alt="Avatar"
                className="userAvatar"
                width={110}
                height={110}
              />
            </div>
            <Controller
              control={control}
              name="userImage"
              render={({ field }) => (
                <div>
                  <input
                    onChange={(e) => {
                      handleFileChange(e)
                      field.onChange(e.target.files)
                    }}
                    id="avatarUpload"
                    name={field.name}
                    type="file"
                    aria-label="avatar"
                    aria-describedby="avatar"
                    className="hidden"
                    accept="image/png, 'image/jpg', image/jpeg"
                  />
                  {errors.userImage && (
                    <div className="validation-feedback">
                      {errors.userImage.message}
                    </div>
                  )}
                </div>
              )}
            />
            <button className="pinkButton" onClick={uploadFile}>
              Upload new image
            </button>
            {showError && (
              <div className="text-red-500 text-md">{apiError}</div>
            )}
          </div>
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
