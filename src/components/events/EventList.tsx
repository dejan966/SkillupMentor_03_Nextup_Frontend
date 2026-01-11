import { EventType } from '@/models/event'
import EventBlock from './EventBlock'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import EventCard from './EventCard'
import Link from 'next/link'
import Button from '../ui/Button'
import DivCentered from '../ui/DivCentered'
import Grid from '../ui/Grid'

interface Props {
  events: EventType[]
  type: string
  meta?: any
  loadmore?: boolean
  cardIcon?: boolean
  edit?: boolean
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>
}

export default function EventList({
  events,
  type,
  meta,
  loadmore,
  cardIcon,
  edit,
  setPageNumber,
}: Props) {
  return (
    <div>
      {type == 'block' ? (
        <Grid className="phone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-6">
          {events?.map((event: EventType) => {
            return (
              <div key={event._id} className="bg-white w-96">
                <EventBlock event={event} />
              </div>
            )
          })}
          {meta?.page > 1 && (
            <div className="group-hover:block absolute top-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft
                size={30}
                onClick={() => setPageNumber!((prev) => prev - 1)}
              />
            </div>
          )}
          {meta?.page < meta?.last_page && (
            <div className="group-hover:block absolute top-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactRight
                size={30}
                onClick={() => setPageNumber!((prev) => prev + 1)}
              />
            </div>
          )}
        </Grid>
      ) : (
        <div>
          {events?.slice(0, 4).map((event: EventType) => {
            return (
              <>
                {cardIcon !== undefined && cardIcon ? (
                  <div>
                    {edit !== undefined && edit ? (
                      <EventCard
                        key={event._id}
                        event={event}
                        typeIcon="/settingsIcon.svg"
                      />
                    ) : (
                      <EventCard
                        key={event._id}
                        event={event}
                        typeIcon="/tickIcon.svg"
                      />
                    )}
                  </div>
                ) : (
                  <EventCard key={event._id} event={event} />
                )}
              </>
            )
          })}
          {loadmore !== undefined && loadmore && (
            <DivCentered>
              <Button variant="default" className="w-28" type="button">
                <Link href={'/events/upcoming-events'}>Load more</Link>
              </Button>
            </DivCentered>
          )}
        </div>
      )}
    </div>
  )
}
