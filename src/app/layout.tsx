import { Poppins } from 'next/font/google'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import '@/styles/globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: '300' })

export const metadata = {
  title: 'Home',
  description: 'Home page made with NextJS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <div className="display">
          <Navbar />
          <div className="content">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
