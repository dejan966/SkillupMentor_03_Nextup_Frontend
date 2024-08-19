import { RoleType } from "@/models/role"
import Link from "next/link"

interface Props {
    roles: RoleType[]
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
    meta: any
}
export default function RoleTable({roles, setPageNumber, meta}: Props) {
    const handleDelete = (_id: string) => {}
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
            {roles?.map((role: RoleType) => {
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
      <div className="flex justify-end">
        {meta?.page > 1 && 
        <button className="bg-blue-800 hover:bg-blue-500 text-white rounded-full h-10 w-28" onClick={()=>setPageNumber(prev => prev - 1)}>Prev</button>
        }
        {meta?.page < meta?.last_page &&
        <button className="bg-blue-800 hover:bg-blue-500 text-white rounded-full h-10 w-28" onClick={()=>setPageNumber(prev => prev + 1)}>Next</button>        
        }

    </div>
        </div>
    )
}