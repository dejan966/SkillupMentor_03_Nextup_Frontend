import { UserType } from './auth'

export type EventType = {
  _id: string
  name: string
  location: string
  date: string
  hour: string
  max_users: number
  creator: UserType
}
