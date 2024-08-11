import { EventType } from '@/models/event'
import EventBlock from './EventBlock'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import EventCard from './EventCard'

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
  setPageNumber
}: Props) {
  return (
    <div>
      {type == 'block' ? (
        <div className="grid gap-6 phone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 relative">
          {events?.map((event: EventType) => {
            return (
              <div key={event._id} className="bg-white w-96">
                <EventBlock event={event} />
              </div>
            )
          })}
          {meta?.page > 1 && (
            <div className="group-hover:block absolute top-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft size={30} onClick={() => setPageNumber!((prev) => prev - 1)} />
            </div>
          )}
          {meta?.page < meta?.last_page && (
            <div className="group-hover:block absolute top-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactRight size={30} onClick={() => setPageNumber!((prev) => prev + 1)} />
            </div>
          )}
        </div>
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
            <div className="centered">
              <button
                className="bg-blue-800 hover:bg-blue-500 text-white rounded-full h-10 w-28"
                type="button"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
