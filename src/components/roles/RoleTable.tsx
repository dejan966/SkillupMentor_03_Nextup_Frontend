import { RoleType } from '@/models/role'
import Link from 'next/link'
import LoadingCircle from '../ui/LoadingCircle'

interface Props {
  roles: RoleType[]
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
  meta: any
  handleDelete: (_id: string) => void
}
export default function RoleTable({
  roles,
  setPageNumber,
  meta,
  handleDelete,
}: Props) {
  return (
    <div>
      {roles ? (
        <div className="mt-10 flex flex-col">
          <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="tableHeader">
                        Role
                      </th>
                      <th scope="col" className="tableHeader">
                        Edit
                      </th>
                      <th scope="col" className="tableHeader">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-50">
                    {roles?.map((role: RoleType) => {
                      return (
                        <tr
                          key={role._id}
                          className="border border-solid border-l-0 border-r-0"
                        >
                          <td className="tableTD">{role.name}</td>
                          <td className="tableTD">
                            <Link
                              href={`/roles/${role._id}/edit`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                          </td>
                          <td className="tableTD">
                            <button
                              className="text-indigo-600 hover:text-indigo-900"
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
          </div>
          <div className="flex justify-end">
            {meta?.page > 1 && (
              <button
                className="bg-blue-800 hover:bg-blue-500 text-white rounded-full h-10 w-28"
                onClick={() => setPageNumber((prev) => prev - 1)}
              >
                Prev
              </button>
            )}
            {meta?.page < meta?.last_page && (
              <button
                className="bg-blue-800 hover:bg-blue-500 text-white rounded-full h-10 w-28"
                onClick={() => setPageNumber((prev) => prev + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <LoadingCircle />
      )}
    </div>
  )
}
