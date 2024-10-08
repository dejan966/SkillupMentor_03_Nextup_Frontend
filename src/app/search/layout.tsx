import Provider from '@/components/providers/Provider'
import Footer from '@/components/ui/Footer'
import Image from 'next/image'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Provider>{children}</Provider>
      <Footer />
    </>
  )
}
