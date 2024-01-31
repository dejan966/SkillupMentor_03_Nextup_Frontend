import { routes } from '@/enums/routesConstants'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg p-24">
        <Link href={routes.HOME}>
          <Image src="/cgp.png" alt="Nextup logo" height={30} width={30} />
        </Link>
      </nav>
    </header>
  )
}
