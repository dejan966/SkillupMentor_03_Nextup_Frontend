'use client'

import { fetchUsers, deleteUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import UserTable from '@/components/users/UserTable'
import Button from '@/components/ui/Button'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { SafeError } from '@/models/safeError'
import DivTable from '@/components/ui/DivTable'
import Link from 'next/link'

export default function AdminPanel() {
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
    refetchOnWindowFocus: false,
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
          <Link href="/users/add">Create user</Link>
        </Button>
      </div>
      <DivTable meta={allUsers!.meta} setPageNumber={setPageNumber}>
        <table className="min-w-full divide-y divide-gray-300">
          <UserTable users={allUsers!.data} handleDelete={handleDelete} />
        </table>
      </DivTable>
    </>
  )
}
