import { RolePermissionType } from './role-permission'

export type RoleType = {
  _id: string
  id: string
  name: string
  permissions: RolePermissionType[]
}
