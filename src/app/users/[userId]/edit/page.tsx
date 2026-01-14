'use client'

import LoadingCircle from '@/components/ui/LoadingCircle'
import CreateUpdateUser from '@/components/users/CreateUpdateUser'
import { fetchRoles } from '@/lib/role'
import { fetchUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    userId: string
  }
}

export default function UsersEdit({ params }: Props) {
  const {
    data: userData,
    isLoading: userDataLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['fetchUser', params.userId],
    queryFn: () => fetchUser(params.userId),
  })

  const { data: roles, isLoading: roleDataLoading } = useQuery({
    queryKey: ['fetchRoles'],
    queryFn: () => fetchRoles(1),
  })

  if (
    isSuccess === true &&
    (userData?.data.message === 'Unauthorized' || !userData?.data._id)
  ) {
    notFound()
  }

  if (userDataLoading || roleDataLoading) {
    return <LoadingCircle />
  }

  return (
    <CreateUpdateUser
      title="Update User"
      roles={roles!.data}
      defaultValues={userData.data}
    />
  )
}
