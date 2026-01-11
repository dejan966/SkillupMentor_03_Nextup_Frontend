import { cn } from '@/utils/utils'
import { TdHTMLAttributes } from 'react'

const TableData = ({
  children,
  className,
  ...rest
}: TdHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td
      className={cn(
        'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900',
        className,
      )}
      {...rest}
    >
      {children}
    </td>
  )
}

export default TableData
