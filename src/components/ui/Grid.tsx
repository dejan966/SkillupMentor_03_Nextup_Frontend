import { cn } from '@/utils/utils'
import { HTMLAttributes } from 'react'

const Grid = ({ children, className }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('grid', className)}>{children}</div>
}

export default Grid
