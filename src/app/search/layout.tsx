import Provider from '@/components/providers/Provider'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Provider>{children}</Provider>
}
