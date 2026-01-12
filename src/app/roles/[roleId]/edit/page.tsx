'use client'

import CreateUpdateRole from '@/components/roles/CreateUpdateRole'
import Button from '@/components/ui/Button'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { fetchRole } from '@/lib/role'
import { SafeError } from '@/models/safeError'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    roleId: string
  }
}

export default function RoleEdit({ params }: Props) {
  const {
    data: roleData,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['fetchRole', params.roleId],
    queryFn: () => fetchRole(params.roleId),
    retry: false,
    throwOnError: false,
  })

  if (isSuccess === true && !roleData._id) {
    notFound()
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

  if (isLoading) {
    return (
      <div>
        <LoadingCircle />
      </div>
    )
  }

  return <CreateUpdateRole title="Manage role" defaultValues={roleData} />
}
