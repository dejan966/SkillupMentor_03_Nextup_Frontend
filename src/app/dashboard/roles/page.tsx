'use client'

import useFirebaseAuth from '@/hooks/firebase/useFirebaseAuth'
import { useQuery } from '@tanstack/react-query'
import { deleteRole, fetchRoles } from '@/lib/role'
import { notFound } from 'next/navigation'
import { fetchCurrUser } from '@/lib/user'
import RoleTable from '@/components/roles/RoleTable'
import { useState } from 'react'
import { StatusCode } from '@/enums/errorConstants'

export default function AdminPanel() {
  const [token] = useFirebaseAuth()
  const [pageNumber, setPageNumber] = useState(1)
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const {
    data: allRoles,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['fetchRoles'],
    queryFn: async () => fetchRoles(pageNumber),
  })

  const { data: currUser } = useQuery({
    queryKey: ['currUser'],
    queryFn: fetchCurrUser,
  })

  const handleDelete = async (_id: string) => {
    const response = await deleteRole(_id)
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
    <RoleTable
      roles={allRoles?.data.data}
      setPageNumber={setPageNumber}
      meta={allRoles?.data.meta}
      handleDelete={handleDelete}
    />
  )
}
