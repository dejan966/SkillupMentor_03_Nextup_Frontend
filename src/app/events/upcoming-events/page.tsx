'use client'

import EventList from '@/components/events/EventList'
import Button from '@/components/ui/Button'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { getAllUpcomingEvents } from '@/lib/event'
import { SafeError } from '@/models/safeError'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function AllUpcomingEvents() {
  const [pageNumber, setPageNumber] = useState(1)
  const {
    data: allEvents,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['getAllUpcomingEvents', pageNumber],
    queryFn: () => getAllUpcomingEvents(pageNumber),
    retry: false,
    throwOnError: false,
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return <LoadingCircle />
  }

  if (isError) {
    return (
      <div>
        <h2>{(error as SafeError).message}</h2>
        <Button variant="error" className="h-12 w-20" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    )
  }

  return (
    <div className="pl-24 pr-24">
      <EventList
        pageTitle="All Upcoming Events"
        events={allEvents!.data}
        meta={allEvents!.meta}
        setPageNumber={setPageNumber}
        type="block"
      />
    </div>
  )
}
