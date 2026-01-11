import { cn } from '@/utils/utils'
import { HTMLAttributes } from 'react'

const FormContainer = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('px-8 pt-6 pb-8 mb-4 w-2/5', className)}>{children}</div>
  )
}

export default FormContainer
