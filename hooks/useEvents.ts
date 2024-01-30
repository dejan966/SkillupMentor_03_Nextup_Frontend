import { apiRoutes } from '@/enums/apiConstants'
import { apiRequest } from '../api/api'
import { query } from '../api/query'

export const getAllEvents = () => {
  return query(['allEvents'], apiRequest('get', apiRoutes.FETCH_EVENTS))
}
