'use client'
import { getAllUsers } from '@/hooks/useUsers'
import { UserType } from '@/models/auth'

export default function Users() {
  const { data: allUsers } = getAllUsers()
  return (
    <div>
      {allUsers?.data.map((user: UserType) => {
        return <div key={user._id}>{user.first_name}</div>
      })}
    </div>
  )
}
