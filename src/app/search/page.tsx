'use client'

import { getAllUpcomingEvents } from '@/lib/event'
import EventList from '@/components/events/EventList'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { SearchEvent } from '@/components/events/SearchEvent'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { SafeError } from '@/models/safeError'
import Button from '@/components/ui/Button'

const SearchPage = () => {
  const {
    data: upcomingEvents,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['upcomingEvents', 1],
    queryFn: () => getAllUpcomingEvents(1),
    retry: false,
    throwOnError: false,
  })

  const [pageNumber, setPageNumber] = useState(1)
  const searchParams = useSearchParams()
  const searchLocation = searchParams.get('location') ?? ''
  const searchDate = searchParams.get('date')

  if (isLoading) {
    return <LoadingCircle />
  }

  return (
    <div className="px-24 pt-[30px] pb-9">
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
      {isError == false ? (
        <EventList
          pageTitle="All Upcoming Events"
          events={upcomingEvents!.data}
          type="card"
          linkTo="/events/upcoming-events"
          loadmore
        />
      ) : (
        <div>
          <h2>{(error as SafeError).message}</h2>
          <Button
            variant="error"
            className="h-12 w-20"
            onClick={() => refetch()}
          >
            Try again
          </Button>
        </div>
      )}
    </div>
  )
}

export default SearchPage
