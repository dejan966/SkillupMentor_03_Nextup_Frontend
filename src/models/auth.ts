import { EventType } from './event'
import { RoleType } from './role'

export type UserType = {
  _id: string
  id: string
  full_name: string
  first_name: string
  last_name: string
  email: string
  current_password: string
  password: string
  confirm_password: string
  role_id: string
  role: RoleType
  avatar: string
  type: string
  created_events: EventType[]
}
