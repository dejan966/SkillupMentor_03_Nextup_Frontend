'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import * as API from '@/api/api'
import { useCreateUpdateUserForm } from '@/hooks/react-hook-forms/useCreateUpdateUser'
import { StatusCode } from '@/enums/errorConstants'
import { routes } from '@/enums/routesConstants'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import authStore from '@/stores/auth.store'

export default function UpdateAvatarForm() {
  const defaultValues = authStore.user!
  const router = useRouter()
  const { handleSubmit } = useCreateUpdateUserForm({
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
    const fileResponse = await API.uploadAvatar(formData, defaultValues._id)
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
        <h1 className="text-7xl font-bold">Profile settings</h1>
        <div className="mb-3">Change your profile photo</div>
        <form method="POST" onSubmit={onSubmit}>
          <div className="mb-3">
            <Image
              src={preview ? (preview as string) : '/default-profile.svg'}
              width={110}
              height={110}
              alt="Avatar"
            />
            <button className="blueButton" onClick={uploadFile}>
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
          <button className="blueButton" type="submit">
            Submit
          </button>
          <p>Cancel</p>
        </form>
      </div>
    </div>
  )
}
