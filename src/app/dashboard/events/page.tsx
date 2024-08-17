'use client'

import useFirebaseAuth from '@/hooks/firebase/useFirebaseAuth'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { fetchEvents } from '@/lib/event'
import { EventType } from '@/models/event'
import { notFound } from 'next/navigation'
import { fetchCurrUser } from '@/lib/user'

export default function AdminPanel() {
  const [token] = useFirebaseAuth()
  const {
    data: allEvents,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['fetchEvents'],
    queryFn: async () => {
      let data
      if (token !== '')
        data = await fetchEvents({
          headers: { Authorization: `Bearer ${token}` },
        })
      else data = await fetchEvents()
      return data
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

  const handleDelete = (_id: string) => {}

  if (currUser?.data.role?.name !== 'ADMIN') {
    notFound()
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
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allEvents?.data.map((event: EventType) => {
            return (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{event.location}</td>
                <td>{event.date}</td>
                <td>{event.description}</td>
                <td>
                  <Link href={`events/${event._id}/edit`}>Edit</Link>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(event._id)
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
