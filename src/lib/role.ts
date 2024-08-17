import { apiRoutes } from '@/enums/apiConstants'
import { apiRequest } from './api'
import { RoleType } from '@/models/role'
import {
  CreateRoleFields,
  UpdateRoleFields,
} from '@/hooks/react-hook-forms/useCreateUpdateRole'

export const fetchRole = async (_id: string) =>
  apiRequest<undefined, RoleType>('get', `${apiRoutes.FETCH_ROLES}/${_id}`)

export const fetchRoles = async (headers?: {}) =>
  apiRequest<undefined, RoleType>(
    'get',
    apiRoutes.FETCH_ROLES,
    undefined,
    headers,
  )

export const createRole = async (data: CreateRoleFields, headers?: {}) =>
  apiRequest<CreateRoleFields, void>(
    'post',
    apiRoutes.ROLES_PREFIX,
    data,
    headers,
  )

export const updateRole = async (
  data: UpdateRoleFields,
  _id: string,
  headers?: {},
) =>
  apiRequest<UpdateRoleFields, RoleType>(
    'patch',
    `${apiRoutes.ROLES_PREFIX}/${_id}`,
    data,
    headers,
  )

export const deleteRole = async (id: string) =>
  apiRequest<string, RoleType>('delete', `${apiRoutes.ROLES_PREFIX}/${id}`)
