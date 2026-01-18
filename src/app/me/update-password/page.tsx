'use client'

import { useAuth } from '@/contexts/AuthContext'
import UpdatePasswordForm from '@/components/users/UpdatePasswordForm'
import { fetchTokenInfo } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { SafeError } from '@/models/safeError'
import Button from '@/components/ui/Button'

export default function UpdatePassword() {
  const { user } = useAuth()
  const searchParams = useSearchParams()

  const token = searchParams.get('token') ?? '1'
  const {
    data: tokenInfo,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['tokenInfo'],
    queryFn: () => fetchTokenInfo(user!._id, token),
    retry: false,
    throwOnError: false,
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

  if (tokenInfo === false) {
    return <h2>Token Expired</h2>
  }

  return <UpdatePasswordForm />
}
