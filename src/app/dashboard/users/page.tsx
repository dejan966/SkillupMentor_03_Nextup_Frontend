'use client'

import { fetchUsers, deleteUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { useState } from 'react'
import UserTable from '@/components/users/UserTable'
import Button from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { SafeError } from '@/models/safeError'
import DivTable from '@/components/ui/DivTable'

export default function AdminPanel() {
  const { user } = useAuth()

  const [pageNumber, setPageNumber] = useState(1)
  const [apiError, setApiError] = useState('')

  const {
    data: allUsers,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['fetchUsers', pageNumber],
    queryFn: async () => fetchUsers(pageNumber),
    retry: false,
    throwOnError: false,
  })

  const handleDelete = async (_id: string) => {
    try {
      await deleteUser(_id)
      refetch()
    } catch (error) {
      const safeError = error as SafeError
      setApiError(safeError.message)
    }
  }

  if (user) {
    if (user.role?.name !== 'ADMIN') {
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
      <div>{apiError}</div>
      <DivTable meta={allUsers!.meta} setPageNumber={setPageNumber}>
        <table className="min-w-full divide-y divide-gray-300">
          <UserTable users={allUsers!.data} handleDelete={handleDelete} />
        </table>
      </DivTable>
    </>
  )
}
