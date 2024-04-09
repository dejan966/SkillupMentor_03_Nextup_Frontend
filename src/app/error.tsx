'use client'

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
      <button className="blueButton" onClick={reset}>
        Try again
      </button>
    </div>
  )
}

export default ErrorPage
