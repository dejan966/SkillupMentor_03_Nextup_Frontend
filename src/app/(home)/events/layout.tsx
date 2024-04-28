import Provider from '@/components/providers/Provider'

export const metadata = {
  title: 'Event',
  description: 'Event page made with NextJS',
}

export default function EventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Provider>{children}</Provider>
}
