'use client'

import LoadingCircle from '@/components/ui/LoadingCircle'
import PasswordResetForm from '@/components/users/PasswordResetForm'
import { fetchCurrUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'

export default function ResetPassword() {
  const {
    data: currUser,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['currUser'],
    queryFn: fetchCurrUser,
  })

  if (isLoading) {
    return <LoadingCircle />
  }

  if (isError) {
    return (
      <div>
        <h2>Something went wrong</h2>
        <button
          type="button"
          className="blue text-white h-12 w-20 rounded-xl"
          onClick={() => refetch()}
        >
          Try again
        </button>
      </div>
    )
  }

  return <PasswordResetForm defaultValues={currUser.data} />
}
