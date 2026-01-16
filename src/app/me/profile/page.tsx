'use client'

import EventList from '@/components/events/EventList'
import Button from '@/components/ui/Button'
import Grid from '@/components/ui/Grid'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { useAuth } from '@/contexts/AuthContext'
import {
  fetchCurrUserRecentEvents,
  fetchCurrUserUpcomingEvents,
} from '@/lib/event'
import { SafeError } from '@/models/safeError'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function UserProfile() {
  const { user } = useAuth()
  const [pageNumber, setPageNumber] = useState(1)

  const {
    data: upcomingEvents,
    isLoading: isLoadingUpcoming,
    isError: isErrorUpcoming,
    error: errorUpcoming,
    refetch: refetchUpcoming,
  } = useQuery({
    queryKey: ['upcomingEvents', 1],
    queryFn: () => fetchCurrUserUpcomingEvents(1),
  })

  const {
    data: recentEvents,
    isLoading: isLoadingRecent,
    isError: isErrorRecent,
    error: errorRecent,
    refetch: refetchRecent,
  } = useQuery({
    queryKey: ['fetchCurrUserRecentEvents', 1],
    queryFn: () => fetchCurrUserRecentEvents(1),
  })

  if (isLoadingUpcoming || isLoadingRecent) {
    return <LoadingCircle />
  }

  return (
    <div className="mt-4">
      <h1 className="text-6xl text-center font-bold">{user?.full_name}</h1>
      <br />
      <Grid className="phone:grid-cols-1 tablet:grid-cols-2 pl-24 space-x-8">
        <div>
          {isErrorUpcoming ? (
            <div>
              <h2>{(errorUpcoming as SafeError).message}</h2>
              <Button
                variant="error"
                className="h-12 w-20"
                onClick={() => refetchUpcoming()}
              >
                Try again
              </Button>
            </div>
          ) : (
            <EventList
              pageTitle="All Your Upcoming Events"
              events={upcomingEvents!.data}
              type="card"
              cardIcon
              linkTo="/me/upcoming-events"
              loadmore
            />
          )}
        </div>
        <div>
          {isErrorRecent ? (
            <div>
              <h2>{(errorRecent as SafeError).message}</h2>
              <Button
                variant="error"
                className="h-12 w-20"
                onClick={() => refetchRecent()}
              >
                Try again
              </Button>
            </div>
          ) : (
            <EventList
              pageTitle="All Your Recent Events"
              events={recentEvents!.data}
              type="card"
              linkTo="/me/recent-events"
              loadmore
            />
          )}
        </div>
      </Grid>
    </div>
  )
}
