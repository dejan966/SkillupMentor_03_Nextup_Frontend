'use client'

import { fetchCurrUser, login, register, uploadAvatar } from '@/lib/user'
import { StatusCode } from '@/enums/errorConstants'
import { routes } from '@/enums/routesConstants'
import {
  useRegisterForm,
  RegisterUserFields,
} from '@/hooks/react-hook-forms/useRegister'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import useLocalStorage from '@/hooks/useLocalStorage'

export default function RegisterForm() {
  const { handleSubmit, errors, control } = useRegisterForm()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [value, setValue] = useLocalStorage()
  const router = useRouter()

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview('')
    }
  }, [file])

  const onSubmit = handleSubmit(async (data: RegisterUserFields) => {
    const response = await register(data)
    if (response?.status === StatusCode.BAD_REQUEST) {
      setApiError(response?.data.message)
      setShowError(true)
    } else if (response?.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response?.data.message)
      setShowError(true)
    } else {
      const loginResponse = await login({
        email: data.email,
        password: data.password,
      })
      if (loginResponse?.status === StatusCode.BAD_REQUEST) {
        setApiError(loginResponse?.data.message)
        setShowError(true)
      } else if (loginResponse?.status === StatusCode.INTERNAL_SERVER_ERROR) {
        setApiError(loginResponse?.data.message)
        setShowError(true)
      } else {
        if (file) {
          const formData = new FormData()
          formData.append('avatar', file, file.name)
          const fileResponse = await uploadAvatar(formData, response?.data._id)
          if (fileResponse?.status === StatusCode.BAD_REQUEST) {
            setApiError(fileResponse?.data.message)
            setShowError(true)
          } else if (
            fileResponse?.status === StatusCode.INTERNAL_SERVER_ERROR
          ) {
            setApiError(fileResponse?.data.message)
            setShowError(true)
          } else {
            const userResponse = await fetchCurrUser()
            if (userResponse?.status === StatusCode.INTERNAL_SERVER_ERROR) {
              setApiError(fileResponse?.data.message)
              setShowError(true)
            } else {
              setValue(userResponse?.data)
              router.push(routes.HOME)
              return
            }
          }
        }
      }
      router.push(routes.HOME)
    }
  })

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const myfile = target.files[0]
      setFile(myfile)
    }
  }

  const uploadFile = () => {
    document.getElementById('avatarUpload')?.click()
  }

  return (
    <div className="centered">
      <div className="px-8 pt-6 pb-8 mb-4 w-2/5">
        <h1 className="text-6xl">Hello!</h1>
        <p className="text-lg text-black font-bold mb-4">
          Get started with your free account today.
        </p>
        <form method="POST" onSubmit={onSubmit}>
          <div className="flex justify-center">
            <Image
              src={
                preview
                  ? (preview as string)
                  : `${process.env.NEXT_PUBLIC_API_URL}/uploads/avatars/default-profile.png`
              }
              alt="Avatar"
              className="userAvatar"
              width={110}
              height={110}
              onClick={uploadFile}
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
          <div className="flex justify-between">
            <div className="mb-4">
              <Controller
                control={control}
                name="first_name"
                render={({ field }) => (
                  <div className="">
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
                  <div className="">
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
              </div>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <div className="mb-4">
                <label className="inputText">Password</label>
                <input
                  {...field}
                  type="password"
                  aria-label="Password"
                  aria-describedby="password"
                  className={
                    errors.password
                      ? 'tailwind-form-control-errors'
                      : 'tailwind-form-control'
                  }
                />
                {errors.password && (
                  <div className="validation-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="confirm_password"
            render={({ field }) => (
              <div className="mb-4">
                <label className="inputText">Confirm password</label>
                <input
                  {...field}
                  type="password"
                  aria-label="confirm_password"
                  aria-describedby="confirm_password"
                  className={
                    errors.confirm_password
                      ? 'tailwind-form-control-errors'
                      : 'tailwind-form-control'
                  }
                />
                {errors.confirm_password && (
                  <div className="validation-feedback">
                    {errors.confirm_password.message}
                  </div>
                )}
                {showError && (
                  <div className="text-red-500 text-md">{apiError}</div>
                )}
              </div>
            )}
          />
          <div>
            <button className="blueButton" type="submit">
              Sign up
            </button>
          </div>
          <div className="flex justify-between">
            <p className="text-black text-start">Already have an account?</p>
            <Link
              className="text-decoration-none hover:text-blue-500"
              href={routes.LOGIN}
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
