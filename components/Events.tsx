'use client'
import { getAllEvents } from '@/hooks/useEvents'
import { EventType } from '@/models/event'

export default function Events() {
  const { data: allEvents } = getAllEvents()
  return (
    <div>
      {allEvents?.data.map((event: EventType) => {
        return <div key={event._id}>{event.name}</div>
      })}
    </div>
  )
}
