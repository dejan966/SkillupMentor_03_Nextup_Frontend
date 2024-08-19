'use client'

import EventBlock from '@/components/events/EventBlock'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { getAllUpcomingEvents } from '@/lib/event'
import { EventType } from '@/models/event'
import { useQuery } from '@tanstack/react-query'

export default function AllUpcomingEvents() {
  const {
    data: allEvents,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['getAllUpcomingEvents'],
    queryFn: getAllUpcomingEvents,
  })

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
    <div className="pl-24 pr-24">
      <h1 className="text-5xl">Events</h1>
      <div>All Upcoming Events</div>
      <br />
      {allEvents?.data.map((event: EventType) => {
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
