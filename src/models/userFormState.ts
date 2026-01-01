export type UserFormState = {
  success: string
  errors: {
    avatar: string
    first_name: string
    last_name: string
    email: string
    password: string
    new_password: string
    confirm_password: string
    role: string
    apiError: string
  }
}

export type PasswordFormState = {
  success: string
  errors: {
    password: string
    new_password: string
    confirm_password: string
    apiError: string
  }
}
