'use client'

import LoadingCircle from '@/components/ui/LoadingCircle'
import UpdateUserForm from '@/components/users/UpdateUserForm'
import { fetchCurrUser } from '@/lib/user'
import { SafeError } from '@/models/safeError'
import { useQuery } from '@tanstack/react-query'

export default function UserEdit() {
  const {
    data: currUser,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['currUser'],
    queryFn: fetchCurrUser,
  })

  if (isLoading) return <LoadingCircle />

  if (isError) {
    return (
      <div>
        <h2>{(error as SafeError).message}</h2>
      </div>
    )
  }

  return <UpdateUserForm defaultValues={currUser.data} />
}
