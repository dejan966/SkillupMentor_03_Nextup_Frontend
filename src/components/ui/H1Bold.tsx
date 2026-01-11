import { cn } from '@/utils/utils'
import { HTMLAttributes } from 'react'

const H1Bold = ({
  className,
  children,
}: HTMLAttributes<HTMLHeadingElement>) => {
  return <h1 className={cn('text-1xl font-bold', className)}>{children}</h1>
}

export default H1Bold
