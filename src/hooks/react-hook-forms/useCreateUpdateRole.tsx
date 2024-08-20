import { RoleType } from '@/models/role'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export interface CreateRoleFields {
  name: string
}

export interface UpdateRoleFields {
  name?: string
}

interface Props {
  defaultValues?: RoleType
}

const createRoleSchema = z.object({
  name: z.string().min(1, { message: 'Role is required' }),
})

const updateRoleSchema = z.object({
  name: z.string().optional(),
})

export const useCreateUpdateRoleForm = ({ defaultValues }: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      name: '',
      ...defaultValues,
    },
    mode: 'onSubmit',
    resolver: defaultValues
      ? zodResolver(updateRoleSchema)
      : zodResolver(createRoleSchema),
  })

  return {
    handleSubmit,
    errors,
    reset,
    control,
  }
}

export type CreateRoleForm = z.infer<typeof createRoleSchema>
export type UpdateRoleForm = z.infer<typeof updateRoleSchema>
