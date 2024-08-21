import { apiRoutes } from '@/enums/apiConstants'
import { LoginUserFields } from '@/hooks/react-hook-forms/useLogin'
import { RegisterUserFields } from '@/hooks/react-hook-forms/useRegister'
import { UpdateUserFields } from '@/hooks/react-hook-forms/useUpdateUserForm'
import { User } from 'firebase/auth'
import axiosInstance from './axiosInstance'

export const userSignout = async () => {
  try {
    const response = await axiosInstance.post(apiRoutes.SIGNOUT)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const firebaseUserSignout = async () => {
  try {
    const response = await axiosInstance.post(apiRoutes.FIREBASE_SIGNOUT)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const login = async (data: LoginUserFields) => {
  try {
    const response = await axiosInstance.post(apiRoutes.LOGIN, data)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const firebaseLogin = async (user: User) => {
  try {
    const response = await axiosInstance.post(apiRoutes.FIREBASE_LOGIN, user)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const register = async (data: RegisterUserFields) => {
  try {
    const response = await axiosInstance.post(apiRoutes.REGISTER, data)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const refreshTokens = async () => {
  try {
    const response = await axiosInstance.get(apiRoutes.REFRESH_TOKENS)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const uploadAvatar = async (formData: FormData, _id: string) => {
  try {
    const response = await axiosInstance.post(
      `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${_id}`,
      formData,
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const fetchCurrUser = async () => {
  try {
    const response = await axiosInstance.get(apiRoutes.ME)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const fetchUsers = async (pageNumber: number) => {
  try {
    const response = await axiosInstance.get(
      `${apiRoutes.USERS_PREFIX}?page=${pageNumber}`,
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const fetchUser = async (_id: string) => {
  try {
    const response = await axiosInstance.get(`${apiRoutes.FETCH_USERS}/${_id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = async (data: UpdateUserFields, _id: string) => {
  try {
    const response = await axiosInstance.patch(
      `${apiRoutes.USERS_PREFIX}/${_id}`,
      data,
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const passwordResetEmail = async ({ email }: UpdateUserFields) => {
  try {
    const response = await axiosInstance.post(
      `${apiRoutes.ME}/reset-password`,
      { email },
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const fetchTokenInfo = async (user_id: string, token: string) => {
  try {
    const response = await axiosInstance.get(
      `${apiRoutes.USERS_PREFIX}/${user_id}/${token}`,
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const updateUserPass = async ({
  password,
  new_password,
  confirm_password,
}: UpdateUserFields) => {
  try {
    const response = await axiosInstance.patch(
      `${apiRoutes.ME}/update-password`,
      { password, new_password, confirm_password },
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (_id: string) => {
  try {
    const response = await axiosInstance.delete(
      `${apiRoutes.USERS_PREFIX}/${_id}`,
    )
    return response
  } catch (error) {
    console.log(error)
  }
}
