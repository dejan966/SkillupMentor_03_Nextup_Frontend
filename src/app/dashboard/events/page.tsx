'use client'

import { useQuery } from '@tanstack/react-query'
import { deleteEvent, fetchEvents } from '@/lib/event'
import { notFound } from 'next/navigation'
import EventTable from '@/components/events/EventTable'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { SafeError } from '@/models/safeError'
import LoadingCircle from '@/components/ui/LoadingCircle'

export default function AdminPanel() {
  const { user } = useAuth()

  const [pageNumber, setPageNumber] = useState(1)
  const [apiError, setApiError] = useState('')

  const {
    data: allEvents,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['fetchEvents', pageNumber],
    queryFn: async () => fetchEvents(pageNumber),
    retry: false,
    throwOnError: false,
  })

  const handleDelete = async (_id: string) => {
    try {
      await deleteEvent(_id)
      refetch()
    } catch (error) {
      const safeError = error as SafeError
      setApiError(safeError.message)
    }
  }

  if (user) {
    if (user.role.name !== 'ADMIN') {
      notFound()
    }
  }

  if (isLoading) {
    return <LoadingCircle />
  }

  if (isError) {
    return (
      <div>
        <h2>{(error as SafeError).message}</h2>
        <Button variant="error" className="h-12 w-20" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    )
  }

  return (
    <>
      <EventTable
        events={allEvents!.data}
        setPageNumber={setPageNumber}
        meta={allEvents!.meta}
        handleDelete={handleDelete}
      />
      <div>{apiError}</div>
    </>
  )
}
