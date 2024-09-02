'use client'

import CreateUpdateEvent from '@/components/events/CreateUpdateEvent'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { fetchEvent } from '@/lib/event'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    eventId: string
  }
}

export default function EventEdit({ params }: Props) {
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

  if (eventData?.statusText === 'Unauthorized') {
    return <div>Unauthorized</div>
  }

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
    <CreateUpdateEvent title="Manage event" defaultValues={eventData?.data} />
  )
}
