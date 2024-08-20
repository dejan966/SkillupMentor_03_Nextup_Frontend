'use client'

import useFirebaseAuth from '@/hooks/firebase/useFirebaseAuth'
import { useQuery } from '@tanstack/react-query'
import { deleteEvent, fetchEvents } from '@/lib/event'
import { notFound } from 'next/navigation'
import { fetchCurrUser } from '@/lib/user'
import EventTable from '@/components/events/EventTable'
import { useEffect, useState } from 'react'
import { StatusCode } from '@/enums/errorConstants'

export default function AdminPanel() {
  const [token] = useFirebaseAuth()
  const [pageNumber, setPageNumber] = useState(1)
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const {
    data: allEvents,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['fetchEvents', pageNumber],
    queryFn: async () => {
      return await fetchEvents(pageNumber)
    },
  })

  const { data: currUser } = useQuery({
    queryKey: ['currUser'],
    queryFn: async () => {
      let data
      if (token !== '')
        data = await fetchCurrUser({
          headers: { Authorization: `Bearer ${token}` },
        })
      else data = await fetchCurrUser()
      return data
    },
  })

  const handleDelete = async (_id: string) => {
    const response = await deleteEvent(_id)
    if (response?.status === StatusCode.BAD_REQUEST) {
      setApiError(response?.statusText)
      setShowError(true)
    } else if (response?.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response?.statusText)
      setShowError(true)
    } else {
      refetch()
    }
  }

  if (currUser) {
    if (currUser?.data.role.name !== 'ADMIN') {
      notFound()
    }
  }

  if (isError) {
    return (
      <div>
        <h2>Something went wrong!</h2>
        <button
          type="button"
          className="blue text-white h-12 w-20 rounded-xl"
          onClick={() => refetch()}
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <EventTable
      events={allEvents?.data.data}
      setPageNumber={setPageNumber}
      meta={allEvents?.data.meta}
      handleDelete={handleDelete}
    />
  )
}
