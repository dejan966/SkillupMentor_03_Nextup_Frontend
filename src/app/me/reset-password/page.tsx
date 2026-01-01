'use client'

import LoadingCircle from '@/components/ui/LoadingCircle'
import PasswordResetForm from '@/components/users/PasswordResetForm'
import { fetchCurrUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'

export default function ResetPassword() {
  const { data: currUser, isLoading } = useQuery({
    queryKey: ['currUser'],
    queryFn: fetchCurrUser,
  })

  if (isLoading) {
    return (
      <div>
        <LoadingCircle />
      </div>
    )
  }

  return <PasswordResetForm defaultValues={currUser?.data} />
}
