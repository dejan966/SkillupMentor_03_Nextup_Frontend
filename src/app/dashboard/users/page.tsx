'use client'

import useFirebaseAuth from '@/hooks/firebase/useFirebaseAuth'
import { fetchAllUsers, fetchCurrUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import { UserType } from '@/models/auth'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function AdminPanel() {
  const [token] = useFirebaseAuth()

  const {
    data: allUsers,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['allUsers'],
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

  const { data: currUser } = useQuery({
    queryKey: ['currUser'],
    queryFn: async () => {
      let data
      if (token !== '')
        data = await fetchCurrUser({
          headers: { Authorization: `Bearer ${token}` },
        })
      else data = await fetchCurrUser()
      return data
    },
  })

  const handleDelete = (_id: string) => {}

  if (currUser?.data.role?.name !== 'ADMIN') {
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
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.data.map((user: UserType) => {
            return (
              <tr key={user._id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.role.name}</td>
                <td>
                  <Link href={`${user._id}/edit`}>Edit</Link>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(user._id)
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
