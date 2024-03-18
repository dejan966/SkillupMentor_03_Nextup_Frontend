'use client'
import EventCard from '@/components/events/EventCard'
import EventList from '@/components/events/EventList'
import { getRecentEvents, getUserUpcomingEvents } from '@/hooks/useEvents'
import { EventType } from '@/models/event'
import authStore from '@/stores/auth.store'

export default function UserProfile() {
  const { data: upcomingEvents } = getUserUpcomingEvents()
  console.log(upcomingEvents)
  const { data: recentEvents } = getRecentEvents()
  return (
    <div>
      <h1 className="text-6xl text-center font-bold">
        {authStore.user &&
          authStore.user.first_name + ' ' + authStore.user.last_name}
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
