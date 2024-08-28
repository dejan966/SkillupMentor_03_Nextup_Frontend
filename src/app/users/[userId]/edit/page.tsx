'use client'

import CreateUpdateUser from '@/components/users/CreateUpdateUserForm'
import { fetchUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    user_id: string
  }
}

export default function UsersEdit({ params }: Props) {
  const { data: user } = useQuery({
    queryKey: ['fetchUser'],
    queryFn: async () => {
      return await fetchUser(params.user_id)
    },
  })

  return <CreateUpdateUser defaultValues={user} title="Update User" />
}
