import Footer from '@/components/ui/Footer'

export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <Footer options={'absoluteFooter'} />
    </>
  )
}
