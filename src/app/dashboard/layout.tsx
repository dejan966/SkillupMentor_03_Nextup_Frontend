import Footer from '@/components/ui/Footer'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className='pl-24 pb-28 pt-9 pr-24'>{children}</div>
      <Footer options={'absoluteFooter'} />
    </>
  )
}
