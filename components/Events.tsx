'use client'
import { getAllEvents } from '@/hooks/useEvents'

export default function Events() {
  const { data: allEvents } = getAllEvents()
  return (
    <div>
      {allEvents?.data.map((event: any) => {
        return <div key={event._id}>{event.name}</div>
      })}
    </div>
  )
}
