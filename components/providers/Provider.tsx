import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import RootLayout from '@/src/app/layout'

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout>{children}</RootLayout>
    </QueryClientProvider>
  )
}
