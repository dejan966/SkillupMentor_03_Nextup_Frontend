import { apiRoutes } from '@/enums/apiConstants'
import {
  CreateRoleFields,
  UpdateRoleFields,
} from '@/hooks/react-hook-forms/useCreateUpdateRole'
import axiosInstance from './axiosInstance'

export const fetchRole = async (_id: string) => {
  try {
    const response = await axiosInstance.get(`${apiRoutes.FETCH_ROLES}/${_id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const fetchRoles = async (pageNumber: number) => {
  try {
    const response = await axiosInstance.get(
      `${apiRoutes.FETCH_ROLES}?page=${pageNumber}`,
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const createRole = async (data: CreateRoleFields) => {
  try {
    const response = await axiosInstance.post(apiRoutes.ROLES_PREFIX, data)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const updateRole = async (data: UpdateRoleFields, _id: string) => {
  try {
    const response = await axiosInstance.patch(
      `${apiRoutes.ROLES_PREFIX}/${_id}`,
      data,
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const deleteRole = async (_id: string) => {
  try {
    const response = await axiosInstance.delete(
      `${apiRoutes.ROLES_PREFIX}/${_id}`,
    )
    return response
  } catch (error) {
    console.log(error)
  }
}
