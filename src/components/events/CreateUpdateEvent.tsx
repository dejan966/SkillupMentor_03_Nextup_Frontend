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
import { getCurrUser } from '@/hooks/useUsers'
import EventCard from './EventCard'
import Image from 'next/image'

type Props = {
  defaultValues?: EventType
  title: string
}

export default function CreateUpdateEvent({ defaultValues, title }: Props) {
  const { data: currUser } = getCurrUser()

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
    document.getElementById('eventUpload')?.click()
  }

  const handleFileError = () => {
    if (!file) setFileError(true)
    else setFileError(false)
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
    const response = await API.updateEvent(data, defaultValues!._id)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      const formData = new FormData()
      formData.append('image', file!, file!.name)
      const fileResponse = await API.uploadEventImage(
        formData,
        response.data._id,
      )
      if (fileResponse.status === StatusCode.BAD_REQUEST) {
        setApiError(fileResponse.data.message)
        setShowError(true)
      } else if (fileResponse.status === StatusCode.INTERNAL_SERVER_ERROR) {
        setApiError(fileResponse.data.message)
        setShowError(true)
      } else {
        router.push(routes.HOME)
      }
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
      const formData = new FormData()
      formData.append('image', file!, file!.name)
      const fileResponse = await API.uploadEventImage(
        formData,
        response.data._id,
      )
      if (fileResponse.status === StatusCode.BAD_REQUEST) {
        setApiError(fileResponse.data.message)
        setShowError(true)
      } else if (fileResponse.status === StatusCode.INTERNAL_SERVER_ERROR) {
        setApiError(fileResponse.data.message)
        setShowError(true)
      } else {
        router.push(routes.HOME)
      }
    }
  }

  const clearImg = () => {
    //remove image from input type file
    setFile(null)
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
      setPreview('')
    }
  }, [file])

  return (
    <div className="grid grid-cols-2 pl-24 pr-24 space-x-8">
      <div>
        <h1 className="text-2xl text-black font-bold">{title}</h1>
        <br />
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
                      defaultValue={new Date().toISOString().substring(0, 10)}
                      min="2023-01-01"
                      max="2031-12-31"
                      className={
                        errors.date
                          ? 'tailwind-form-control-errors'
                          : 'tailwind-form-control'
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
                      type="text"
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
            {preview && (
              <div className="flex justify-between">
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
            )}
            <br />
            <button
              className="bg-black text-white h-10 w-full rounded-full hover:bg-stone-700 mb-4"
              type="button"
              onClick={uploadFile}
            >
              Add image
            </button>
            <input
              type="file"
              id="eventUpload"
              name="image"
              onChange={handleFileChange}
              aria-label="image"
              aria-describedby="image"
              accept="image/png, 'image/jpg', image/jpeg"
              className="none"
            />
            {fileError && (
              <div className="validation-feedback">Image is required</div>
            )}
            {showError && (
              <div className="text-red-500 text-md">{apiError}</div>
            )}
          </div>
          <div>
            <button
              className="blue text-white h-10 w-full rounded-full"
              type="submit"
              onMouseUp={handleFileError}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div>
        <h1 className="text-2xl text-black font-bold">Added events</h1>
        {currUser?.data.created_events.slice(0, 4).map((event: EventType) => {
          return (
            <EventCard
              key={event._id}
              event={event}
              typeIcon="/settingsIcon.svg"
            />
          )
        })}
      </div>
    </div>
  )
}
