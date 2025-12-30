'use client'

import { notFound, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { RoleType } from '@/models/role'
import { fetchCurrUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import Button from '../ui/Button'
import { createRoleAction, updateRoleAction } from '@/actions/createUpdateRole'
import { useFormState } from 'react-dom'
import { RoleFormState } from '@/models/roleFormState'
import FormControl from '../ui/FormControl'
import Input from '../ui/Input'
import Label from '../ui/Label'

type Props = {
  defaultValues?: RoleType
  title: string
}

const initialState = {
  success: '',
  errors: {
    name: '',
    apiError: '',
  },
}

export default function CreateUpdateRole({ defaultValues, title }: Props) {
  const actionWithId = async (prevState: RoleFormState, formData: FormData) => {
    if (defaultValues) {
      return updateRoleAction(prevState, formData, defaultValues._id)
    }
    return createRoleAction(prevState, formData)
  }

  const [state, formAction] = useFormState(actionWithId, initialState)

  const router = useRouter()

  const { data: currUser } = useQuery({
    queryKey: ['currUser'],
    queryFn: fetchCurrUser,
  })

  useEffect(() => {
    if (state.success) {
      router.back()
    }
  }, [state.success])

  if (currUser) {
    if (currUser?.data.role.name !== 'ADMIN') {
      notFound()
    }
  }

  return (
    <div className="centeredRoles">
      <div>
        <h1 className="text-2xl text-black font-bold mb-4">{title}</h1>
        <form action={formAction}>
          <Label content="Role" />
          <Input
            defaultValue={defaultValues?.name || ''}
            name="name"
            type="text"
            aria-label="name"
            aria-describedby="name"
            errors={state?.errors}
          />
          <FormControl message={state?.errors?.name} />
          <FormControl message={state?.errors?.apiError} />
          <FormControl classname="text-green-600" message={state?.success} />
          <div>
            <Button variant="default" className="mb-4" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
