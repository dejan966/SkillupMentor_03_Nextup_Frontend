'use client'
import { getAllUsers } from '@/hooks/useUsers'

export default function Users() {
  const { data: allUsers } = getAllUsers()
  return (
    <div>
      {allUsers?.data.map((user: any) => {
        return <div key={user._id}>{user.first_name}</div>
      })}
    </div>
  )
}
