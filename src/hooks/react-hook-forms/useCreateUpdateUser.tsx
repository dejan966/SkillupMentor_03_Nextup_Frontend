import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type UserFormData = {
  _id: string
  id: string
  first_name: string
  last_name: string
  email: string
  current_password: string
  password: string
  confirm_password: string
  role: string
  role_id: string
  avatar: string
}

export interface CreateUserFields {
  first_name?: string
  last_name?: string
  email: string
  password: string
  new_password?: string
  confirm_password: string
  avatar?: string
  role: string
  userImage?: any
}

export interface UpdateUserFields {
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  new_password?: string
  confirm_password?: string
  avatar?: string
  role?: string
  userImage?: any
}

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

interface Props {
  defaultValues?: UserFormData
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
      .regex(/.*[A-Z].*/, 'One uppercase character')
      .regex(/.*[a-z].*/, 'One lowercase character')
      .regex(/.*\d.*/, 'One number')
      .regex(
        /.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*/,
        'One special character',
      )
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirm_password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    role: z.string({ required_error: 'A role must be selected.' }),
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
  .refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords does not match',
  })

const updateUserSchema = z
  .object({
    avatar: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    new_password: z.string().optional(),
    confirm_password: z.string().optional(),
    role: z.string().optional(),
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

export const useCreateUpdateUser = ({ defaultValues }: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      role: '',
      password: '',
      new_password: '',
      confirm_password: '',
      userImage: undefined,
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
    reset,
    control,
  }
}

export type UpdateUserForm = z.infer<typeof updateUserSchema>
export type CreateUserForm = z.infer<typeof createUserSchema>
