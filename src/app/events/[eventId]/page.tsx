'use client'
import * as API from '@/api/api'
import { useQuery } from 'react-query'
import { notFound } from 'next/navigation'
import Image from 'next/image'

type Props = {
  params: {
    eventId: string
  }
}

export default function Event({ params }: Props) {
  const { data: eventData, isSuccess } = useQuery(
    ['eventData'],
    () => API.fetchEvent(params.eventId),
    {
      refetchOnWindowFocus: false,
    },
  )

  if (eventData?.data.message === 'Unauthorized') {
    return <div>Unauthorized</div>
  }

  if (isSuccess === true && !eventData?.data._id) {
    notFound()
  }

  return (
    <div>
      <div>
        {isSuccess && (
          <div className="grid grid-cols-2 space-x-8 pl-24">
            <div>
              <div className="flex justify-between">
                <div>{eventData.data.date}</div>
                <div>{eventData.data.hour}</div>
              </div>
              <h1 className="text-7xl font-bold">{eventData.data.name}</h1>
              <br />
              <div className="flex justify-between">
                <div>{eventData.data.location}</div>
                <div>{eventData.data.max_users}</div>
              </div>
              <br />
              <br />
              <div className="font-bold">EVENT DESCRIPTION</div>
              <div>df</div>
            </div>
            <div>
              <Image
                src={`/${eventData.data.image}`}
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
