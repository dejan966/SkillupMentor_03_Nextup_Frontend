'use client'

import LoadingCircle from '@/components/ui/LoadingCircle'
import CreateUpdateUser from '@/components/users/CreateUpdateUser'
import { fetchRoles } from '@/lib/role'
import { fetchUser } from '@/lib/user'
import { SafeError } from '@/models/safeError'
import { useQuery } from '@tanstack/react-query'

type Props = {
  params: {
    userId: string
  }
}

export default function UsersEdit({ params }: Props) {
  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: ['fetchUser', params.userId],
    queryFn: () => fetchUser(params.userId),
  })

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

  if (userDataLoading || roleDataLoading) {
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
    <CreateUpdateUser
      title="Update User"
      roles={roles!.data}
      defaultValues={userData.data}
    />
  )
}
