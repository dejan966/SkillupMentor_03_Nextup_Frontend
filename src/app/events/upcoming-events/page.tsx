'use client'

import EventBlock from '@/components/events/EventBlock'
import Button from '@/components/ui/Button'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { getAllUpcomingEvents } from '@/lib/event'
import { EventType } from '@/models/event'
import { SafeError } from '@/models/safeError'
import { useQuery } from '@tanstack/react-query'

export default function AllUpcomingEvents() {
  const {
    data: allEvents,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['getAllUpcomingEvents'],
    queryFn: getAllUpcomingEvents,
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
        <Button variant="error" className="h-12 w-20" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    )
  }

  return (
    <div className="pl-24 pr-24">
      <h1 className="text-5xl">Events</h1>
      <div>All Upcoming Events</div>
      <br />
      {allEvents!.map((event: EventType) => {
        return (
          <div key={event._id} className="bg-white w-96">
            <EventBlock event={event} />
          </div>
        )
      })}
      <br />
    </div>
  )
}
