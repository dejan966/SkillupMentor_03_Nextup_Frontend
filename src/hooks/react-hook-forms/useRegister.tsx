import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export interface RegisterUserFields {
  avatar?: string
  first_name?: string
  last_name?: string
  email: string
  password: string
  confirm_password: string
  userImage?: any
}

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

const registerSchema = z
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
        /.*[`~<>?,./!@#$%^&*()\-_+="'|{}\[\];:\\].*/,
        'One special character',
      )
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirm_password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
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

export const useRegisterForm = () => {
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
      password: '',
      confirm_password: '',
      userImage: undefined,
    },
    mode: 'onSubmit',
    resolver: zodResolver(registerSchema),
  })

  return {
    handleSubmit,
    errors,
    reset,
    control,
  }
}

export type RegisterForm = z.infer<typeof registerSchema>
