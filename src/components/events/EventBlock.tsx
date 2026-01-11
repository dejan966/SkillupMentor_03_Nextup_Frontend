import { EventType } from '@/models/event'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  event: EventType
}

export default function EventBlock({ event }: Props) {
  return (
    <div>
      <Link href={`/events/${event._id}`}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/events/${event.image}`}
          alt="Event image"
          width={322}
          height={100}
          className="w-full h-52"
        />
      </Link>
      <div className="p-3">
        <div className="text-2xl font-bold">{event.name}</div>
        <div>{moment(event.date).format('D.MM.YYYY') + ' ' + event.hour}</div>
        <br />
        <div className="flex justify-between">
          <div className="flex justify-start">
            <Image
              src="/locationIcon.svg"
              alt="location icon"
              width={20}
              height={20}
            />
            {event.location}
          </div>
          <div className="flex justify-start">
            <Image
              src="/avatarIcon.svg"
              alt="avatar icon"
              width={20}
              height={20}
            />
            {event.max_users}
          </div>
        </div>
      </div>
    </div>
  )
}
