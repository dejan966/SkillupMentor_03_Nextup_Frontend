import { apiRoutes } from '@/enums/apiConstants'
import { LoginUserFields } from '@/hooks/react-hook-forms/useLogin'
import { UserType } from '@/models/auth'
import { apiRequest } from './api'
import { RegisterUserFields } from '@/hooks/react-hook-forms/useRegister'

export const signout = async () =>
  apiRequest<undefined, void>('post', apiRoutes.SIGNOUT)

export const login = async (data: LoginUserFields) =>
  apiRequest<LoginUserFields, UserType>('post', apiRoutes.LOGIN, data)

export const register = async (data: RegisterUserFields) =>
  apiRequest<RegisterUserFields, void>('post', apiRoutes.REGISTER, data)

export const refreshTokens = async () =>
  apiRequest<undefined, UserType>('get', apiRoutes.REFRESH_TOKENS)

export const uploadAvatar = async (formData: FormData, _id: string) =>
  apiRequest<FormData, void>(
    'post',
    `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${_id}`,
    formData,
  )

export const fetchCurrUser = async () =>
  apiRequest<never, UserType>('get', apiRoutes.ME)

export const fetchUser = async (_id: string) =>
  apiRequest<undefined, UserType>('get', `${apiRoutes.FETCH_USERS}/${_id}`)
