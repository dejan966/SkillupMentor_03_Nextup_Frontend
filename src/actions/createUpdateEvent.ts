'use server'

import { apiRoutes } from '@/constants/apiConstants'
import { StatusCode } from '@/constants/errorConstants'
import { createServerAxiosInstance } from '@/lib/axiosInstance'
import { uploadEventImage } from '@/lib/event'
import { EventFormState } from '@/models/eventFormState'
import moment from 'moment'
import { cookies } from 'next/headers'
import { z } from 'zod'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

const cookieStore = cookies()
const allCookies = cookieStore.getAll()
const cookieString = allCookies
  .map((cookie) => `${cookie.name}=${cookie.value}`)
  .join('; ')

const axiosServerInstance = createServerAxiosInstance(cookieString)

const createEventSchema = z.object({
  name: z.string().min(1, { message: 'Event name is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  date: z.string().transform((str) => moment(str).format('YYYY-M-D')),
  hour: z.string().min(1, { message: 'Hour is required' }),
  max_users: z
    .string()
    .refine((max_users) => !isNaN(parseInt(max_users)), {
      message: 'Max users is required',
    })
    .transform((max_users) => Number(max_users)),
  image: z.string().optional(),
  description: z.string().optional(),
  eventImage: z
    .instanceof(File, { message: 'It has to be of type file.' })
    .refine((file) => file.size > 0, { message: 'Photo is required.' })
    .refine((file) => file.size <= MAX_FILE_SIZE, 'Max image size is 5MB.')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png formats are supported.',
    ),
})

const updateEventSchema = z.object({
  name: z.string().optional(),
  location: z.string().optional(),
  date: z.string().transform((str) => moment(str).format('YYYY-M-D')),
  hour: z.string().optional(),
  max_users: z.coerce.number().positive('Must be a positive number'),
  description: z.string().optional(),
  eventImage: z
    .instanceof(File, { message: 'It has to be of type file.' })
    .optional(),
})

export async function createEventAction(
  prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const validatedEventFormData = createEventSchema.safeParse({
    name: formData.get('name'),
    location: formData.get('location'),
    date: formData.get('date'),
    hour: formData.get('hour'),
    max_users: formData.get('max_users'),
    description: formData.get('description'),
    eventImage: formData.get('eventImage'),
  })

  if (!validatedEventFormData.success) {
    const formFieldErrors = validatedEventFormData.error.flatten().fieldErrors
    return {
      success: '',
      errors: {
        name: formFieldErrors.name?.[0] || '',
        location: formFieldErrors.location?.[0] || '',
        date: '',
        hour: formFieldErrors.hour?.[0] || '',
        max_users: formFieldErrors.max_users?.[0] || '',
        description: '',
        eventImage: formFieldErrors.eventImage! || '',
        apiError: '',
      },
    }
  }

  const response = await axiosServerInstance.post(
    apiRoutes.EVENTS_PREFIX,
    validatedEventFormData.data,
  )

  if (
    response?.status === StatusCode.BAD_REQUEST ||
    response?.status === StatusCode.INTERNAL_SERVER_ERROR
  ) {
    return {
      success: '',
      errors: {
        name: '',
        eventImage: [],
        description: '',
        location: '',
        date: '',
        hour: '',
        max_users: '',
        apiError: response?.data.message,
      },
    }
  } else {
    const fileResponse = await uploadEventImage(formData, response.data._id)
    if (
      fileResponse?.status === StatusCode.BAD_REQUEST ||
      fileResponse?.status === StatusCode.INTERNAL_SERVER_ERROR
    ) {
      return {
        success: '',
        errors: {
          name: '',
          eventImage: [],
          description: '',
          location: '',
          date: '',
          hour: '',
          max_users: '',
          apiError: fileResponse?.data.message,
        },
      }
    }
  }

  return {
    success: 'Event created successfully',
    errors: {
      name: '',
      eventImage: [],
      description: '',
      location: '',
      date: '',
      hour: '',
      max_users: '',
      apiError: '',
    },
  }
}

export async function updateEventAction(
  prevState: EventFormState,
  formData: FormData,
  _id: string,
): Promise<EventFormState> {
  const validatedEventFormData = updateEventSchema.safeParse({
    name: formData.get('name'),
    location: formData.get('location'),
    date: formData.get('date'),
    hour: formData.get('hour'),
    max_users: formData.get('max_users'),
    description: formData.get('description'),
    eventImage: formData.get('eventImage'),
  })

  if (!validatedEventFormData.success) {
    const formFieldErrors = validatedEventFormData.error.flatten().fieldErrors
    return {
      success: '',
      errors: {
        name: formFieldErrors.name?.[0] || '',
        location: formFieldErrors.location?.[0] || '',
        date: '',
        hour: formFieldErrors.hour?.[0] || '',
        max_users: formFieldErrors.max_users?.[0] || '',
        description: '',
        eventImage: formFieldErrors.eventImage!,
        apiError: '',
      },
    }
  }

  const response = await axiosServerInstance.patch(
    `${apiRoutes.EVENTS_PREFIX}/${_id}`,
    validatedEventFormData.data,
  )
  if (
    response?.status === StatusCode.BAD_REQUEST ||
    response?.status === StatusCode.INTERNAL_SERVER_ERROR
  ) {
    return {
      success: '',
      errors: {
        name: '',
        eventImage: [],
        description: '',
        location: '',
        date: '',
        hour: '',
        max_users: '',
        apiError: response?.data.message,
      },
    }
  }

  return {
    success: 'Event updated successfully',
    errors: {
      name: '',
      eventImage: [],
      description: '',
      location: '',
      date: '',
      hour: '',
      max_users: '',
      apiError: '',
    },
  }
}
