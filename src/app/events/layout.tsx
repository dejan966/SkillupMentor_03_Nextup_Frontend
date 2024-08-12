import Footer from '@/components/ui/Footer'

export default function EventAdd({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="pb-[120px]">{children}</div>
      <Footer options={'absoluteFooter'} />
    </>
  )
}
