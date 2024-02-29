'use client'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import EventBlock from '@/components/events/EventBlock'
import { getUpcomingEvents } from '@/hooks/useEvents'
import EventCard from '@/components/events/EventCard'
import { EventType } from '@/models/event'

export default function SearchPage() {
  const { data: upcomingEvents } = getUpcomingEvents()

  const searchParams = useSearchParams()
  const search = searchParams.get('q')

  const onSubmit = (event: any) => {
    event.preventDefault()
  }
  return (
    <div className="px-24">
      <div>SEARCH FOR EVENTS</div>
      <h1 className="text-6xl mb-8">What is next?</h1>
      <form onSubmit={onSubmit} className="mb-8">
        <div className="flex">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Image
                src="/locationIcon.svg"
                alt="Location icon"
                height={20}
                width={20}
              />
            </div>
            <input
              type="search"
              name="searchValue"
              id="searchValue"
              className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-s-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by location"
              required
            />
          </div>
          <div className="relative w-full">
            <input
              type="date"
              name="dateValue"
              id="dateValue"
              defaultValue={new Date().toISOString().substring(0, 10)}
              min="2018-01-01"
              max="2031-12-31"
              className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-e-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="blue absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white rounded-e-lg border border-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-500"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      <EventBlock />
      <h1 className="mt-8 mb-2 text-4xl text-black">Events</h1>
      <div className="mb-6">All upcoming events</div>
      {upcomingEvents?.data.slice(0, 4).map((event: EventType) => {
        return (
          <EventCard key={event._id} event={event} typeIcon="/tickIcon.svg" />
        )
      })}
      <button className="blueButton" type="button">
        Load more
      </button>
    </div>
  )
}
