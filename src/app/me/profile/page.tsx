import EventCard from '@/components/events/EventCard'
import { EventType } from '@/models/event'
import authStore from '@/stores/auth.store'

export default function UserProfile() {
  return (
    <div>
      <h1 className="text-4xl text-center font-bold">
        {authStore?.user?.first_name + ' ' + authStore?.user?.last_name}
      </h1>
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl">All upcoming events</h1>
          {/* {currUser?.data.created_events.slice(0, 4).map((event: EventType) => {
            return (
              <EventCard
                key={event._id.toString()}
                event={event}
                typeIcon="/tickIcon.svg"
              />
            )
          })} */}
        </div>
        <div>
          <h1>Recent events</h1>
        </div>
      </div>
    </div>
  )
}
