'use client'
import CreateUpdateEvent from '@/components/events/CreateUpdateEvent'
import { getEvent } from '@/hooks/useEvents'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    eventId: string
  }
}

export default function EventEdit({ params }: Props) {
  const { data: eventData, isSuccess } = getEvent(params.eventId)

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
