'use client'

import UpdateAvatarForm from '@/components/users/UpdateAvatarForm'
import { fetchCurrUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'

export default function UpdateAvatar() {
  const { data: currUser } = useQuery({
    queryKey: ['currUser'],
    queryFn: fetchCurrUser,
  })

  const defaultValues = currUser?.data

  return <UpdateAvatarForm defaultValues={defaultValues} />
}
