'use client'

import EventList from '@/components/events/EventList'
import Button from '@/components/ui/Button'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { useAuth } from '@/contexts/AuthContext'
import { getRecentEvents, getUserUpcomingEvents } from '@/lib/event'
import { SafeError } from '@/models/safeError'
import { useQuery } from '@tanstack/react-query'

export default function UserProfile() {
  const { user } = useAuth()

  const {
    data: upcomingEvents,
    isLoading: isLoadingUpcoming,
    isError: isErrorUpcoming,
    error: errorUpcoming,
    refetch: refetchUpcoming,
  } = useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: getUserUpcomingEvents,
  })

  const {
    data: recentEvents,
    isLoading: isLoadingRecent,
    isError: isErrorRecent,
    error: errorRecent,
    refetch: refetchRecent,
  } = useQuery({
    queryKey: ['recentEvents'],
    queryFn: getRecentEvents,
  })

  if (isLoadingUpcoming || isLoadingRecent) {
    return <LoadingCircle />
  }

  if (isErrorUpcoming) {
    return (
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
    )
  }

  if (isErrorRecent) {
    return (
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
    )
  }

  return (
    <div>
      <h1 className="text-6xl text-center font-bold">
        {user?.first_name + ' ' + user?.last_name}
      </h1>
      <br />
      <div className="grid grid-cols-2 pl-24 space-x-8">
        <div>
          <h1 className="text-2xl">All upcoming events</h1>
          <EventList events={upcomingEvents!} type="card" cardIcon />
        </div>
        <div>
          <h1 className="text-2xl">Recent events</h1>
          <EventList events={recentEvents!} type="card" />
        </div>
      </div>
    </div>
  )
}
