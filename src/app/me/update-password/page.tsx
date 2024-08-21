'use client'

import UpdatePasswordForm from '@/components/users/UpdatePasswordForm'
import useLocalStorage from '@/hooks/useLocalStorage'
import { fetchTokenInfo } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export default function UpdatePassword() {
  const [value] = useLocalStorage()
  const searchParams = useSearchParams()

  const token = searchParams.get('token') ?? '1'
  const { data: tokenInfo } = useQuery({
    queryKey: ['tokenInfo'],
    queryFn: () => fetchTokenInfo(value._id, token),
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
