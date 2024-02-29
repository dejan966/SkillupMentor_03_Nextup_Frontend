'use client'
import { getAllEvents } from '@/hooks/useEvents'
import { EventType } from '@/models/event'
import Image from 'next/image'

export default function EventBlock() {
  const { data: allEvents } = getAllEvents()
  return (
    <div className="divGrid gap-4">
      {allEvents?.data.map((event: EventType) => {
        return (
          <div key={event._id} className="bg-white w-96">
            <Image
              src={`/${event.image}`}
              alt="Event image"
              width={322}
              height={100}
              className="w-full h-52"
            />
            <div className="p-3">
              <div className="text-2xl font-bold">{event.name}</div>
              <div>
                {new Date(event.date).toLocaleDateString() + ' ' + event.hour}
              </div>
              <br />
              <div className="flex justify-between">
                <div className="flex justify-start">
                  <Image
                    src="/locationIcon.svg"
                    alt="location icon"
                    width={20}
                    height={20}
                  />
                  {event.location}
                </div>
                <div className="flex justify-start">
                  <Image
                    src="/avatarIcon.svg"
                    alt="avatar icon"
                    width={20}
                    height={20}
                  />
                  {event.max_users}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
