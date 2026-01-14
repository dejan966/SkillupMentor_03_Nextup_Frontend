import { UserType } from '@/models/auth'
import Link from 'next/link'
import TableHeader from '../ui/TableHeader'
import TableData from '../ui/TableData'

interface Props {
  users: UserType[]
  handleDelete: (_id: string) => void
}
export default function UserTable({ users, handleDelete }: Props) {
  return (
    <>
      <thead className="bg-gray-50">
        <tr>
          <TableHeader scope="col">First name</TableHeader>
          <TableHeader scope="col">Last name</TableHeader>
          <TableHeader scope="col">Email</TableHeader>
          <TableHeader scope="col">Role</TableHeader>
          <TableHeader scope="col">Edit</TableHeader>
          <TableHeader scope="col">Delete</TableHeader>
        </tr>
      </thead>
      <tbody className="bg-gray-50">
        {users?.map((user: UserType) => {
          return (
            <tr key={user.id}>
              <TableData>{user.first_name}</TableData>
              <TableData>{user.last_name}</TableData>
              <TableData>{user.email}</TableData>
              <TableData>{user.role?.name}</TableData>
              <TableData>
                <Link
                  href={`/users/${user.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Link>
              </TableData>
              <TableData>
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => {
                    handleDelete(user.id)
                  }}
                >
                  Delete
                </button>
              </TableData>
            </tr>
          )
        })}
      </tbody>
    </>
  )
}
