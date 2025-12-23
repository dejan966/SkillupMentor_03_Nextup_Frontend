'use client'

import PasswordResetForm from '@/components/users/PasswordResetForm'
import { fetchCurrUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'

export default function ResetPassword() {
  const { data: currUser } = useQuery({
    queryKey: ['currUser'],
    queryFn: fetchCurrUser,
  })

  const defaultValues = currUser?.data

  return <PasswordResetForm defaultValues={defaultValues} />
}
