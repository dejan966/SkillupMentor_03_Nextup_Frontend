'use client'
import UpdatePasswordForm from '@/components/users/UpdatePasswordForm'
import { getTokenInfo } from '@/hooks/useUsers'
import authStore from '@/stores/auth.store'
import { useSearchParams } from 'next/navigation'

export default function UpdatePassword() {
  const searchParams = useSearchParams()

  const token = searchParams.get('token') ?? '1'
  const tokenInfo = getTokenInfo(authStore.user?._id!, token)

  return <>{tokenInfo.data && <UpdatePasswordForm />}</>
}
