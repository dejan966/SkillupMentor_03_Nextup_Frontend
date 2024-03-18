'use client'
import EventBlock from '@/components/events/EventBlock'
import { getAllEvents } from '@/hooks/useEvents'
import { EventType } from '@/models/event'
import Image from 'next/image'

export default function AllUpcomingEvents() {
  const { data: allEvents } = getAllEvents()
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
