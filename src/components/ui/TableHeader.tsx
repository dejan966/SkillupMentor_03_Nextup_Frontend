import { cn } from '@/utils/utils'
import { ThHTMLAttributes } from 'react'

const TableHeader = ({
  children,
  className,
  ...rest
}: ThHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th
      className={cn(
        'py-3.5 pl-5 pr-3 text-left text-sm font-semibold text-gray-900',
        className,
      )}
      {...rest}
    >
      {children}
    </th>
  )
}

export default TableHeader
