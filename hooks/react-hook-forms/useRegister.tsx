import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export interface RegisterUserFields {
  first_name?: string
  last_name?: string
  email: string
  password: string
  confirm_password: string
}

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

export type LoginForm = z.infer<typeof registerSchema>
