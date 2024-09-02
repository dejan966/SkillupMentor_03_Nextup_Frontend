import CreateUpdateUser from '@/components/users/CreateUpdateUser'
import { fetchCurrUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'

export default function UsersAdd() {

  const { data: currUser, isSuccess } = useQuery({
    queryKey: ['fetchCurrUser'],
    queryFn: fetchCurrUser,
  })
  
  if (currUser) {
    if (currUser?.data.role.name !== 'ADMIN') {
      notFound()
    }
  }
  return <CreateUpdateUser title="Create User" />
}
