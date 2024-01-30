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
