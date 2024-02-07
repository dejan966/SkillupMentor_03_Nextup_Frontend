'use client'
import * as API from '@/api/api'
import CreateUpdateEvent from '@/components/events/CreateUpdateEvent'
import { notFound } from 'next/navigation'
import { useQuery } from 'react-query'

type Props = {
  params: {
    eventId: string
  }
}

export default function EventEdit({ params }: Props) {
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
      <CreateUpdateEvent title="Manage event" event={eventData?.data} />
    </div>
  )
}
