import { cn } from '@/utils/utils'
import { HTMLAttributes } from 'react'

const DivCentered = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('flex justify-center items-center', className)}>
      {children}
    </div>
  )
}

export default DivCentered
