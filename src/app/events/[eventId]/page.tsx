'use client'

import { fetchEvent, bookUserD } from '@/lib/event'
import { notFound, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { StatusCode } from '@/constants/errorConstants'
import { routes } from '@/constants/routesConstants'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { SafeError } from '@/models/safeError'

type Props = {
  params: {
    eventId: string
  }
}

export default function Event({ params }: Props) {
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const {
    data: eventData,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['fetchEvent'],
    queryFn: () => fetchEvent(params.eventId),
    retry: false,
    throwOnError: false,
  })

  if (isLoading) {
    return <LoadingCircle />
  }

  if (isError) {
    return (
      <div>
        <h2>{(error as SafeError).message}</h2>
        <Button
          type="button"
          className="h-12 w-20 rounded-none rounded-xl"
          onClick={() => refetch()}
        >
          Try again
        </Button>
      </div>
    )
  }

  if (isSuccess === true && !eventData._id) {
    notFound()
  }

  const bookUser = async () => {
    try {
      await bookUserD(eventData!._id)
      setApiError('Event successfully booked.')
    } catch (error) {
      const safeError = error as SafeError
      setApiError(safeError.message)
      setShowError(true)
    }
  }

  return (
    <div className="pl-24 pb-16 pt-9">
      <div className="relative">
        <div className="images pl-4">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/events/${eventData!.image}`}
            alt="Event image"
            className="img"
          />
        </div>
        <div>
          <div className="flex justify-between">
            <div>{new Date(eventData!.date).toLocaleDateString()}</div>
            <div>{eventData!.hour}</div>
          </div>
          <h1 className="text-7xl font-bold">{eventData!.name}</h1>
          <br />
          <div className="flex justify-between pb-8">
            <div className="flex justify-start">
              <Image
                src="/locationIcon.svg"
                alt="location icon"
                width={20}
                height={20}
              />
              {eventData!.location}
            </div>
            <div className="flex justify-start">
              <Image
                src="/avatarIcon.svg"
                alt="avatar icon"
                width={20}
                height={20}
              />
              {eventData!.max_users}
            </div>
          </div>
          <div className="font-bold">EVENT DESCRIPTION</div>
          <div className="pb-8">{eventData!.description}</div>
          <div className="text-end">
            {user ? (
              <Button variant="error" className="h-12 w-20" onClick={bookUser}>
                Book
              </Button>
            ) : (
              <Button
                variant="error"
                className="h-12 w-20"
                onClick={() => router.back()}
              >
                Back
              </Button>
            )}
          </div>
        </div>
      </div>
      <div>{apiError}</div>
    </div>
  )
}
