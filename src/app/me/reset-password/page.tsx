'use client'

import Button from '@/components/ui/Button'
import LoadingCircle from '@/components/ui/LoadingCircle'
import PasswordResetForm from '@/components/users/PasswordResetForm'
import { fetchCurrUser } from '@/lib/user'
import { SafeError } from '@/models/safeError'
import { useQuery } from '@tanstack/react-query'

export default function ResetPassword() {
  const {
    data: currUser,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['currUser'],
    queryFn: fetchCurrUser,
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return <LoadingCircle />
  }

  if (isError) {
    return (
      <div>
        <h2>{(error as SafeError).message}</h2>
        <Button variant="error" className="h-12 w-20" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    )
  }

  return <PasswordResetForm defaultValues={currUser.data} />
}
