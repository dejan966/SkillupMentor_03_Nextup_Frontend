import Image from 'next/image'

interface Props {
  options?: string | null
}
export default function Footer({ options }: Props) {
  return (
    <footer className={`${options} bg-white`}>
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
