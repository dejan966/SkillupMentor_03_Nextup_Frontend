'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { uploadAvatar } from '@/lib/user'
import { useUpdateUserForm } from '@/hooks/react-hook-forms/useUpdateUserForm'
import { StatusCode } from '@/enums/errorConstants'
import { routes } from '@/enums/routesConstants'
import { useRouter } from 'next/navigation'
import useLocalStorage from '@/hooks/useLocalStorage'

export default function UpdateAvatarForm() {
  const [value] = useLocalStorage()
  const defaultValues = value!
  const router = useRouter()
  const { handleSubmit } = useUpdateUserForm({
    defaultValues,
  })

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState(false)

  const onSubmit = handleSubmit(() => {
    handleUpdate()
  })

  const handleUpdate = async () => {
    const formData = new FormData()
    formData.append('avatar', file!, file?.name!)
    const fileResponse = await uploadAvatar(formData, defaultValues._id)
    if (fileResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(fileResponse.data.message)
      setShowError(true)
    } else if (
      fileResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
    ) {
      setApiError(fileResponse.data.message)
      setShowError(true)
    } else {
      router.push(routes.USERINFO)
    }
  }

  const uploadFile = () => {
    document.getElementById('avatarUpload')?.click()
  }

  const handleFileError = () => {
    if (!file) setFileError(true)
    else setFileError(false)
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
        setFileError(false)
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
              <img
                src={
                  preview
                    ? (preview as string)
                    : `${process.env.NEXT_PUBLIC_API_URL}/uploads/avatars/${value.avatar}`
                }
                className="userAvatar"
                width={120}
                alt="Avatar"
              />
            </div>
            <button className="pinkButton" onClick={uploadFile}>
              Upload new image
            </button>
            <input
              onChange={handleFileChange}
              id="avatarUpload"
              name="avatar"
              type="file"
              aria-label="Avatar"
              aria-describedby="avatar"
              className="hidden"
              accept="image/png, 'image/jpg', image/jpeg"
            />
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
            <p>Cancel</p>
          </div>
        </form>
      </div>
    </div>
  )
}
