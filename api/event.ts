import { apiRoutes } from '@/enums/apiConstants'
import { apiRequest } from './api'
import {
  CreateEventFields,
  UpdateEventFields,
} from '@/hooks/react-hook-forms/useCreateUpdateEvent'
import { EventType } from '@/models/event'

export const fetchEvent = async (_id: string) =>
  apiRequest<undefined, EventType>('get', `${apiRoutes.FETCH_EVENTS}/${_id}`)

export const fetchEvents = async () =>
  apiRequest<undefined, EventType>('get', apiRoutes.FETCH_EVENTS)

export const createEvent = async (data: CreateEventFields) =>
  apiRequest<CreateEventFields, void>('post', apiRoutes.EVENTS_PREFIX, data)

export const updateEvent = async (data: UpdateEventFields, id: string) =>
  apiRequest<UpdateEventFields, EventType>(
    'patch',
    `${apiRoutes.EVENTS_PREFIX}/${id}`,
    data,
  )
