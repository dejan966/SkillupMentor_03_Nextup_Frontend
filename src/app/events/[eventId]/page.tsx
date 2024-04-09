'use client'

import { fetchEvent } from '@/lib/event'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

type Props = {
  params: {
    eventId: string
  }
}

export default function Event({ params }: Props) {
  const { data: eventData, isSuccess } = useQuery({
    queryKey: ['fetchEvent'],
    queryFn: () => fetchEvent(params.eventId),
  })
  //const { data: eventData, isSuccess } = await fetchEvent(params.eventId)

  if (isSuccess === true && !eventData?.data._id) {
    notFound()
  }

  return (
    <div>
      <div>
        {isSuccess && (
          <div className="grid grid-cols-2 space-x-8 pl-24">
            <div className="grid-rows-5">
              <div className="flex justify-between">
                <div>{new Date(eventData.data.date).toLocaleDateString()}</div>
                <div>{eventData.data.hour}</div>
              </div>
              <h1 className="text-7xl font-bold">{eventData.data.name}</h1>
              <br />
              <div className="flex justify-between">
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
              <br />
              <br />
              <div className="font-bold">EVENT DESCRIPTION</div>
              <div>{eventData.data.description}</div>
              <br />
              <br />
              <div className="text-end">
                <button
                  type="button"
                  className="blue text-white h-12 w-20 rounded-xl"
                >
                  Back
                </button>
              </div>
            </div>
            <div>
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/events/${eventData.data.image}`}
                alt="Event image"
                width={730}
                height={630}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
