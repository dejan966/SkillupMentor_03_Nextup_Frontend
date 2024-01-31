import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="flex justify-between p-24">
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
