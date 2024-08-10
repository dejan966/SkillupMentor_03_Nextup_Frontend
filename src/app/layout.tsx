import { Poppins } from 'next/font/google'
import Navbar from '@/components/ui/Navbar'
import '@/styles/globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: '300' })

export const metadata = {
  title: 'Nextup',
  description: 'Page made with NextJS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={poppins.className}>
        <main className="holder">
          <Navbar />
          <div className="">{children}</div>
        </main>
      </body>
    </html>
  )
}
