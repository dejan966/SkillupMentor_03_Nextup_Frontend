export const metadata = {
  title: 'Event',
  description: 'Event page made with NextJS',
}

export default function EventLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
