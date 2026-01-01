'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { UserFormData } from '@/hooks/react-hook-forms/useCreateUpdateUser'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Button from '../ui/Button'
import FormControl from '../ui/FormControl'
import { useFormState } from 'react-dom'
import { updateUserAvatar } from '@/actions/createUpdateUser'

type Props = {
  defaultValues?: UserFormData
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
    avatar: '',
    apiError: '',
  },
}

export default function UpdateAvatarForm({ defaultValues }: Props) {
  //const [value, setValue] = useLocalStorage()
  /* const { handleSubmit, errors, control } = useCreateUpdateUser({
    defaultValues,
    })
    
    const [apiError, setApiError] = useState('')
    const [showError, setShowError] = useState(false) */

  const [state, formAction] = useFormState(updateUserAvatar, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      router.back()
    }
  }, [state.success])
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  /* const onSubmit = handleSubmit(async () => {
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
  }) */

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
        <form action={formAction}>
          <div>
            <div className="flex justify-center mb-4">
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
              />
            </div>
            <input
              onChange={handleFileChange}
              id="avatarUpload"
              name="avatar"
              type="file"
              aria-label="avatar"
              aria-describedby="avatar"
              className="hidden"
              accept="image/png, 'image/jpg', image/jpeg"
            />
            <FormControl message={state?.errors?.avatar} />
            {/* <Controller
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
                  <FormControl message={errors?.userImage?.message} />
                </div>
              )}
            /> */}
            <Button
              variant="default"
              className="bg-pink-500 hover:bg-pink-300 mb-4"
              onClick={uploadFile}
            >
              Upload new image
            </Button>
            <FormControl message={state?.errors?.apiError} />
          </div>
          <div className="flex items-center justify-between">
            <Button variant="default" className="w-28 uppercase" type="submit">
              Submit
            </Button>
            <button type="button" onClick={() => router.back()}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
