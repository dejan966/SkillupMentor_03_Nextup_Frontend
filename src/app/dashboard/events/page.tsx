'use client'

import { useQuery } from '@tanstack/react-query'
import { deleteEvent, fetchEvents } from '@/lib/event'
import EventTable from '@/components/events/EventTable'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { SafeError } from '@/models/safeError'
import LoadingCircle from '@/components/ui/LoadingCircle'
import DivTable from '@/components/ui/DivTable'
import Link from 'next/link'

export default function AdminPanel() {
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
    refetchOnWindowFocus: false,
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

  if (isLoading) {
    return <LoadingCircle />
  }

  if (isError) {
    return (
      <div>
        <h2>{(error as SafeError).message}</h2>
      </div>
    )
  }

  return (
    <>
      <div>{apiError}</div>
      <div className="flex justify-end mb-4">
        <Button className="justify-center w-28">
          <Link href="/events/add">Create event</Link>
        </Button>
      </div>
      <DivTable meta={allEvents!.meta} setPageNumber={setPageNumber}>
        <table className="min-w-full divide-y divide-gray-300">
          <EventTable events={allEvents!.data} handleDelete={handleDelete} />
        </table>
      </DivTable>
    </>
  )
}
