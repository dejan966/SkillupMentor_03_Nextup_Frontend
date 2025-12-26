import { cn } from '@/utils/utils'
import { ButtonHTMLAttributes } from 'react'

const Button = ({
  className,
  variant = 'default',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'search' | 'error'
}) => {
  return (
    <button
      className={cn(
        'bg-blue-800 hover:bg-blue-500 text-white h-10 w-full',
        variant === 'default' && 'rounded-full',
        variant === 'search' && 'rounded-e-lg',
        variant === 'error' && 'rounded-xl',
        className,
      )}
      type="button"
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
