'use client'
import { usePageIdentification } from '@/hooks/usePageIdentification'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  usePageIdentification()
  return (
    <div className="display">
      <Navbar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  )
}
