import { apiRoutes } from '@/enums/apiConstants'
import { apiRequest } from '../api/api'
import { query } from '../api/query'

export const getAllUsers = () => {
  return query(['allUsers'], apiRequest('get', apiRoutes.FETCH_USERS))
}
