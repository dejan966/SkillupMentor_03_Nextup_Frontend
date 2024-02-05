import { routes } from '@/enums/routesConstants'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header>
      <nav className="flex justify-between items-center pl-24 pb-9 pr-24 pt-9">
        <Link href={routes.HOME}>
          <Image src="/cgp.png" alt="Nextup logo" height={30} width={30} />
        </Link>
        <div className="space-x-8">
          <a href={routes.HOME}>Home</a>
          <a href="#">Search</a>
        </div>
        <div className="space-x-8">
          <a href={routes.LOGIN}>Login</a>
          <button
            type="button"
            className="bg-blue-800 text-white h-10 w-28 rounded-full hover:bg-blue-500"
          >
            <a href={routes.SIGNUP}>Sign up</a>
          </button>
        </div>
      </nav>
    </header>
  )
}
