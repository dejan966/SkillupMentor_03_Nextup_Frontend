export type UserFormState = {
  success: string
  errors: {
    first_name: string
    last_name: string
    email: string
    password: string
    new_password: string
    confirm_password: string
    role: string
    userImage: string
    apiError: string
  }
}
