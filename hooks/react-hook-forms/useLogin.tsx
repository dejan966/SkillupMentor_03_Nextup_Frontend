import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export interface LoginUserFields {
  email: string
  password: string
}

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Must be a valid email' }),
  password: z.string().min(1, { message: 'Password field cannot be empty' }),
})

export const useLoginForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  })

  return {
    handleSubmit,
    errors,
    reset,
    control,
  }
}

export type LoginForm = z.infer<typeof loginSchema>
