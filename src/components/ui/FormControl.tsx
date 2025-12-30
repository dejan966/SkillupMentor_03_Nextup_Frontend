import { cn } from '@/utils/utils'

type Props = {
  message?: string
  classname?: string
}
const FormControl = ({ message, classname }: Props) => {
  return (
    <div className={cn('text-red-500 text-xs mb-4', classname)}>{message}</div>
  )
}

export default FormControl
