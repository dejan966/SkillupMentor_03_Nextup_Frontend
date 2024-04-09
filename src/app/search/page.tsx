'use client'

import { useSearchParams } from 'next/navigation'
import { getAllUpcomingEvents } from '@/lib/event'
import EventList from '@/components/events/EventList'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { searchEvents } from '@/lib/event'

const SearchPage = () => {
  const {
    data: upcomingEvents,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: getAllUpcomingEvents,
  })
  const [pageNumber, setPageNumber] = useState(1)

  const searchParams = useSearchParams()
  const searchLocation = searchParams.get('location')
  const searchDate = searchParams.get('date')

  const { data: searchEvent, isError: isLoadingError } = useQuery({
    queryKey: ['searchEvents', pageNumber],
    queryFn: () => searchEvents(searchLocation!, searchDate!, pageNumber),
  })

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

export default SearchPage
