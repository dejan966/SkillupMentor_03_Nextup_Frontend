'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { UserFormData } from '@/hooks/react-hook-forms/useCreateUpdateUser'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Button from '../ui/Button'
import FormControl from '../ui/FormControl'
import { useFormState } from 'react-dom'
import { updateUserAvatar } from '@/actions/createUpdateUser'
import FormContainer from '../ui/FormContainer'
import Avatar from '../ui/Avatar'
import DivCentered from '../ui/DivCentered'

type Props = {
  defaultValues: UserFormData
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
  const [state, formAction] = useFormState(updateUserAvatar, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      router.back()
    }
  }, [state.success])
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

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
    <DivCentered>
      <FormContainer>
        <h1 className="text-6xl font-bold">Profile settings</h1>
        <div className="mb-4">Change your profile photo</div>
        <form action={formAction}>
          <div>
            <div className="flex justify-center mb-4">
              <Avatar
                src={
                  preview
                    ? (preview as string)
                    : `${process.env.NEXT_PUBLIC_API_URL}/uploads/avatars/${defaultValues?.avatar}`
                }
                alt="Avatar"
                width={110}
                height={110}
                onClick={uploadFile}
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
      </FormContainer>
    </DivCentered>
  )
}
