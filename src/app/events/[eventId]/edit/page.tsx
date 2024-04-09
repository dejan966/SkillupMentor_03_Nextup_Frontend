'use client'

import CreateUpdateEvent from '@/components/events/CreateUpdateEvent'
import { fetchEvent } from '@/lib/event'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    eventId: string
  }
}

export default function EventEdit({ params }: Props) {
  const { data: eventData, isSuccess } = useQuery({
    queryKey: ['fetchEvent'],
    queryFn: () => fetchEvent(params.eventId),
  })
  if (eventData?.data.message === 'Unauthorized') {
    return <div>Unauthorized</div>
  }

  if (isSuccess === true && !eventData?.data._id) {
    notFound()
  }

  return (
    <div>
      <CreateUpdateEvent title="Manage event" defaultValues={eventData?.data} />
    </div>
  )
}
