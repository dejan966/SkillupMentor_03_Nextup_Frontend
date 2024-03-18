'use client'
import { useSearchParams } from 'next/navigation'
import { getAllUpcomingEvents } from '@/hooks/useEvents'
import EventCard from '@/components/events/EventCard'
import { EventType } from '@/models/event'
import { useQuery } from 'react-query'
import * as API from '@/api/api'
import { useState } from 'react'
import EventList from '@/components/events/EventList'

export default function SearchPage() {
  const { data: upcomingEvents } = getAllUpcomingEvents()
  const [pageNumber, setPageNumber] = useState(1)

  const searchParams = useSearchParams()
  const searchLocation = searchParams.get('location')
  const searchDate = searchParams.get('date')

  const { data: searchEvent } = useQuery(
    ['searchEvents', pageNumber],
    () => API.searchEvents(searchLocation!, searchDate!, pageNumber),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )

  return (
    <div className="px-24 pt-9 pb-9">
      <EventList
        events={searchEvent?.data.data}
        type="block"
        meta={searchEvent?.data.meta}
      />
      <h1 className="mt-8 mb-2 text-4xl text-black">Events</h1>
      <div className="mb-6">All upcoming events</div>
      <EventList events={upcomingEvents?.data} type="card" loadmore />
    </div>
  )
}
