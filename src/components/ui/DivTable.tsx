import { MetaType } from '@/models/paginated-result'
import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
  meta: MetaType
}

const DivTable = ({ children, meta, setPageNumber }: Props) => {
  return (
    <div className="mt-10 flex flex-col">
      <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-auto">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            {children}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        {meta.page > 1 && (
          <button
            className="bg-blue-800 hover:bg-blue-500 text-white rounded-full h-10 w-28 mr-4"
            onClick={() => setPageNumber((prev) => prev - 1)}
          >
            Prev
          </button>
        )}
        {meta.page < meta?.last_page && (
          <button
            className="bg-blue-800 hover:bg-blue-500 text-white rounded-full h-10 w-28"
            onClick={() => setPageNumber((prev) => prev + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default DivTable
