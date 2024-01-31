'use client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <div className="display">{children}</div>
    </QueryClientProvider>
  )
}