import { EventType } from '@/models/event'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../ui/Button'
import DivCentered from '../ui/DivCentered'
import Grid from '../ui/Grid'

interface Props {
  event: EventType
  typeIcon?: string
}

export default function EventCard({ event, typeIcon }: Props) {
  return (
    <Grid className="phone:h-40 tablet:grid-cols-3 tablet:h-20 rounded-xl bg-white my-4">
      <DivCentered>
        <div className="text-lg text-black font-bold">
          {event.date + ' ' + event.hour}
        </div>
      </DivCentered>
      <DivCentered className="text-lg text-black font-bold">
        {event.location}
      </DivCentered>
      {typeIcon ? (
        <DivCentered>
          <Button
            variant="error"
            className="flex justify-center items-center h-12 w-14 row-span-2"
          >
            <Link href={`/events/${event._id}/edit`}>
              <Image src={typeIcon} alt="Icon" height={20} width={20} />
            </Link>
          </Button>
        </DivCentered>
      ) : (
        <DivCentered>
          <Button variant="default" className="mb-4" type="button">
            <Link href={`/events/${event._id}`}>Check</Link>
          </Button>
        </DivCentered>
      )}
    </Grid>
  )
}
