import { EventType } from '@/models/event'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  event: EventType
  typeIcon?: string
}

export default function EventCard({ event, typeIcon }: Props) {
  return (
    <div className="divGrid rounded-xl bg-white h-20 mr-4 mb-4">
      <div className="flex justify-center items-center">
        <div className="text-lg text-black font-bold">
          {event.date.substring(0, 10) + ' ' + event.hour}
        </div>
      </div>
      <div className="text-lg text-black font-bold centered">
        {event.location}
      </div>
      {typeIcon ? (
        <div className="centered">
          <button
            type="button"
            className="blue centered rounded-xl h-12 w-14 row-span-2"
          >
            <Link href={`/events/${event._id}/edit`}>
              <Image src={typeIcon} alt="Icon" height={20} width={20} />
            </Link>
          </button>
        </div>
      ) : (
        <div className="centered">
          <button type="button" className="blueButton">
            <Link href={`/events/${event._id}`}>Check</Link>
          </button>
        </div>
      )}
    </div>
  )
}
