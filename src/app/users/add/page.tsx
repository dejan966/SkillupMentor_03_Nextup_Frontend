'use client'

import LoadingCircle from '@/components/ui/LoadingCircle'
import CreateUpdateUser from '@/components/users/CreateUpdateUser'
import { fetchRoles } from '@/lib/role'
import { SafeError } from '@/models/safeError'
import { useQuery } from '@tanstack/react-query'

export default function UsersAdd() {
  const {
    data: roles,
    isLoading: roleDataLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['fetchRoles'],
    queryFn: () => fetchRoles(1),
    refetchOnWindowFocus: false,
  })

  if (roleDataLoading) {
    return <LoadingCircle />
  }

  if (isError) {
    return (
      <div>
        <h2>{(error as SafeError).message}</h2>
      </div>
    )
  }

  return <CreateUpdateUser title="Create User" roles={roles!.data} />
}
