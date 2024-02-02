'use client'
import useDeviceSize from '@/hooks/useDeviceSize'
import Image from 'next/image'

export default function Home() {
  const [width, height] = useDeviceSize()
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
            <form>
              <div className="flex">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      fill="#2F3C7E"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 395.71 395.71"
                    >
                      <g>
                        <path
                          d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
		c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
		C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
		c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
                        />
                      </g>
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-s-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by location"
                    required
                  />
                </div>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      fill="none"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7"
                        stroke="#2F3C7E"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <rect
                        x="6"
                        y="12"
                        width="3"
                        height="3"
                        rx="0.5"
                        fill="#2F3C7E"
                      />
                      <rect
                        x="10.5"
                        y="12"
                        width="3"
                        height="3"
                        rx="0.5"
                        fill="#2F3C7E"
                      />
                      <rect
                        x="15"
                        y="12"
                        width="3"
                        height="3"
                        rx="0.5"
                        fill="#2F3C7E"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-e-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by date"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-800 rounded-e-lg border border-blue-800 hover:border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-500"
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
        <div className="grid grid-cols-3 gap-6">
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
