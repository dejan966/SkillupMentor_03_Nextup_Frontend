import { cn } from '@/utils/utils'
import { InputHTMLAttributes } from 'react'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  errors?: Record<string, any>
  field?: string
  className?: string
}

const Input = ({
  errors,
  name,
  type = 'text',
  className,
  ...rest
}: InputProps) => {
  const hasError = name && errors?.[name]
  return (
    <>
      <input
        name={name}
        type={type}
        className={cn(
          'border rounded-full h-10 w-full p-3.5',
          className,
          hasError &&
            'border border-red-500 rounded-full h-10 w-full p-3.5 focus:outline-none focus:ring-0 focus:border-2 focus:border-red-500',
        )}
        {...rest}
      />
      {/* {hasError && <div className="validation-feedback">{errors?.[name]}</div>} */}
    </>
  )
}

export default Input
