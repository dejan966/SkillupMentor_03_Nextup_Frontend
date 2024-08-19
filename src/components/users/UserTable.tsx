import { UserType } from "@/models/auth"
import Link from "next/link"

interface Props {
    users: UserType[]
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
    meta: any
}
export default function UserTable({users, setPageNumber, meta}: Props) {
    const handleDelete = (_id: string) => {}
    return (
      <div className="relative w-full flex flex-col shadow-lg mb-6 mt-4">

      
        <div className="block bg-transparent m-4 p-4 w-full overflow-x-auto">
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
          {users?.map((user: UserType) => {
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
      <div className="flex justify-end">
        {meta?.page > 1 && 
        <button className="bg-blue-800 hover:bg-blue-500 text-white rounded-full h-10 w-28" onClick={()=>setPageNumber(prev => prev - 1)}>Prev</button>
        }
        {meta?.page < meta?.last_page &&
        <button className="bg-blue-800 hover:bg-blue-500 text-white rounded-full h-10 w-28" onClick={()=>setPageNumber(prev => prev + 1)}>Next</button>        
        }

    </div>
        </div>
        </div>
    )
}