'use client'

import EventList from '@/components/events/EventList'
import Button from '@/components/ui/Button'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { fetchCurrUserCreatedEvents } from '@/lib/event'
import { SafeError } from '@/models/safeError'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function CurrUserCreatedEvents() {
  const [pageNumber, setPageNumber] = useState(1)
  const {
    data: allEvents,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['fetchCurrUserCreatedEvents', pageNumber],
    queryFn: () => fetchCurrUserCreatedEvents(pageNumber),
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
      <h1 className="text-5xl">Events</h1>
      <EventList
        pageTitle="All Events You Created"
        events={allEvents!.data}
        meta={allEvents!.meta}
        setPageNumber={setPageNumber}
        type="block"
      />
    </div>
  )
}
