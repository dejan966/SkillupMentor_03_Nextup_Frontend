import { UserType } from '@/models/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export interface CreateUserFields {
  first_name?: string
  last_name?: string
  email: string
  password: string
  confirm_password: string
}

export interface UpdateUserFields {
  first_name?: string
  last_name?: string
  email?: string
  current_password?: string
  password?: string
  confirm_password?: string
  avatar?: string
}

interface Props {
  defaultValues?: UserType
}

const createUserSchema = z
  .object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Must be a valid email' }),
    password: z
      .string()
      .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
      .regex(new RegExp('.*\\d.*'), 'One number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'One special character',
      )
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirm_password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords does not match',
  })

const updateUserSchema = z
  .object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().email({ message: 'Must be a valid email' }).optional(),
    password: z
      .string()
      .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
      .regex(new RegExp('.*\\d.*'), 'One number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'One special character',
      )
      .optional(),
    confirm_password: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords does not match',
  })
export const useCreateUpdateUserForm = ({ defaultValues }: Props) => {
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
      confirm_password: '',
      role_id: '',
      ...defaultValues,
    },
    mode: 'onSubmit',
    resolver: defaultValues
      ? zodResolver(updateUserSchema)
      : zodResolver(createUserSchema),
  })

  return {
    handleSubmit,
    errors,
    control,
  }
}

export type CreateUserForm = z.infer<typeof createUserSchema>
export type UpdateUserForm = z.infer<typeof updateUserSchema>
