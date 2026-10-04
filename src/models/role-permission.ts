import { PermissionType } from './permission'
import { RoleType } from './role'

export type RolePermissionType = {
  _id: string
  permission: PermissionType
  role: RoleType
}
