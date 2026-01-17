import { apiRoutes } from '@/constants/apiConstants'
import { LoginUserFields } from '@/hooks/react-hook-forms/useLogin'
import { RegisterUserFields } from '@/hooks/react-hook-forms/useRegister'
import {
  CreateUserFields,
  UpdateUserFields,
} from '@/hooks/react-hook-forms/useCreateUpdateUser'
import axiosInstance, { apiRequest } from './axiosInstance'
import { UserType } from '@/models/auth'
import { PaginatedResult } from '@/models/paginated-result'

export const userSignout = async () => {
  try {
    const response = await axiosInstance.post<undefined, void>(
      apiRoutes.SIGNOUT,
    )
    return response
  } catch (error: any) {
    return error.response
  }
}

export const firebaseUserSignout = async () => {
  try {
    const response = await axiosInstance.post<undefined, void>(
      apiRoutes.FIREBASE_SIGNOUT,
    )
    return response
  } catch (error: any) {
    return error.response
  }
}

export const login = async (data: LoginUserFields) => {
  return apiRequest<LoginUserFields, UserType>(
    `${apiRoutes.LOGIN}`,
    'POST',
    data,
  )
}

export const firebaseLogin = async (idToken: string) => {
  try {
    const response = await axiosInstance.post<string, UserType>(
      apiRoutes.FIREBASE_LOGIN,
      {
        idToken,
      },
    )
    return response
  } catch (error: any) {
    return error.response
  }
}

export const register = async (data: RegisterUserFields) => {
  return apiRequest<RegisterUserFields, UserType>(
    `${apiRoutes.REGISTER}`,
    'POST',
    data,
  )
}

export const refreshTokens = async () => {
  try {
    const response = await axiosInstance.post<undefined, UserType>(
      apiRoutes.REFRESH_TOKENS,
    )
    return response
  } catch (error: any) {
    return error.response
  }
}

export const uploadAvatar = async (formData: FormData, _id: string) => {
  try {
    const response = await axiosInstance.post<FormData, void>(
      `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${_id}`,
      formData,
    )
    return response
  } catch (error: any) {
    return error.response
  }
}

export const createUser = async (data: CreateUserFields) => {
  try {
    const response = await axiosInstance.post<CreateUserFields, UserType>(
      apiRoutes.USERS_PREFIX,
      data,
    )
    return response
  } catch (error: any) {
    return error.response
  }
}

export const fetchCurrUser = async () => {
  try {
    const response = await axiosInstance.get<undefined, UserType>(apiRoutes.ME)
    return response
  } catch (error: any) {
    return error.response
  }
}

export const checkUserRole = async () => {
  try {
    const response = await axiosInstance.get<undefined, boolean>(
      apiRoutes.ADMIN,
    )
    return response
  } catch (error: any) {
    return error.response
  }
}

export const fetchUsers = async (pageNumber: number) => {
  return await apiRequest<never, PaginatedResult<UserType>>(
    `${apiRoutes.USERS_PREFIX}?page=${pageNumber}`,
    'GET',
  )
}

export const fetchUser = async (_id: string) => {
  try {
    const response = await axiosInstance.get(`${apiRoutes.FETCH_USERS}/${_id}`)
    return response
  } catch (error: any) {
    return error.response
  }
}

export const updateUser = async (data: UpdateUserFields, _id: string) => {
  return await apiRequest<UpdateUserFields, void>(
    `${apiRoutes.FETCH_USERS}/${_id}`,
    'PATCH',
    data,
  )
}

export const passwordResetEmail = async ({ email }: UpdateUserFields) => {
  return apiRequest<UpdateUserFields, void>(
    `${apiRoutes.ME}/reset-password`,
    'POST',
    {
      email,
    },
  )
}

export const fetchTokenInfo = async (user_id: string, token: string) => {
  return apiRequest<never, boolean>(
    `${apiRoutes.USERS_PREFIX}/${user_id}/${token}`,
    'GET',
  )
}

export const updateUserPass = async ({
  password,
  new_password,
  confirm_password,
}: UpdateUserFields) => {
  return apiRequest<UpdateUserFields, void>(
    `${apiRoutes.ME}/update-password`,
    'GET',
    {
      password,
      new_password,
      confirm_password,
    },
  )
}

export const deleteUser = async (_id: string) => {
  return await apiRequest<never, void>(
    `${apiRoutes.USERS_PREFIX}/${_id}`,
    'DELETE',
  )
}
