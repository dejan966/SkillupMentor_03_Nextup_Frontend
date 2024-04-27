import { UserType } from '@/models/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export interface UpdateUserFields {
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  new_password?: string
  confirm_password?: string
  avatar?: string
  userImage?: any
}

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

interface Props {
  defaultValues?: UserType
}

const updateUserSchema = z
  .object({
    avatar: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    new_password: z.string().optional(),
    confirm_password: z.string().optional(),
    userImage: z
      .any()
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        'Max image size is 5MB.',
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        'Only .jpg, .jpeg, .png formats are supported.',
      )
      .optional(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
  })

export const useUpdateUserForm = ({ defaultValues }: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      new_password: '',
      confirm_password: '',
      userImage: undefined,
      ...defaultValues,
    },
    mode: 'onSubmit',
    resolver: zodResolver(updateUserSchema),
  })

  return {
    handleSubmit,
    errors,
    control,
  }
}

export type UpdateUserForm = z.infer<typeof updateUserSchema>
