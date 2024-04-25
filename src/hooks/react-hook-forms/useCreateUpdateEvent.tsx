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
  image: string
  eventImage: any
}

export interface UpdateEventFields {
  name?: string
  location?: string
  date?: string
  hour?: string
  max_users?: number
  description?: string
  image?: string
  eventImage?: any
}

interface Props {
  defaultValues?: EventType
}

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg']

const createEventSchema = z.object({
  name: z.string().min(1, { message: 'Event name is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  date: z.string().transform((str) => new Date(str)),
  hour: z.string().min(1, { message: 'Hour is required' }),
  max_users: z
    .string()
    .refine((max_users) => !isNaN(parseInt(max_users)), {
      message: 'Max users is required',
    })
    .transform((max_users) => Number(max_users)),
  description: z.string().optional(),
  eventImage: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      'Max image size is 5MB.',
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg formats are supported.',
    ),
})

const updateEventSchema = z.object({
  name: z.string().optional(),
  location: z.string().optional(),
  date: z.string().transform((str) => new Date(str)),
  hour: z.string().optional(),
  max_users: z.string().transform((max_users) => Number(max_users)),
  description: z.string().optional(),
  eventImage: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      'Max image size is 5MB.',
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg formats are supported.',
    ),
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
      max_users: 0,
      date: defaultValues
        ? new Date(defaultValues.date).toISOString().substring(0, 10)
        : new Date().toISOString().substring(0, 10),
      description: '',
      eventImage: undefined,
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
