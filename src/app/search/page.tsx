'use client'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import EventBlock from '@/components/events/EventBlock'
import { getAllUpcomingEvents } from '@/hooks/useEvents'
import EventCard from '@/components/events/EventCard'
import { EventType } from '@/models/event'

export default function SearchPage() {
  const { data: upcomingEvents } = getAllUpcomingEvents()

  const searchParams = useSearchParams()
  const searchLocation = searchParams.get('location')
  const searchDate = searchParams.get('date')

  return (
    <div className="px-24 pt-9 pb-9">
      <EventBlock />
      <h1 className="mt-8 mb-2 text-4xl text-black">Events</h1>
      <div className="mb-6">All upcoming events</div>
      {upcomingEvents?.data.slice(0, 4).map((event: EventType) => {
        return (
          <EventCard key={event._id} event={event} typeIcon="/tickIcon.svg" />
        )
      })}
      <div className="centered">
        <button
          className="bg-blue-800 hover:bg-blue-500 text-white rounded-full h-10 w-28"
          type="button"
        >
          Load more
        </button>
      </div>
    </div>
  )
}
