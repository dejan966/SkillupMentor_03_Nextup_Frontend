import { apiRoutes } from '@/enums/apiConstants'
import { apiRequest } from '@/api/api'
import { query } from '@/api/query'
import { UserType } from '@/models/auth'

export const getAllUsers = () => {
  return query(
    ['allUsers'],
    apiRequest<undefined, UserType>('get', apiRoutes.FETCH_USERS),
  )
}
