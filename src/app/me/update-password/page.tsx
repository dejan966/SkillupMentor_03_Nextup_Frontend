'use client'

import { useAuth } from '@/contexts/AuthContext'
import UpdatePasswordForm from '@/components/users/UpdatePasswordForm'
import { fetchTokenInfo } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export default function UpdatePassword() {
  const { user } = useAuth()
  const searchParams = useSearchParams()

  const token = searchParams.get('token') ?? '1'
  const { data: tokenInfo } = useQuery({
    queryKey: ['tokenInfo'],
    queryFn: () => fetchTokenInfo(user!._id, token),
  })

  return (
    <div>
      {tokenInfo?.data === false ? (
        <div>Token expired</div>
      ) : (
        <UpdatePasswordForm />
      )}
    </div>
  )
}
