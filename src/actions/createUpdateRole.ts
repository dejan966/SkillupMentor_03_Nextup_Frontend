'use server'

import { apiRoutes } from '@/constants/apiConstants'
import { StatusCode } from '@/constants/errorConstants'
import { createServerAxiosInstance } from '@/lib/axiosInstance'
import { RoleFormState } from '@/models/roleFormState'
import { cookies } from 'next/headers'
import { z } from 'zod'

const cookieStore = cookies()
const allCookies = cookieStore.getAll()
const cookieString = allCookies
  .map((cookie) => `${cookie.name}=${cookie.value}`)
  .join('; ')

const axiosServerInstance = createServerAxiosInstance(cookieString)

const createRoleSchema = z.object({
  name: z.string().min(1, { message: 'Role is required' }),
})

const updateRoleSchema = z.object({
  name: z.string().optional(),
})

export async function createRoleAction(
  prevState: RoleFormState,
  formData: FormData,
): Promise<RoleFormState> {
  const validatedRoleFormData = createRoleSchema.safeParse({
    name: formData.get('name'),
  })
  if (!validatedRoleFormData.success) {
    const formFieldErrors = validatedRoleFormData.error.flatten().fieldErrors
    return {
      success: '',
      errors: {
        name: formFieldErrors.name![0],
        apiError: '',
      },
    }
  }

  const response = await axiosServerInstance.post(
    apiRoutes.ROLES_PREFIX,
    validatedRoleFormData.data,
  )
  if (
    response?.status === StatusCode.BAD_REQUEST ||
    response?.status === StatusCode.INTERNAL_SERVER_ERROR
  ) {
    return {
      success: '',
      errors: {
        name: '',
        apiError: response?.data.message,
      },
    }
  }

  return {
    success: 'Role created successfully',
    errors: {
      name: '',
      apiError: '',
    },
  }
}

export async function updateRoleAction(
  prevState: RoleFormState,
  formData: FormData,
  _id: string,
): Promise<RoleFormState> {
  const validatedRoleFormData = updateRoleSchema.safeParse({
    name: formData.get('name'),
  })
  if (!validatedRoleFormData.success) {
    const formFieldErrors = validatedRoleFormData.error.flatten().fieldErrors
    return {
      success: '',
      errors: {
        name: formFieldErrors.name![0],
        apiError: '',
      },
    }
  }

  const response = await axiosServerInstance.patch(
    `${apiRoutes.ROLES_PREFIX}/${_id}`,
    validatedRoleFormData.data,
  )
  if (
    response?.status === StatusCode.BAD_REQUEST ||
    response?.status === StatusCode.INTERNAL_SERVER_ERROR
  ) {
    return {
      success: '',
      errors: {
        name: '',
        apiError: response?.data.message,
      },
    }
  }

  return {
    success: 'Role updated successfully',
    errors: {
      name: '',
      apiError: '',
    },
  }
}
