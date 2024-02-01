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
            <h1 className="text-6xl font-bold">
              Are you looking for your next event?
            </h1>
          </div>
          <div className="pl-24">
            <div>sfshfdhjk</div>
            <br />
            <div className="text-black font-bold">FIND YOUR NEXT EVENT</div>
            <div>dfd</div>
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
