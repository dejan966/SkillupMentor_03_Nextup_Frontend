'use client'

import { getAllUpcomingEvents } from '@/lib/event'
import EventList from '@/components/events/EventList'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { SearchEvent } from '@/components/events/SearchEvent'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

const SearchPage = () => {
  const { data: upcomingEvents } = useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: getAllUpcomingEvents,
  })

  const [pageNumber, setPageNumber] = useState(1)
  const searchParams = useSearchParams()
  const searchLocation = searchParams.get('location') ?? ''
  const searchDate = searchParams.get('date')

  return (
    <div className="px-24 pt-9 pb-9">
      <div className="searchImage">
        <Image
          src="/background-search.png"
          alt="Background image"
          layout="fill"
        />
      </div>
      <div>
        <div>SEARCH FOR EVENTS</div>
        <h1 className="text-6xl mb-8">What is next?</h1>
        <SearchEvent
          location={searchLocation}
          date={searchDate}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
      <h1 className="mt-8 mb-2 text-4xl text-black">Events</h1>
      <div className="mb-6">All upcoming events</div>
      <EventList events={upcomingEvents?.data} type="card" loadmore />
    </div>
  )
}

export default SearchPage
