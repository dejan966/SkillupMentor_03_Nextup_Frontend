'use client'

import EventBlock from '@/components/events/EventBlock'
import { fetchEvents } from '@/lib/event'
import { EventType } from '@/models/event'
import { useQuery } from '@tanstack/react-query'

export default function AllUpcomingEvents() {
  const {
    data: allEvents,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['fetchEvent'],
    queryFn: fetchEvents,
  })
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
