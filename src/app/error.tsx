'use client'

import Button from '@/components/ui/Button'
import { useEffect } from 'react'

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button variant="error" className="mb-4" onClick={reset}>
        Try again
      </Button>
    </div>
  )
}

export default ErrorPage
