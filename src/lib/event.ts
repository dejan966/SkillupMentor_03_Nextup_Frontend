import { apiRoutes } from '@/enums/apiConstants'
import {
  CreateEventFields,
  UpdateEventFields,
} from '@/hooks/react-hook-forms/useCreateUpdateEvent'
import axiosInstance from './axiosInstance'

export const fetchEvent = async (_id: string) => {
  try {
    const response = await axiosInstance.get(`${apiRoutes.FETCH_EVENTS}/${_id}`)
    return response
  } catch (error: any) {
    console.error(error)
    return error.response
  }
}

export const fetchEvents = async (pageNumber: number) => {
  try {
    const response = await axiosInstance.get(
      `${apiRoutes.FETCH_EVENTS}?page=${pageNumber}`,
    )
    return response
  } catch (error: any) {
    console.error(error)
    return error.response
  }
}

export const searchEvents = async (
  searchValue: string,
  dateValue: string,
  pageNumber: number,
) => {
  try {
    const response = await axiosInstance.get(
      `${apiRoutes.EVENTS_PREFIX}/search?name=${searchValue}&date=${dateValue}&page=${pageNumber}`,
    )
    return response
  } catch (error: any) {
    return error.response
  }
}

export const createEvent = async (data: CreateEventFields) => {
  try {
    const response = await axiosInstance.post(apiRoutes.EVENTS_PREFIX, data)
    return response
  } catch (error: any) {
    return error.response
  }
}

export const updateEvent = async (data: UpdateEventFields, _id: string) => {
  try {
    const response = await axiosInstance.patch(
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
    const response = await axiosInstance.post(
      `${apiRoutes.UPLOAD_EVENT_IMAGE}/${_id}`,
      formData,
    )
    return response
  } catch (error: any) {
    return error.response
  }
}

export const bookUserD = async (_id: string) => {
  try {
    const response = await axiosInstance.patch(
      `${apiRoutes.FETCH_EVENTS}/bookUser/${_id}`,
    )
    return response
  } catch (error: any) {
    console.error(error)
    return error.response
  }
}

export const getAllUpcomingEvents = async () => {
  try {
    const response = await axiosInstance.get(`${apiRoutes.UPCOMING_EVENTS}`)
    return response
  } catch (error: any) {
    console.error(error)
    return error.response
  }
}

export const getUserUpcomingEvents = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiRoutes.EVENTS_PREFIX}/user/upcomingEvents`,
    )
    return response
  } catch (error: any) {
    console.error(error)
    return error.response
  }
}

export const getRecentEvents = async () => {
  try {
    const response = await axiosInstance.get(`${apiRoutes.RECENT_EVENTS}`)
    return response
  } catch (error: any) {
    console.error(error)
    return error.response
  }
}

export const deleteEvent = async (_id: string) => {
  try {
    const response = await axiosInstance.delete(
      `${apiRoutes.EVENTS_PREFIX}/${_id}`,
    )
    return response
  } catch (error: any) {
    console.error(error)
    return error.response
  }
}
