'use client'
import useDeviceSize from '@/hooks/useDeviceSize'
import Image from 'next/image'

export default function Footer() {
  const [width, height] = useDeviceSize()
  console.log(width)
  return (
    <footer className="bg-white" style={{ width: width / 2 }}>
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
  )
}
