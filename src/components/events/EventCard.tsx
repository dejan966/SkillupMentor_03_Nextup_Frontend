import { EventType } from '@/models/event'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../ui/Button'

interface Props {
  event: EventType
  typeIcon?: string
}

export default function EventCard({ event, typeIcon }: Props) {
  return (
    <div className="divGrid rounded-xl bg-white h-20 mr-4 mb-4">
      <div className="flex justify-center items-center">
        <div className="text-lg text-black font-bold">
          {event.date + ' ' + event.hour}
        </div>
      </div>
      <div className="text-lg text-black font-bold centered">
        {event.location}
      </div>
      {typeIcon ? (
        <div className="centered">
          <Button
            variant="error"
            className="flex justify-center items-center h-12 w-14 row-span-2"
          >
            <Link href={`/events/${event._id}/edit`}>
              <Image src={typeIcon} alt="Icon" height={20} width={20} />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="centered">
          <Button variant="default" className="mb-4" type="button">
            <Link href={`/events/${event._id}`}>Check</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
