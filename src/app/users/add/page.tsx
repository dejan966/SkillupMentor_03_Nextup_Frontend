'use client'

import LoadingCircle from '@/components/ui/LoadingCircle'
import CreateUpdateUser from '@/components/users/CreateUpdateUser'
import { fetchRoles } from '@/lib/role'
import { fetchCurrUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'

export default function UsersAdd() {
  const { data: currUser } = useQuery({
    queryKey: ['fetchCurrUser'],
    queryFn: fetchCurrUser,
  })

  if (currUser) {
    if (currUser?.data.role.name !== 'ADMIN') {
      notFound()
    }
  }

  const { data: roles, isLoading: roleDataLoading } = useQuery({
    queryKey: ['fetchRoles'],
    queryFn: () => fetchRoles(1),
  })

  if (roleDataLoading) {
    return <LoadingCircle />
  }

  return <CreateUpdateUser title="Create User" roles={roles!.data} />
}
