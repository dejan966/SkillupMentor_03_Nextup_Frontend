import { apiRoutes } from '@/constants/apiConstants'
import {
  CreateEventFields,
  UpdateEventFields,
} from '@/hooks/react-hook-forms/useCreateUpdateEvent'
import axiosInstance, { apiRequest } from './axiosInstance'
import { EventType } from '@/models/event'
import { PaginatedResult } from '@/models/paginated-result'

export const fetchEvent = async (_id: string) => {
  return await apiRequest<undefined, EventType>(
    `${apiRoutes.FETCH_EVENTS}/${_id}`,
    'GET',
  )
}

export const fetchEvents = async (pageNumber: number) => {
  return await apiRequest<never, PaginatedResult<EventType>>(
    `${apiRoutes.FETCH_EVENTS}?page=${pageNumber}`,
    'GET',
  )
}

export const searchEvents = async (
  searchValue: string,
  dateValue: string,
  pageNumber: number,
) => {
  return await apiRequest<never, PaginatedResult<EventType>>(
    `${apiRoutes.EVENTS_PREFIX}/search?name=${searchValue}&date=${dateValue}&page=${pageNumber}`,
    'GET',
  )
}

export const createEvent = async (data: CreateEventFields) => {
  try {
    const response = await axiosInstance.post<CreateEventFields, void>(
      apiRoutes.EVENTS_PREFIX,
      data,
    )
    return response
  } catch (error: any) {
    return error.response
  }
}

export const updateEvent = async (data: UpdateEventFields, _id: string) => {
  try {
    const response = await axiosInstance.patch<UpdateEventFields, void>(
      `${apiRoutes.EVENTS_PREFIX}/${_id}`,
      data,
    )
    return response
  } catch (error: any) {
    return error.response
  }
}

export const uploadEventImage = async (formData: FormData, _id: string) => {
  try {
    const response = await axiosInstance.post<FormData, void>(
      `${apiRoutes.UPLOAD_EVENT_IMAGE}/${_id}`,
      formData,
    )
    return response
  } catch (error: any) {
    return error.response
  }
}

export const bookUserD = async (_id: string) => {
  return await apiRequest<never, EventType>(
    `${apiRoutes.FETCH_EVENTS}/bookUser/${_id}`,
    'PATCH',
  )
}

export const getAllUpcomingEvents = async (pageNumber: number) => {
  return await apiRequest<undefined, PaginatedResult<EventType>>(
    `${apiRoutes.UPCOMING_EVENTS}?page=${pageNumber}`,
    'GET',
  )
}

export const getRecentEvents = async (pageNumber: number) => {
  return await apiRequest<undefined, PaginatedResult<EventType>>(
    `${apiRoutes.RECENT_EVENTS}?page=${pageNumber}`,
    'GET',
  )
}

export const fetchCurrUserCreatedEvents = async (pageNumber: number) => {
  return await apiRequest<never, PaginatedResult<EventType>>(
    `${apiRoutes.CURR_USER_CREATED_EVENTS}?page=${pageNumber}`,
    'GET',
  )
}

export const fetchCurrUserUpcomingEvents = async (pageNumber: number) => {
  return await apiRequest<undefined, PaginatedResult<EventType>>(
    `${apiRoutes.CURR_USER_UPCOMING_EVENTS}?page=${pageNumber}`,
    'GET',
  )
}

export const fetchCurrUserRecentEvents = async (pageNumber: number) => {
  return await apiRequest<undefined, PaginatedResult<EventType>>(
    `${apiRoutes.CURR_USER_RECENT_EVENTS}?page=${pageNumber}`,
    'GET',
  )
}

export const deleteEvent = async (_id: string) => {
  return await apiRequest<never, void>(
    `${apiRoutes.FETCH_EVENTS}/${_id}`,
    'DELETE',
  )
}
