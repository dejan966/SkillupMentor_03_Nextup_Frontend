'use client'

import useDeviceSize from '@/hooks/useDeviceSize'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [width] = useDeviceSize()
  const onSubmit = (event: any) => {
    event.preventDefault()
    router.push(
      `/search?location=${event.target.searchValue.value}&date=${event.target.dateValue.value}`,
    )
  }
  return (
    <main>
      <div className="grid grid-cols-2">
        <div className="grid grid-rows-3">
          <div className="pl-24">
            <div className="text-black font-bold">FIND THE BEST EVENTS</div>
            <h1 className="text-7xl font-bold">
              Are you looking for your next event?
            </h1>
          </div>
          <div className="pl-24">
            <div>sfshfdhjk</div>
            <br />
            <div className="text-black font-bold">FIND YOUR NEXT EVENT</div>
            <div>dfd</div>
            <br />
            <form onSubmit={onSubmit}>
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
          </div>
          <div className="bg-white footerDiv" style={{ width: width / 2 }}>
            <div className="flex justify-between items-center pl-24 pb-9 pr-24 pt-9">
              <Image
                src="/nextup-logo.png"
                alt="Nextup logo"
                height={100}
                width={100}
              />
              <p>All rights received | skillupmentor.com</p>
            </div>
          </div>
        </div>
        <div className="divGrid gap-6">
          <div className="col-span-2 relative">
            <Image src="/picture-1.png" alt="Picture 1" fill />
          </div>
          <div>
            <Image
              src="/picture-2.png"
              alt="Picture 2"
              height={1}
              width={241}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
