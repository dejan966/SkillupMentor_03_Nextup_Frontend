import { apiRoutes } from '@/constants/apiConstants'
import {
  CreateRoleFields,
  UpdateRoleFields,
} from '@/hooks/react-hook-forms/useCreateUpdateRole'
import { apiRequest } from './axiosInstance'
import { RoleType } from '@/models/role'
import { PaginatedResult } from '@/models/paginated-result'

export const fetchRole = async (_id: string) => {
  return await apiRequest<undefined, RoleType>(
    `${apiRoutes.FETCH_ROLES}/${_id}`,
    'GET',
  )
}

export const fetchRoles = async (pageNumber: number) => {
  return await apiRequest<never, PaginatedResult<RoleType>>(
    `${apiRoutes.FETCH_ROLES}?page=${pageNumber}`,
    'GET',
  )
}

export const createRole = async (data: CreateRoleFields) => {
  return await apiRequest<CreateRoleFields, void>(
    apiRoutes.ROLES_PREFIX,
    'POST',
    data,
  )
}

export const updateRole = async (data: UpdateRoleFields, _id: string) => {
  return await apiRequest<UpdateRoleFields, void>(
    `${apiRoutes.ROLES_PREFIX}/${_id}`,
    'PATCH',
    data,
  )
}

export const deleteRole = async (_id: string) => {
  return await apiRequest<never, RoleType>(
    `${apiRoutes.ROLES_PREFIX}/${_id}`,
    'DELETE',
  )
}
