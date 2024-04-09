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

export const updateEvent = async (data: UpdateEventFields, _id: string) =>
  apiRequest<UpdateEventFields, EventType>(
    'patch',
    `${apiRoutes.EVENTS_PREFIX}/${_id}`,
    data,
  )

export const uploadEventImage = async (formData: FormData, _id: string) =>
  apiRequest<FormData, void>(
    'post',
    `${apiRoutes.UPLOAD_EVENT_IMAGE}/${_id}`,
    formData,
  )

export const searchEvents = async (
  searchValue: string,
  dateValue: string,
  pageNumber: number,
) =>
  apiRequest<string, void>(
    'get',
    `${apiRoutes.EVENTS_PREFIX}/search?name=${searchValue}&date=${dateValue}&page=${pageNumber}`,
  )

export const getAllUpcomingEvents = () =>
  apiRequest<undefined, EventType>('get', `${apiRoutes.UPCOMING_EVENTS}`)

export const getUserUpcomingEvents = () =>
  apiRequest<undefined, EventType>(
    'get',
    `${apiRoutes.EVENTS_PREFIX}/user/upcomingEvents`,
  )

export const getRecentEvents = () =>
  apiRequest<undefined, EventType>('get', `${apiRoutes.RECENT_EVENTS}`)
