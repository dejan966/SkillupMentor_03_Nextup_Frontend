import Provider from '@/components/providers/Provider'

export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Provider>
        <div>{children}</div>
      </Provider>
    </>
  )
}
