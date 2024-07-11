'use client'

import { fetchEvent } from '@/lib/event'
import { notFound, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import LoadingCircle from '@/components/ui/LoadingCircle'

type Props = {
  params: {
    eventId: string
  }
}

export default function Event({ params }: Props) {
  const router = useRouter()
  const {
    data: eventData,
    isSuccess,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['fetchEvent'],
    queryFn: () => fetchEvent(params.eventId),
  })

  if (isSuccess === true && !eventData?.data._id) {
    notFound()
  }

  if (isError) {
    return (
      <div>
        <h2>Something went wrong!</h2>
        <button
          type="button"
          className="blue text-white h-12 w-20 rounded-xl"
          onClick={() => refetch()}
        >
          Try again
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <LoadingCircle />
      </div>
    )
  }

  return (
    <div className="pl-24 pb-16 pt-9">
      {isSuccess && (
        <div className="relative">
          <div className="images pl-4">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/events/${eventData.data.image}`}
              alt="Event image"
              height={600}
              width={785}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <div>{new Date(eventData.data.date).toLocaleDateString()}</div>
              <div>{eventData.data.hour}</div>
            </div>
            <h1 className="text-7xl font-bold">{eventData.data.name}</h1>
            <br />
            <div className="flex justify-between pb-8">
              <div className="flex justify-start">
                <Image
                  src="/locationIcon.svg"
                  alt="location icon"
                  width={20}
                  height={20}
                />
                {eventData.data.location}
              </div>
              <div className="flex justify-start">
                <Image
                  src="/avatarIcon.svg"
                  alt="avatar icon"
                  width={20}
                  height={20}
                />
                {eventData.data.max_users}
              </div>
            </div>
            <div className="font-bold">EVENT DESCRIPTION</div>
            <div className="pb-8">{eventData.data.description}</div>
            <div className="text-end">
              <button
                type="button"
                className="blue text-white h-12 w-20 rounded-xl"
                onClick={() => router.back()}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
