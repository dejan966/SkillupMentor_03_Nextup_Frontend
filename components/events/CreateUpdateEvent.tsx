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
import * as API from '@/api/api'
import { StatusCode } from '@/enums/errorConstants'
import { routes } from '@/enums/routesConstants'

type Props = {
  defaultValues?: EventType
  title: string
}

export default function CreateUpdateEvent({ defaultValues, title }: Props) {
  const { handleSubmit, errors, control } = useCreateUpdateEventForm({
    defaultValues,
  })
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState(false)

  const router = useRouter()

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const myfile = target.files[0]
      setFile(myfile)
    }
  }

  const uploadFile = () => {
    document.getElementById('locationUpload')?.click()
  }

  const onSubmit = handleSubmit(
    async (data: CreateEventFields | UpdateEventFields) => {
      console.log(data)
      if (defaultValues) {
        handleUpdate(data as UpdateEventFields)
      } else if (!defaultValues) {
        data.max_users = 100
        data.image = 'event-picture.png'
        handleCreate(data as CreateEventFields)
      }
    },
  )

  const handleUpdate = async (data: UpdateEventFields) => {
    const response = await API.updateEvent(data, defaultValues!._id)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      router.push(routes.HOME)
    }
  }

  const handleCreate = async (data: CreateEventFields) => {
    const response = await API.createEvent(data)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      router.push(routes.HOME)
    }
  }

  const clearImg = () => {
    setPreview('/location_placeholder.png')
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
      setPreview('/location_placeholder.png')
    }
  }, [file])

  return (
    <div className="grid grid-cols-2 pl-24 pr-24">
      <div>
        <h1 className="text-2xl text-black">{title}</h1>
        <br />
        <form method="POST" onSubmit={onSubmit}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Event name
                </label>
                <input
                  {...field}
                  type="text"
                  aria-label="name"
                  aria-describedby="name"
                  className={
                    errors.name
                      ? 'border border-red-500 rounded-full h-10 w-full'
                      : 'border rounded-full h-10 w-full'
                  }
                />
                {errors.name && (
                  <div className="text-red-500 text-xs">
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
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Location
                </label>
                <input
                  {...field}
                  type="text"
                  aria-label="location"
                  aria-describedby="location"
                  className={
                    errors.location
                      ? 'border border-red-500 rounded-full h-10 w-full'
                      : 'border rounded-full h-10 w-full'
                  }
                />
                {errors.location && (
                  <div className="text-red-500 text-xs">
                    {errors.location.message}
                  </div>
                )}
              </div>
            )}
          />
          <div className="grid grid-cols-3">
            <div className="w-52 mb-4">
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Date
                    </label>
                    <input
                      {...field}
                      type="text"
                      aria-label="date"
                      aria-describedby="date"
                      className={
                        errors.date
                          ? 'border border-red-500 rounded-full h-10 w-full'
                          : 'border rounded-full h-10 w-full'
                      }
                    />
                    {errors.date && (
                      <div className="text-red-500 text-xs">
                        {errors.date.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="w-52">
              <Controller
                control={control}
                name="hour"
                render={({ field }) => (
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Hour
                    </label>
                    <input
                      {...field}
                      type="text"
                      aria-label="hour"
                      aria-describedby="hour"
                      className={
                        errors.hour
                          ? 'border border-red-500 rounded-full h-10 w-full'
                          : 'border rounded-full h-10 w-full'
                      }
                    />
                    {errors.hour && (
                      <div className="text-red-500 text-xs">
                        {errors.hour.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            {/* <div className="w-52">
              <Controller
                control={control}
                name="max_users"
                render={({ field }) => (
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Max users
                    </label>
                    <input
                      {...field}
                      type="number"
                      aria-label="max_users"
                      aria-describedby="max_users"
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      className={
                        errors.max_users
                          ? 'border border-red-500 rounded-full h-10 w-full'
                          : 'border rounded-full h-10 w-full'
                      }
                    />
                    {errors.max_users && (
                      <div className="text-red-500 text-xs">
                        {errors.max_users.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div> */}
          </div>

          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <input
                  {...field}
                  type="text"
                  aria-label="description"
                  aria-describedby="description"
                  className={
                    errors.description
                      ? 'border border-red-500 rounded-full h-10 w-full'
                      : 'border rounded-full h-10 w-full'
                  }
                />
                {errors.description && (
                  <div className="text-red-500 text-xs">
                    {errors.description.message}
                  </div>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <div className="mb-4">
                <input
                  {...field}
                  onChange={handleFileChange}
                  id="eventUpload"
                  type="file"
                  accept="image/png, 'image/jpg', image/jpeg"
                />
                <button
                  className="bg-black text-white h-10 w-full rounded-full hover:bg-blue-500 mb-4"
                  type="button"
                >
                  Add image
                </button>
                {errors.image && (
                  <div className="text-red-500 text-xs">
                    {errors.image.message}
                  </div>
                )}
                {showError && (
                  <div className="text-red-500 text-md">{apiError}</div>
                )}
              </div>
            )}
          />
          {/* <div>
            <button
              className="bg-black text-white h-10 w-full rounded-full hover:bg-blue-500 mb-4"
              type="button"
            >
              Add image
            </button>
          </div> */}
          <div>
            <button
              className="bg-blue-800 text-white h-10 w-full rounded-full hover:bg-blue-500 mb-4"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div>
        <h1 className="text-2xl text-black">Added events</h1>
      </div>
    </div>
  )
}
