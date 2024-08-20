'use client'

import useFirebaseAuth from '@/hooks/firebase/useFirebaseAuth'
import { fetchUsers, fetchCurrUser, deleteUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import UserTable from '@/components/users/UserTable'
import { StatusCode } from '@/enums/errorConstants'

export default function AdminPanel() {
  const [token] = useFirebaseAuth()
  const [pageNumber, setPageNumber] = useState(1)
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const {
    data: allUsers,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['fetchUsers'],
    queryFn: async () => {
      let data
      if (token !== '')
        data = await fetchUsers(pageNumber, {
          headers: { Authorization: `Bearer ${token}` },
        })
      else data = await fetchUsers(pageNumber)
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

  const handleDelete = async (_id: string) => {
    const response = await deleteUser(_id)
    if (response.status === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
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
    <UserTable
      users={allUsers?.data.data}
      setPageNumber={setPageNumber}
      meta={allUsers?.data.meta}
      handleDelete={handleDelete}
    />
  )
}
