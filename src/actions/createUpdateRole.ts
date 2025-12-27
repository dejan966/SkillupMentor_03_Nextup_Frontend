import { StatusCode } from '@/constants/errorConstants'
import { createRole, updateRole } from '@/lib/role'
import { RoleFormState } from '@/models/roleFormState'
import { z } from 'zod'

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

  const response = await createRole(validatedRoleFormData.data)
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

  const response = await updateRole(validatedRoleFormData.data, _id)
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
