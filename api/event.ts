import { apiRoutes } from '@/enums/apiConstants'
import { EventType } from 'react-hook-form'
import { apiRequest } from './api'

export const fetchEvent = async (_id: string) =>
  apiRequest<undefined, EventType>('get', `${apiRoutes.FETCH_EVENTS}/${_id}`)

export const fetchEvents = async () =>
  apiRequest<undefined, EventType>('get', apiRoutes.FETCH_EVENTS)
