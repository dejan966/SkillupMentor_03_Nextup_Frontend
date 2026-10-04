import { RoleType } from '@/models/role'
import Link from 'next/link'
import { MetaType } from '@/models/paginated-result'
import TableHeader from '../ui/TableHeader'
import TableData from '../ui/TableData'
import { RolePermissionType } from '@/models/role-permission'

interface Props {
  roles: RoleType[]
  handleDelete: (_id: string) => void
}
export default function RoleTable({ roles, handleDelete }: Props) {
  console.log(roles)
  return (
    <>
      <thead className="bg-gray-50">
        <tr>
          <TableHeader scope="col">Role</TableHeader>
          <TableHeader scope="col">Permission</TableHeader>
          <TableHeader scope="col">Edit</TableHeader>
          <TableHeader scope="col">Delete</TableHeader>
        </tr>
      </thead>
      <tbody className="bg-gray-50">
        {roles?.map((role: RoleType) => {
          return (
            <tr
              key={role._id}
              className="border border-solid border-l-0 border-r-0"
            >
              <TableData>{role.name}</TableData>
              <TableData>
                {role.permissions.map((permissions: RolePermissionType) => {
                  return <div>{permissions.role.name}</div>
                })}
              </TableData>
              <TableData>
                <Link
                  href={`/roles/${role.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Link>
              </TableData>
              <TableData>
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => {
                    handleDelete(role.id)
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
