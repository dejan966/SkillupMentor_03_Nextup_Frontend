import Provider from '@/components/providers/Provider'

export default function EventsLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <Provider>{children}</Provider>
}
