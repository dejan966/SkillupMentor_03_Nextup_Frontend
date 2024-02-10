import { EventType } from '@/models/event'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  event: EventType
  type?: string
}

export default function EventCard({ event, type }: Props) {
  return (
    <div className="grid grid-cols-3 rounded-xl bg-white h-20 m-4">
      <div className="flex justify-center items-center">
        <div className="text-lg text-black font-bold">{event.date}</div>
        <div className="text-black">{event.hour}</div>
      </div>
      <div className="text-lg text-black font-bold flex justify-center items-center">
        {event.location}
      </div>
      {type && type === 'created_events' ? (
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="bg-blue-800 hover:bg-blue-500 flex justify-center items-center rounded-xl h-12 w-14 row-span-2"
          >
            <Link href={`/events/${event._id}/edit`}>
              <Image
                src="/settingsIcon.svg"
                alt="Setting icon"
                height={20}
                width={20}
              />
            </Link>
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="bg-blue-800 hover:bg-blue-500 flex justify-center items-center rounded-xl h-12 w-14 row-span-2"
          >
            <Image src="/tickIcon.svg" alt="Tick icon" height={20} width={20} />
          </button>
        </div>
      )}
    </div>
  )
}
