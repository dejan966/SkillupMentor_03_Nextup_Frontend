'use client'

import LoadingCircle from '@/components/ui/LoadingCircle'
import UpdateAvatarForm from '@/components/users/UpdateAvatarForm'
import { fetchCurrUser } from '@/lib/user'
import { SafeError } from '@/models/safeError'
import { useQuery } from '@tanstack/react-query'

export default function UpdateAvatar() {
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

  return <UpdateAvatarForm defaultValues={currUser.data} />
}
