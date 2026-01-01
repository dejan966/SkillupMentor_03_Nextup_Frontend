'use client'

import LoadingCircle from '@/components/ui/LoadingCircle'
import UpdateAvatarForm from '@/components/users/UpdateAvatarForm'
import { fetchCurrUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'

export default function UpdateAvatar() {
  const { data: currUser } = useQuery({
    queryKey: ['currUser'],
    queryFn: fetchCurrUser,
  })

  if (!currUser) return <LoadingCircle />

  return <UpdateAvatarForm defaultValues={currUser.data} />
}
