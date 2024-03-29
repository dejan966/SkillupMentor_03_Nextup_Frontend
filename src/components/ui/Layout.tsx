'use client'
import { usePageIdentification } from '@/hooks/usePageIdentification'
import Footer from './Footer'
import Navbar from './Navbar'
import Provider from '../providers/Provider'

export default function Layout({ children }: { children: React.ReactNode }) {
  usePageIdentification()
  return (
    <div className="display">
      <Navbar />
      <Provider>
        <div className="content">{children}</div>
      </Provider>
      <Footer />
    </div>
  )
}
