import Provider from '@/components/providers/Provider'
import Footer from '@/components/ui/Footer'

export default function EventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Provider>
        <div className="">{children}</div>
      </Provider>{' '}
      {/**body */}
      {/* <Footer options={'footer'} /> */}
    </>
  )
}
