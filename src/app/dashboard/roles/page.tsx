'use client'

import { useQuery } from '@tanstack/react-query'
import { deleteRole, fetchRoles } from '@/lib/role'
import RoleTable from '@/components/roles/RoleTable'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { SafeError } from '@/models/safeError'
import DivTable from '@/components/ui/DivTable'
import Link from 'next/link'

export default function AdminPanel() {
  const [pageNumber, setPageNumber] = useState(1)
  const [apiError, setApiError] = useState('')

  const {
    data: allRoles,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['fetchRoles', pageNumber],
    queryFn: async () => fetchRoles(pageNumber),
    retry: false,
    throwOnError: false,
    refetchOnWindowFocus: false,
  })

  const handleDelete = async (_id: string) => {
    try {
      await deleteRole(_id)
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
          <Link href="/roles/add">Create role</Link>
        </Button>
      </div>
      <DivTable meta={allRoles!.meta} setPageNumber={setPageNumber}>
        <table className="min-w-full divide-y divide-gray-300">
          <RoleTable roles={allRoles!.data} handleDelete={handleDelete} />
        </table>
      </DivTable>
    </>
  )
}
