'use server'

import { apiRoutes } from '@/constants/apiConstants'
import { StatusCode } from '@/constants/errorConstants'
import { createServerAxiosInstance } from '@/lib/axiosInstance'
import { UserFormState } from '@/models/userFormState'
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
    role: z.string({ required_error: 'A role must be selected.' }),
    userImage: z
      .instanceof(File, { message: 'It has to be of type file.' })
      .refine((file) => file.size <= MAX_FILE_SIZE, 'Max image size is 5MB.')
      .refine(
        (file) => file.size === 0 || ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Only .jpg, .jpeg, .png formats are supported.',
      )
      .optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords does not match',
  })

const updateUserSchema = z
  .object({
    avatar: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    new_password: z.string().optional(),
    confirm_password: z.string().optional(),
    role: z.string().optional(),
    userImage: z
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
    role: formData.get('role'),
    userImage: formData.get('userImage'),
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
        role: formFieldErrors.role?.[0] || '',
        userImage: formFieldErrors.userImage?.[0] || '',
        apiError: '',
      },
    }
  }

  const response = await axiosServerInstance.post(
    apiRoutes.USERS_PREFIX,
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
        role: '',
        userImage: '',
        apiError: response?.data.message,
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
      role: '',
      userImage: '',
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
    role: formData.get('role') || undefined,
    userImage: formData.get('userImage') || undefined,
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
        role: formFieldErrors.role?.[0] || '',
        userImage: formFieldErrors.userImage?.[0] || '',
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
        role: '',
        userImage: '',
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
      role: '',
      userImage: '',
      apiError: '',
    },
  }
}
