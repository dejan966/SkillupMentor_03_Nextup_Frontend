'use client'

import {
  CreateEventFields,
  UpdateEventFields,
  useCreateUpdateEventForm,
} from '@/hooks/react-hook-forms/useCreateUpdateEvent'
import { EventType } from '@/models/event'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { createEvent, updateEvent, uploadEventImage } from '@/lib/event'
import { StatusCode } from '@/enums/errorConstants'
import { routes } from '@/enums/routesConstants'
import { fetchCurrUser } from '@/lib/user'
import Image from 'next/image'
import EventList from './EventList'
import { useQuery } from '@tanstack/react-query'

type Props = {
  defaultValues?: EventType
  title: string
}

export default function CreateUpdateEvent({ defaultValues, title }: Props) {
  console.log(defaultValues)
  const {
    data: currUser,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['currUser'],
    queryFn: fetchCurrUser,
  })

  const { handleSubmit, errors, control } = useCreateUpdateEventForm({
    defaultValues,
  })

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const router = useRouter()

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const myfile = target.files[0]
      setFile(myfile)
    }
  }

  const uploadFile = () => {
    document.getElementById('eventUpload')?.click()
  }

  const onSubmit = handleSubmit(
    async (data: CreateEventFields | UpdateEventFields) => {
      if (defaultValues) {
        handleUpdate(data as UpdateEventFields)
      } else if (!defaultValues) {
        handleCreate(data as CreateEventFields)
      }
    },
  )

  const handleUpdate = async (data: UpdateEventFields) => {
    const response = await updateEvent(data, defaultValues!._id)
    if (response?.status === StatusCode.BAD_REQUEST) {
      setApiError(response?.data.message)
      setShowError(true)
    } else if (response?.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response?.data.message)
      setShowError(true)
    } else {
      if (file) {
        const formData = new FormData()
        formData.append('image', file, file.name)
        const fileResponse = await uploadEventImage(
          formData,
          response?.data._id,
        )
        if (fileResponse?.status === StatusCode.BAD_REQUEST) {
          setApiError(fileResponse?.data.message)
          setShowError(true)
        } else if (fileResponse?.status === StatusCode.INTERNAL_SERVER_ERROR) {
          setApiError(fileResponse?.data.message)
          setShowError(true)
        }
      }
      router.push(routes.HOME)
    }
  }

  const handleCreate = async (data: CreateEventFields) => {
    const response = await createEvent(data)
    if (response?.status === StatusCode.BAD_REQUEST) {
      setApiError(response?.statusText)
      setShowError(true)
    } else if (response?.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response?.statusText)
      setShowError(true)
    } else {
      const formData = new FormData()
      if (!file) {
        setApiError('Photo is required')
        setShowError(true)
      }
      formData.append('image', file!, file!.name)
      const fileResponse = await uploadEventImage(formData, response?.data._id)
      if (fileResponse?.status === StatusCode.BAD_REQUEST) {
        setApiError(fileResponse?.statusText)
        setShowError(true)
      } else if (fileResponse?.status === StatusCode.INTERNAL_SERVER_ERROR) {
        setApiError(fileResponse?.statusText)
        setShowError(true)
      } else {
        router.push(routes.HOME)
      }
    }
  }

  const clearImg = () => {
    setFile(null)
  }

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

  return (
    <div className="grid grid-cols-2 pl-24 pr-24 space-x-8">
      <div>
        <h1 className="text-2xl text-black font-bold mb-4">{title}</h1>
        <form method="POST" onSubmit={onSubmit}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <div className="mb-4">
                <label className="inputText">Event name</label>
                <input
                  {...field}
                  type="text"
                  aria-label="name"
                  aria-describedby="name"
                  className={
                    errors.name
                      ? 'tailwind-form-control-errors'
                      : 'tailwind-form-control'
                  }
                />
                {errors.name && (
                  <div className="validation-feedback">
                    {errors.name.message}
                  </div>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <div className="mb-4">
                <label className="inputText">Location</label>
                <input
                  {...field}
                  type="text"
                  aria-label="location"
                  aria-describedby="location"
                  className={
                    errors.location
                      ? 'tailwind-form-control-errors'
                      : 'tailwind-form-control'
                  }
                />
                {errors.location && (
                  <div className="validation-feedback">
                    {errors.location.message}
                  </div>
                )}
              </div>
            )}
          />
          <div className="divGrid">
            <div className="w-6/7 mb-4">
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <div>
                    <label className="inputText">Date</label>
                    <input
                      {...field}
                      type="date"
                      id="date"
                      min="2023-01-01"
                      max="2031-12-31"
                      className={
                        errors.date
                          ? 'tailwind-form-control-errors eventInputDate'
                          : 'tailwind-form-control eventInputDate'
                      }
                    />
                    {errors.date && (
                      <div className="validation-feedback">
                        {errors.date.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="w-6/7">
              <Controller
                control={control}
                name="hour"
                render={({ field }) => (
                  <div>
                    <label className="inputText">Hour</label>
                    <input
                      {...field}
                      type="text"
                      aria-label="hour"
                      aria-describedby="hour"
                      className={
                        errors.hour
                          ? 'tailwind-form-control-errors'
                          : 'tailwind-form-control'
                      }
                    />
                    {errors.hour && (
                      <div className="validation-feedback">
                        {errors.hour.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="w-6/7">
              <Controller
                control={control}
                name="max_users"
                render={({ field }) => (
                  <div>
                    <label className="inputText">Max users</label>
                    <input
                      {...field}
                      type="number"
                      aria-label="max_users"
                      aria-describedby="max_users"
                      className={
                        errors.max_users
                          ? 'tailwind-form-control-errors'
                          : 'tailwind-form-control'
                      }
                    />
                    {errors.max_users && (
                      <div className="validation-feedback">
                        {errors.max_users.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <div className="mb-4">
                <label className="inputText">Description</label>
                <input
                  {...field}
                  type="text"
                  aria-label="description"
                  aria-describedby="description"
                  className={
                    errors.description
                      ? 'tailwind-form-control-errors'
                      : 'tailwind-form-control'
                  }
                />
                {errors.description && (
                  <div className="validation-feedback">
                    {errors.description.message}
                  </div>
                )}
              </div>
            )}
          />
          <div className="mb-4">
            {preview ? (
              <div className="flex justify-between mb-4">
                <Image
                  src={preview as string}
                  alt="event img"
                  width={123}
                  height={123}
                />
                <button
                  type="button"
                  className="rounded-lg h-10 w-14 text-white bg-red-600 hover:bg-red-800"
                  onClick={clearImg}
                >
                  x
                </button>
              </div>
            ) : (
              defaultValues && (
                <div className="mb-4">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/events/${defaultValues?.image}`}
                    alt="event img"
                    width={123}
                    height={123}
                  />
                </div>
              )
            )}
            <button
              className="bg-black text-white h-10 w-full rounded-full hover:bg-stone-700"
              type="button"
              onClick={uploadFile}
            >
              Add image
            </button>
            <Controller
              control={control}
              name="eventImage"
              render={({ field }) => (
                <div>
                  <input
                    onChange={(e) => {
                      handleFileChange(e)
                      field.onChange(e.target.files)
                    }}
                    id="eventUpload"
                    name={field.name}
                    type="file"
                    aria-label="image"
                    aria-describedby="image"
                    className="hidden"
                    accept="image/png, 'image/jpg', image/jpeg"
                  />
                  {errors.eventImage && (
                    <div className="validation-feedback">
                      {errors.eventImage.message}
                    </div>
                  )}
                </div>
              )}
            />
            {showError && (
              <div className="text-red-500 text-md">{apiError}</div>
            )}
          </div>
          <div>
            <button
              className="blue text-white h-10 w-full rounded-full mb-4"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div>
        <h1 className="text-2xl text-black font-bold mb-4">Added events</h1>
        {isError ? (
          <div>
            <h2>Something went wrong!</h2>
            <button
              type="button"
              className="blueButton"
              onClick={() => refetch()}
            >
              Try again
            </button>
          </div>
        ) : (
          <EventList
            events={currUser?.data.created_events}
            type="card"
            cardIcon
            edit
          />
        )}
      </div>
    </div>
  )
}
