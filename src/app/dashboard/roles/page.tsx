'use client'

import { useQuery } from '@tanstack/react-query'
import { deleteRole, fetchRoles } from '@/lib/role'
import { notFound } from 'next/navigation'
import RoleTable from '@/components/roles/RoleTable'
import { useState } from 'react'
import { StatusCode } from '@/constants/errorConstants'
import Button from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { SafeError } from '@/models/safeError'
import DivTable from '@/components/ui/DivTable'

export default function AdminPanel() {
  const { user } = useAuth()

  const [pageNumber, setPageNumber] = useState(1)
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

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
  })

  const handleDelete = async (_id: string) => {
    try {
      await deleteRole(_id)
      refetch()
    } catch (error) {
      const safeError = error as SafeError
      setApiError(safeError.message)
      setShowError(true)
    }
  }

  if (user) {
    if (user?.role.name !== 'ADMIN') {
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
      <DivTable meta={allRoles!.meta} setPageNumber={setPageNumber}>
        <table className="min-w-full divide-y divide-gray-300">
          <RoleTable roles={allRoles!.data} handleDelete={handleDelete} />
        </table>
      </DivTable>
    </>
  )
}
