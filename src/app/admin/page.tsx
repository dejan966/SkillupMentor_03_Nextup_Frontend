'use client'

import useFirebaseAuth from '@/hooks/firebase/useFirebaseAuth'
import useLocalStorage from '@/hooks/useLocalStorage'
import { fetchAllUsers } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import notFound from './not-found'
import { UserType } from '@/models/auth'
import Link from 'next/link'

export default function AdminPanel() {
  const [token] = useFirebaseAuth()
  const [value] = useLocalStorage()
  const {
    data: allUsers,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['currUser'],
    queryFn: async () => {
      let data
      if (token !== '')
        data = await fetchAllUsers({
          headers: { Authorization: `Bearer ${token}` },
        })
      else data = await fetchAllUsers()
      return data
    },
  })
  
  if (value.role?.name !== 'ADMIN') {
    notFound()
  }

  if (isError) {
    return (
      <div>
        <h2>Something went wrong!</h2>
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
  return (
    <div>
      <h1>Admin Panel</h1>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          { allUsers?.data.map((user: UserType)=>{
            return(
            <tr key={user._id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.role.name}</td>
              <Link href={'/'}>Edit</Link>
            </tr>    
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
