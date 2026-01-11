import { cn } from '@/utils/utils'
import Image, { ImageProps } from 'next/image'

type AvatarProps = ImageProps & {
  className?: string
}

const Avatar = ({
  className = '',
  src,
  width,
  height,
  alt = 'Avatar',
  ...rest
}: AvatarProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('rounded-full object-cover aspect-square', className)}
      {...rest}
    />
  )
}

export default Avatar
