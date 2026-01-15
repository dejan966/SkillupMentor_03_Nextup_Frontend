'use server'

import { apiRoutes } from '@/constants/apiConstants'
import { StatusCode } from '@/constants/errorConstants'
import { createServerAxiosInstance } from '@/lib/axiosInstance'
import { PasswordFormState, UserFormState } from '@/models/userFormState'
import { cookies } from 'next/headers'
import { z } from 'zod'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

const cookieStore = cookies()
const allCookies = cookieStore.getAll()
const cookieString = allCookies
  .map((cookie) => `${cookie.name}=${cookie.value}`)
  .join('; ')

const axiosServerInstance = createServerAxiosInstance(cookieString)

const createUserSchema = z
  .object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Must be a valid email' }),
    password: z
      .string()
      .regex(/.*[A-Z].*/, 'One uppercase character')
      .regex(/.*[a-z].*/, 'One lowercase character')
      .regex(/.*\d.*/, 'One number')
      .regex(
        /.*[`~<>?,./!@#$%^&*()\-_+="'|{}\[\];:\\].*/,
        'One special character',
      )
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirm_password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    role_id: z.string({ required_error: 'A role must be selected.' }),
    avatar: z
      .instanceof(File, { message: 'It has to be of type file.' })
      .optional()
      .refine(
        (file) => !file || file.size <= MAX_FILE_SIZE,
        'Max image size is 5MB.',
      )
      .refine(
        (file) =>
          !file ||
          file!.size === 0 ||
          ACCEPTED_IMAGE_TYPES.includes(file!.type),
        'Only .jpg, .jpeg, .png formats are supported.',
      ),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords does not match',
  })

const updateUserSchema = z
  .object({
    avatar: z
      .instanceof(File, { message: 'It has to be of type file.' })
      .optional()
      .refine(
        (file) => !file || file.size <= MAX_FILE_SIZE,
        'Max image size is 5MB.',
      )
      .refine(
        (file) =>
          !file ||
          file!.size === 0 ||
          ACCEPTED_IMAGE_TYPES.includes(file!.type),
        'Only .jpg, .jpeg, .png formats are supported.',
      ),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    new_password: z.string().optional(),
    confirm_password: z.string().optional(),
    role_id: z.string().optional(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
  })

const updateUserPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(/.*[A-Z].*/, 'One uppercase character')
      .regex(/.*[a-z].*/, 'One lowercase character')
      .regex(/.*\d.*/, 'One number')
      .regex(
        /.*[`~<>?,./!@#$%^&*()\-_+="'|{}\[\];:\\].*/,
        'One special character',
      )
      .min(6, { message: 'Password must be at least 6 characters.' }),
    new_password: z
      .string()
      .regex(/.*[A-Z].*/, 'One uppercase character')
      .regex(/.*[a-z].*/, 'One lowercase character')
      .regex(/.*\d.*/, 'One number')
      .regex(
        /.*[`~<>?,./!@#$%^&*()\-_+="'|{}\[\];:\\].*/,
        'One special character',
      )
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirm_password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
  })

export async function createUserAction(
  prevState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  const validatedUserFormData = createUserSchema.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
    new_password: formData.get('new_password') || '',
    role_id: formData.get('role_id'),
    avatar: formData.get('avatar'),
  })

  if (!validatedUserFormData.success) {
    const formFieldErrors = validatedUserFormData.error.flatten().fieldErrors
    return {
      success: '',
      errors: {
        first_name: formFieldErrors.first_name?.[0] || '',
        last_name: formFieldErrors.last_name?.[0] || '',
        email: formFieldErrors.email?.[0] || '',
        password: formFieldErrors.password?.[0] || '',
        new_password: '',
        confirm_password: formFieldErrors.confirm_password?.[0] || '',
        role_id: formFieldErrors.role_id?.[0] || '',
        avatar: formFieldErrors.avatar?.[0] || '',
        apiError: '',
      },
    }
  }

  const { avatar: avatar2, ...rest } = validatedUserFormData.data
  const avatar = formData.get('avatar')
  try {
    const response = await axiosServerInstance.post(
      apiRoutes.USERS_PREFIX,
      rest,
    )
    if (validatedUserFormData.data.avatar?.size != 0) {
      await axiosServerInstance.post(
        `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${response.data._id}`,
        formData,
      )
    }
  } catch (error: any) {
    console.log(error)
    return {
      success: '',
      errors: {
        avatar: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        new_password: '',
        confirm_password: '',
        role_id: '',
        apiError: error.response?.data.message,
      },
    }
  }

  return {
    success: 'User registered successfully',
    errors: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      new_password: '',
      confirm_password: '',
      role_id: '',
      avatar: '',
      apiError: '',
    },
  }
}

export async function updateUserAction(
  prevState: UserFormState,
  formData: FormData,
  _id: string,
): Promise<UserFormState> {
  const validatedUserFormData = updateUserSchema.safeParse({
    first_name: formData.get('first_name') || undefined,
    last_name: formData.get('last_name') || undefined,
    email: formData.get('email') || undefined,
    password: formData.get('password') || undefined,
    new_password: formData.get('new_password') || undefined,
    confirm_password: formData.get('confirm_password') || undefined,
    role_id: formData.get('role_id') || undefined,
    avatar: formData.get('avatar') || undefined,
  })

  if (!validatedUserFormData.success) {
    const formFieldErrors = validatedUserFormData.error.flatten().fieldErrors
    return {
      success: '',
      errors: {
        first_name: formFieldErrors.first_name?.[0] || '',
        last_name: formFieldErrors.last_name?.[0] || '',
        email: formFieldErrors.email?.[0] || '',
        password: formFieldErrors.password?.[0] || '',
        new_password: formFieldErrors.new_password?.[0] || '',
        confirm_password: formFieldErrors.confirm_password?.[0] || '',
        role_id: formFieldErrors.role_id?.[0] || '',
        avatar: formFieldErrors.avatar?.[0] || '',
        apiError: '',
      },
    }
  }
  const response = await axiosServerInstance.patch(
    `${apiRoutes.USERS_PREFIX}/${_id}`,
    validatedUserFormData.data,
  )
  if (
    response?.status === StatusCode.BAD_REQUEST ||
    response?.status === StatusCode.INTERNAL_SERVER_ERROR
  ) {
    return {
      success: '',
      errors: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        new_password: '',
        confirm_password: '',
        role_id: '',
        avatar: '',
        apiError: response?.data.message,
      },
    }
  }

  return {
    success: 'User updated successfully',
    errors: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      new_password: '',
      confirm_password: '',
      role_id: '',
      avatar: '',
      apiError: '',
    },
  }
}

export async function updateUserPassword(
  prevState: PasswordFormState,
  formData: FormData,
): Promise<PasswordFormState> {
  const validatedUserFormData = updateUserPasswordSchema.safeParse({
    password: formData.get('password'),
    new_password: formData.get('new_password'),
    confirm_password: formData.get('confirm_password'),
  })

  if (!validatedUserFormData.success) {
    const formFieldErrors = validatedUserFormData.error.flatten().fieldErrors
    return {
      success: '',
      errors: {
        password: formFieldErrors.password?.[0] || '',
        new_password: formFieldErrors.new_password?.[0] || '',
        confirm_password: formFieldErrors.confirm_password?.[0] || '',
        apiError: '',
      },
    }
  }
  const response = await axiosServerInstance.patch(
    `${apiRoutes.ME}/update-password`,
    validatedUserFormData.data,
  )
  if (
    response?.status === StatusCode.BAD_REQUEST ||
    response?.status === StatusCode.INTERNAL_SERVER_ERROR
  ) {
    return {
      success: '',
      errors: {
        password: '',
        new_password: '',
        confirm_password: '',
        apiError: response?.data.message,
      },
    }
  }

  return {
    success: 'User password updated successfully',
    errors: {
      password: '',
      new_password: '',
      confirm_password: '',
      apiError: '',
    },
  }
}

export async function updateUserAvatar(
  prevState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  const validatedUserFormData = updateUserSchema.safeParse({
    first_name: formData.get('first_name') || undefined,
    last_name: formData.get('last_name') || undefined,
    email: formData.get('email') || undefined,
    password: formData.get('password') || undefined,
    new_password: formData.get('new_password') || undefined,
    confirm_password: formData.get('confirm_password') || undefined,
    role_id: formData.get('role_id') || undefined,
    avatar: formData.get('avatar'),
  })

  if (!validatedUserFormData.success) {
    const formFieldErrors = validatedUserFormData.error.flatten().fieldErrors
    return {
      success: '',
      errors: {
        first_name: formFieldErrors.first_name?.[0] || '',
        last_name: formFieldErrors.last_name?.[0] || '',
        email: formFieldErrors.email?.[0] || '',
        password: formFieldErrors.password?.[0] || '',
        new_password: formFieldErrors.new_password?.[0] || '',
        confirm_password: formFieldErrors.confirm_password?.[0] || '',
        role_id: formFieldErrors.role_id?.[0] || '',
        avatar: formFieldErrors.avatar?.[0] || '',
        apiError: '',
      },
    }
  }
  const response = await axiosServerInstance.post(
    `${apiRoutes.ME}/update-avatar`,
    formData,
  )
  if (
    response?.status === StatusCode.BAD_REQUEST ||
    response?.status === StatusCode.INTERNAL_SERVER_ERROR
  ) {
    return {
      success: '',
      errors: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        new_password: '',
        confirm_password: '',
        role_id: '',
        avatar: '',
        apiError: response?.data.message,
      },
    }
  }

  return {
    success: 'User avatar updated successfully',
    errors: {
      avatar: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      new_password: '',
      confirm_password: '',
      role_id: '',
      apiError: '',
    },
  }
}
