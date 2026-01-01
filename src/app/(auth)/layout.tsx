import Footer from '@/components/ui/Footer'

export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="body">{children}</div>
      <Footer options={'absoluteFooter'} />
    </>
  )
}
