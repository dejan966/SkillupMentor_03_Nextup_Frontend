export type EventFormState = {
  success: string
  errors: {
    name: string
    location: string
    date: string
    hour: string
    max_users: string
    description: string
    eventImage: string[]
    apiError: string
  }
}
