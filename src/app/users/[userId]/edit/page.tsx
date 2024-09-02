'use client'

import LoadingCircle from '@/components/ui/LoadingCircle'
import CreateUpdateUser from '@/components/users/CreateUpdateUser'
import { fetchUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    userId: string
  }
}

export default function UsersEdit({ params }: Props) {
  const { data: userData, isSuccess, isLoading } = useQuery({
    queryKey: ['fetchUser'],
    queryFn: () => fetchUser(params.userId),
  })
  
  if (isSuccess === true && (userData?.data.message === 'Unauthorized' || !userData?.data._id)) {
    notFound()
  }

  if (isLoading) {
    return (
      <div>
        <LoadingCircle />
      </div>
    )
  }

  return <CreateUpdateUser title="Update User" defaultValues={userData?.data} />
}
