import Provider from '@/components/providers/Provider'
import Footer from '@/components/ui/Footer'

export default function UsersLayout({
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
