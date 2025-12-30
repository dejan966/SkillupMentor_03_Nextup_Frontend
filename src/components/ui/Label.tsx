import { cn } from '@/utils/utils'

type Props = {
  content: string
  classname?: string
}

const Label = ({ content, classname }: Props) => {
  return (
    <label
      className={cn('block text-gray-700 text-sm font-bold mb-2', classname)}
    >
      {content}
    </label>
  )
}

export default Label
