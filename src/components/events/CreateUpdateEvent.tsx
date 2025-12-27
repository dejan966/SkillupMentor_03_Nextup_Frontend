'use client'

import { EventType } from '@/models/event'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { fetchCurrUser } from '@/lib/user'
import Image from 'next/image'
import EventList from './EventList'
import { useQuery } from '@tanstack/react-query'
import Button from '../ui/Button'
import { EventFormState } from '@/models/eventFormState'
import {
  createEventAction,
  updateEventAction,
} from '@/actions/createUpdateEvent'
import { useFormState } from 'react-dom'
import moment from 'moment'

type Props = {
  defaultValues?: EventType
  title: string
}

const initialState = {
  success: '',
  errors: {
    name: '',
    eventImage: [],
    description: '',
    location: '',
    date: '',
    hour: '',
    max_users: '',
    apiError: '',
  },
}

export default function CreateUpdateEvent({ defaultValues, title }: Props) {
  const {
    data: currUser,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['currUser'],
    queryFn: fetchCurrUser,
  })

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const actionWithId = async (
    prevState: EventFormState,
    formData: FormData,
  ) => {
    if (defaultValues) {
      return updateEventAction(prevState, formData, defaultValues._id)
    }
    return createEventAction(prevState, formData)
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
    document.getElementById('eventUpload')?.click()
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
        <form action={formAction}>
          <label className="inputText">Event name</label>
          <input
            defaultValue={defaultValues?.name}
            name="name"
            type="text"
            aria-label="name"
            aria-describedby="name"
            className={
              state?.errors?.name
                ? 'tailwind-form-control-errors'
                : 'tailwind-form-control'
            }
          />
          {state?.errors?.name && (
            <div className="validation-feedback">{state.errors.name}</div>
          )}
          <label className="inputText">Location</label>
          <input
            defaultValue={defaultValues?.location}
            name="location"
            type="text"
            aria-label="location"
            aria-describedby="location"
            className={
              state?.errors?.location
                ? 'tailwind-form-control-errors'
                : 'tailwind-form-control'
            }
          />
          {state?.errors?.location && (
            <div className="validation-feedback">{state.errors.location}</div>
          )}
          <div className="divGrid">
            <div className="w-6/7">
              <label className="inputText">Date</label>
              <input
                defaultValue={
                  defaultValues
                    ? defaultValues.date
                    : moment().format('YYYY-M-D')
                }
                name="date"
                type="date"
                id="date"
                min="2023-01-01"
                max="2031-12-31"
                className={
                  state?.errors.date
                    ? 'tailwind-form-control-errors eventInputDate'
                    : 'tailwind-form-control eventInputDate'
                }
              />
              {state?.errors?.date && (
                <div className="validation-feedback">{state.errors.date}</div>
              )}
            </div>
            <div className="w-6/7">
              <label className="inputText">Hour</label>
              <input
                defaultValue={defaultValues?.hour}
                name="hour"
                type="text"
                aria-label="hour"
                aria-describedby="hour"
                className={
                  state?.errors?.hour
                    ? 'tailwind-form-control-errors'
                    : 'tailwind-form-control'
                }
              />
              {state?.errors?.hour && (
                <div className="validation-feedback">{state.errors.hour}</div>
              )}
            </div>
            <div className="w-6/7">
              <label className="inputText">Max users</label>
              <input
                defaultValue={defaultValues?.max_users}
                name="max_users"
                type="number"
                aria-label="max_users"
                aria-describedby="max_users"
                className={
                  state?.errors?.max_users
                    ? 'tailwind-form-control-errors'
                    : 'tailwind-form-control'
                }
              />
              {state?.errors?.max_users && (
                <div className="validation-feedback">
                  {state.errors.max_users}
                </div>
              )}
            </div>
          </div>
          <label className="inputText">Description</label>
          <input
            defaultValue={defaultValues?.description}
            name="description"
            type="text"
            aria-label="description"
            aria-describedby="description"
            className={
              state?.errors?.description
                ? 'tailwind-form-control-errors'
                : 'tailwind-form-control'
            }
          />
          {state?.errors?.description && (
            <div className="validation-feedback">
              {state.errors.description}
            </div>
          )}
          <div className="mb-4">
            {preview ? (
              <div className="flex justify-between mb-4">
                <Image
                  src={preview as string}
                  alt="event img"
                  width={123}
                  height={123}
                />
                <Button
                  variant="error"
                  className="bg-red-600 hover:bg-red-800 w-14"
                  onClick={clearImg}
                >
                  x
                </Button>
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
            <Button
              variant="default"
              className="bg-black hover:bg-stone-700"
              onClick={uploadFile}
            >
              Add image
            </Button>
            <input
              onChange={handleFileChange}
              id="eventUpload"
              name="eventImage"
              type="file"
              aria-label="image"
              aria-describedby="image"
              className="hidden"
              accept="image/png, 'image/jpg', image/jpeg"
            />
            {state?.errors?.eventImage && (
              <div className="validation-feedback">
                {state.errors.eventImage}
              </div>
            )}
          </div>
          {state?.errors?.apiError && (
            <div className="text-red-600 mb-4">{state.errors.apiError}</div>
          )}
          {state?.success && (
            <div className="text-green-600 mb-4">{state.success}</div>
          )}
          <div>
            <Button variant="default" className="mb-4" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div>
        <h1 className="text-2xl text-black font-bold mb-4">Added events</h1>
        {isError ? (
          <div>
            <h2>Something went wrong!</h2>
            <Button variant="error" onClick={() => refetch()}>
              Try again
            </Button>
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
