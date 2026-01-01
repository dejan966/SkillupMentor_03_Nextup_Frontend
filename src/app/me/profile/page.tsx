'use client'

import EventList from '@/components/events/EventList'
import { useAuth } from '@/contexts/AuthContext'
import { getRecentEvents, getUserUpcomingEvents } from '@/lib/event'
import { useQuery } from '@tanstack/react-query'

export default function UserProfile() {
  const { data: upcomingEvents } = useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: getUserUpcomingEvents,
  })

  const { data: recentEvents } = useQuery({
    queryKey: ['recentEvents'],
    queryFn: getRecentEvents,
  })

  const { user } = useAuth()

  return (
    <div>
      <h1 className="text-6xl text-center font-bold">
        {user && user.first_name + ' ' + user.last_name}
      </h1>
      <br />
      <div className="grid grid-cols-2 pl-24 space-x-8">
        <div>
          <h1 className="text-2xl">All upcoming events</h1>
          <EventList events={upcomingEvents?.data} type="card" cardIcon />
        </div>
        <div>
          <h1 className="text-2xl">Recent events</h1>
          <EventList events={recentEvents?.data} type="card" />
        </div>
      </div>
    </div>
  )
}
