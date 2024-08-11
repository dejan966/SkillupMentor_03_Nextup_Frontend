import { SearchEvent } from '@/components/events/SearchEvent'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className="pl-24 pb-9 pt-9">
        <div className="divGrid images phone:gap-3">
          <div className="col-span-2 relative">
            <Image src="/picture-1.png" alt="Picture 1" fill />
          </div>
          <Image
            src="/picture-2.png"
            alt="Picture 2"
            height={238}
            width={238}
          />
        </div>
        <div>
          <div className="text-black font-bold">FIND THE BEST EVENTS</div>
          <h1 className="text-7xl font-bold">
            Are you looking for your next event?
          </h1>
          <div className="text-black my-7">
            Nextup is a website that allows you to create events
            {'(date, location, number of allowed people,..)'}. Other users can
            book their attendance for these events.
          </div>
          <div className="text-black font-bold">FIND YOUR NEXT EVENT</div>
          <div className="text-black">
            Search for a specific events by choosing the date and writing the
            location.
          </div>
        </div>
        <div className="searchForm w-2/3">
          <SearchEvent />
        </div>
      </div>
      <footer className="bg-white mt-32">
        <div className="flex justify-between items-center pl-24 pb-9 pr-24 pt-9">
          <Image
            src="/nextup-logo.png"
            alt="Nextup logo"
            height={100}
            width={100}
          />
          <p>All rights received | skillupmentor.com</p>
        </div>
      </footer>
    </>
  )
}
