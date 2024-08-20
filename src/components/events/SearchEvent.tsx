'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { searchEvents } from '@/lib/event'
import { useEffect, useState } from 'react'
import EventList from './EventList'

interface Props {
  location?: string | null
  date?: string | null
  pageNumber?: number | null
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>
}

export function SearchEvent({
  location,
  date,
  pageNumber,
  setPageNumber,
}: Props) {
  const router = useRouter()
  const [searchEvent, setSearchEvent] = useState<any>([])

  const fetchEvents = async () => {
    const res = await searchEvents(location!, date!, pageNumber!)
    setSearchEvent(res?.data)
  }

  useEffect(() => {
    if (date) {
      fetchEvents()
    }
  }, [location, date, pageNumber])

  const onSubmit = (event: any) => {
    event.preventDefault()
    router.push(
      `/search?location=${event.target.searchValue.value}&date=${event.target.dateValue.value}`,
    )
  }

  return (
    <>
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
      {searchEvent && (
        <EventList
          events={searchEvent?.data}
          type="block"
          meta={searchEvent?.meta}
          setPageNumber={setPageNumber}
        />
      )}
    </>
  )
}
