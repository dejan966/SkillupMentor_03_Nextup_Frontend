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

export const getCurrUser = () => {
  return query(
    ['currUsers'],
    apiRequest<undefined, UserType>('get', apiRoutes.ME),
  )
}

export const getTokenInfo = (user_id: string, token: string) => {
  return query(
    ['password_token_info'],
    apiRequest<string, boolean>(
      'get',
      `${apiRoutes.USERS_PREFIX}/${user_id}/${token}`,
    ),
  )
}
