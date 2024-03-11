import { apiRoutes } from '@/enums/apiConstants'
import { apiRequest } from '@/api/api'
import { query } from '@/api/query'
import { EventType } from '@/models/event'

export const getAllEvents = () => {
  return query(
    ['allEvents'],
    apiRequest<undefined, EventType>('get', apiRoutes.FETCH_EVENTS),
  )
}

export const getEvent = (_id: string) => {
  return query(
    ['oneEvent'],
    apiRequest<undefined, EventType>('get', `${apiRoutes.FETCH_EVENTS}/${_id}`),
  )
}

export const getAllUpcomingEvents = () => {
  return query(
    ['upcomingEvents'],
    apiRequest<undefined, EventType>('get', `${apiRoutes.UPCOMING_EVENTS}`),
  )
}

export const getUserUpcomingEvents = () => {
  return query(
    ['currUserUpcomingEvents'],
    apiRequest<undefined, EventType>(
      'get',
      `${apiRoutes.EVENTS_PREFIX}/user/upcomingEvents`,
    ),
  )
}

export const getRecentEvents = () => {
  return query(
    ['recentEvents'],
    apiRequest<undefined, EventType>('get', `${apiRoutes.RECENT_EVENTS}`),
  )
}
