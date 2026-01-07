'use client'

import { useAuth } from '@/contexts/AuthContext'
import UpdatePasswordForm from '@/components/users/UpdatePasswordForm'
import { fetchTokenInfo } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { SafeError } from '@/models/safeError'

export default function UpdatePassword() {
  const { user } = useAuth()
  const searchParams = useSearchParams()

  const token = searchParams.get('token') ?? '1'
  const {
    data: tokenInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['tokenInfo'],
    queryFn: () => fetchTokenInfo(user!._id, token),
    retry: false,
    throwOnError: false,
  })

  if (isLoading) {
    return <LoadingCircle />
  }

  if (isError) {
    return (
      <div>
        <h2>{(error as SafeError).message}</h2>
        <button type="button" className="blue text-white h-12 w-20 rounded-xl">
          Try again
        </button>
      </div>
    )
  }

  return (
    <div>
      {tokenInfo === false ? <div>Token expired</div> : <UpdatePasswordForm />}
    </div>
  )
}
