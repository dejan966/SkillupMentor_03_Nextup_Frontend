import { EventType } from '@/models/event'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export interface CreateEventFields {
  name: string
  location: string
  date: string
  hour: string
  max_users: number
  description?: string
}

export interface UpdateEventFields {
  name?: string
  location?: string
  date?: string
  hour?: string
  max_users?: string
  description?: string
  image?: string
}

interface Props {
  defaultValues?: EventType
}

const createEventSchema = z.object({
  name: z.string().min(1, { message: 'Event name is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  date: z
    .string()
    .min(1, { message: 'Date is required' })
    .default(new Date().toISOString().substring(0, 10))
    .transform((str) => new Date(str)),
  hour: z.string().min(1, { message: 'Hour is required' }),
  max_users: z
    .string()
    .min(1, { message: 'Max users is required' })
    .transform(Number),
  description: z.string().optional(),
})

const updateEventSchema = z.object({
  name: z.string().optional(),
  location: z.string().optional(),
  date: z.string().optional(),
  hour: z.string().optional(),
  max_users: z.string().optional().transform(Number),
  description: z.string().optional(),
  image: z.string().optional(),
})

export const useCreateUpdateEventForm = ({ defaultValues }: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      name: '',
      location: '',
      hour: '',
      max_users: '',
      description: '',
      image: '',
      ...defaultValues,
    },
    mode: 'onSubmit',
    resolver: defaultValues
      ? zodResolver(updateEventSchema)
      : zodResolver(createEventSchema),
  })

  return {
    handleSubmit,
    errors,
    reset,
    control,
  }
}

export type CreateEventForm = z.infer<typeof createEventSchema>
export type UpdateEventForm = z.infer<typeof updateEventSchema>
