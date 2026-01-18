'use client'

import CreateUpdateRole from '@/components/roles/CreateUpdateRole'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { fetchRole } from '@/lib/role'
import { SafeError } from '@/models/safeError'
import { useQuery } from '@tanstack/react-query'

type Props = {
  params: {
    roleId: string
  }
}

export default function RoleEdit({ params }: Props) {
  const {
    data: roleData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['fetchRole', params.roleId],
    queryFn: () => fetchRole(params.roleId),
    retry: false,
    throwOnError: false,
    refetchOnWindowFocus: false,
  })

  if (isError) {
    return (
      <div>
        <h2>{(error as SafeError).message}</h2>
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
