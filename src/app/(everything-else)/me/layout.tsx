import Provider from '@/components/providers/Provider'

export default function UsersLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <Provider>{children}</Provider>
}
