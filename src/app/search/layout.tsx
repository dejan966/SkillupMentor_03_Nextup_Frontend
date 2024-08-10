import Provider from '@/components/providers/Provider'
import Footer from '@/components/ui/Footer'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Provider>
      {children}
      <Footer />
    </Provider>
  )
}
