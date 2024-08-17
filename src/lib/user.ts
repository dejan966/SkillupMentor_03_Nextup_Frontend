import { apiRoutes } from '@/enums/apiConstants'
import { LoginUserFields } from '@/hooks/react-hook-forms/useLogin'
import { UserType } from '@/models/auth'
import { apiRequest } from './api'
import { RegisterUserFields } from '@/hooks/react-hook-forms/useRegister'
import { UpdateUserFields } from '@/hooks/react-hook-forms/useUpdateUserForm'
import { User } from 'firebase/auth'

export const userSignout = async () =>
  apiRequest<undefined, void>('post', apiRoutes.SIGNOUT)

export const firebaseUserSignout = async () =>
  apiRequest<undefined, void>('post', apiRoutes.FIREBASE_SIGNOUT)

export const login = async (data: LoginUserFields) =>
  apiRequest<LoginUserFields, UserType>('post', apiRoutes.LOGIN, data)

export const firebaseLogin = async (user: User) =>
  apiRequest<User, UserType>('post', apiRoutes.FIREBASE_LOGIN, user)

export const register = async (data: RegisterUserFields) =>
  apiRequest<RegisterUserFields, void>('post', apiRoutes.REGISTER, data)

export const refreshTokens = async () =>
  apiRequest<undefined, UserType>('get', apiRoutes.REFRESH_TOKENS)

export const uploadAvatar = async (
  formData: FormData,
  _id: string,
  headers?: {},
) =>
  apiRequest<FormData, void>(
    'post',
    `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${_id}`,
    formData,
    headers,
  )

export const fetchCurrUser = async (headers?: {}) =>
  apiRequest<never, UserType>('get', apiRoutes.ME, undefined, headers)

export const fetchAllUsers = async (headers?: {}) =>
  apiRequest<never, UserType[]>(
    'get',
    apiRoutes.FETCH_USERS,
    undefined,
    headers,
  )

export const fetchUser = async (_id: string) =>
  apiRequest<undefined, UserType>('get', `${apiRoutes.FETCH_USERS}/${_id}`)

export const updateUser = async (
  data: UpdateUserFields,
  id: string,
  headers?: {},
) =>
  apiRequest<UpdateUserFields, UserType>(
    'patch',
    `${apiRoutes.USERS_PREFIX}/${id}`,
    data,
    headers,
  )

export const passwordResetEmail = async ({ email }: UpdateUserFields) =>
  apiRequest<UpdateUserFields, string>(
    'post',
    `${apiRoutes.ME}/reset-password`,
    { email },
  )

export const fetchTokenInfo = async (user_id: string, token: string) =>
  apiRequest<string, boolean>(
    'get',
    `${apiRoutes.USERS_PREFIX}/${user_id}/${token}`,
  )

export const updateUserPass = async ({
  password,
  new_password,
  confirm_password,
}: UpdateUserFields) =>
  apiRequest<UpdateUserFields, UserType>(
    'patch',
    `${apiRoutes.ME}/update-password`,
    { password, new_password, confirm_password },
  )

export const deleteUser = async (id: string) =>
  apiRequest<string, UserType>('delete', `${apiRoutes.USERS_PREFIX}/${id}`)
