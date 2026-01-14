import { Types, ObjectId } from 'mongoose'
import { UserType } from './auth'

export type EventType = {
  _id: string
  id: string
  name: string
  image: string
  description: string
  location: string
  event_date: string
  date: string
  hour: string
  max_users: number
  creator: UserType
}
