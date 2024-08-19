'use client'

import useFirebaseAuth from '@/hooks/firebase/useFirebaseAuth'
import { useQuery } from '@tanstack/react-query'
import { fetchEvents } from '@/lib/event'
import { notFound } from 'next/navigation'
import { fetchCurrUser } from '@/lib/user'
import EventTable from '@/components/events/EventTable'
import { useEffect, useState } from 'react'

export default function AdminPanel() {
  const [token] = useFirebaseAuth()
  const [pageNumber, setPageNumber] = useState(1)
  const [allEvents, setAllEvents] = useState<any>([])

  const fetchAllEvents = async () => {
    let res
      if (token !== '')
        res = await fetchEvents(pageNumber, {
          headers: { Authorization: `Bearer ${token}` },
        })
      else res = await fetchEvents(pageNumber)
      setAllEvents(res.data)
  }
  useEffect(()=>{
    fetchAllEvents()
  }, [pageNumber])

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

  if (currUser) {
    if (currUser?.data.role.name !== 'ADMIN') {
      notFound()
    }
  }

  return (
    <EventTable events={allEvents?.data} setPageNumber={setPageNumber} meta={allEvents?.meta} />
  )
}
