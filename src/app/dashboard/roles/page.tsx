'use client'

import useFirebaseAuth from '@/hooks/firebase/useFirebaseAuth'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { fetchRoles } from '@/lib/role'
import { notFound } from 'next/navigation'
import { RoleType } from '@/models/role'
import { fetchCurrUser } from '@/lib/user'

export default function AdminPanel() {
  const [token] = useFirebaseAuth()

  const {
    data: allRoles,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['fetchRoles'],
    queryFn: async () => {
      let data
      if (token !== '')
        data = await fetchRoles({
          headers: { Authorization: `Bearer ${token}` },
        })
      else data = await fetchRoles()
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

  if (currUser) {
    if (currUser?.data.role.name !== 'ADMIN') {
      notFound()
    }
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
    <div className="relative w-full flex flex-col shadow-lg mb-6 mt-4">
      <div className="block bg-transparent m-4 p-4 w-full overflow-x-auto">
        <table className="w-auto">
          <thead>
            <tr>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allRoles?.data.map((role: RoleType) => {
              return (
                <tr
                  key={role._id}
                  className="border border-solid border-l-0 border-r-0"
                >
                  <td>{role.name}</td>
                  <td>
                    <Link href={`/roles/${role._id}/edit`}>Edit</Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleDelete(role._id)
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
    </div>
  )
}
