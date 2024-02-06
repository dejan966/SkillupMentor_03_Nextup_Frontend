'use client'
import { getAllEvents } from '@/hooks/useEvents'
import { EventType } from '@/models/event'
import Image from 'next/image'

export default function Events() {
  const { data: allEvents } = getAllEvents()
  return (
    <div>
      <div>
        {allEvents?.data.map((event: EventType) => {
          return (
            <div key={event._id}>
              <Image
                src={`/${event.image}`}
                alt="Event image"
                width={123}
                height={123}
              />
              <div>{event.name}</div>
              <div>{event.date + ' ' + event.hour}</div>
              <div className="flex justify-between">
                <div>{event.location}</div>
                <div>{event.max_users}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
