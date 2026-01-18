'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { routes } from '@/constants/routesConstants'
import Link from 'next/link'
import Button from '../ui/Button'
import { useFormState } from 'react-dom'
import { updateUserAction } from '@/actions/createUpdateUser'
import { UserFormState } from '@/models/userFormState'
import FormControl from '../ui/FormControl'
import Input from '../ui/Input'
import Label from '../ui/Label'
import FormContainer from '../ui/FormContainer'
import DivCentered from '../ui/DivCentered'
import { UserFormData } from '@/hooks/react-hook-forms/useCreateUpdateUser'

type Props = {
  defaultValues: UserFormData
}

const initialState = {
  success: '',
  errors: {
    avatar: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    new_password: '',
    confirm_password: '',
    role: '',
    apiError: '',
  },
}

export default function UpdateUserForm({ defaultValues }: Props) {
  const actionWithId = async (prevState: UserFormState, formData: FormData) => {
    return updateUserAction(prevState, formData, defaultValues._id)
  }

  const [state, formAction] = useFormState(actionWithId, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      router.back()
    }
  }, [state.success])

  return (
    <DivCentered>
      <FormContainer>
        <h1 className="text-6xl font-bold">Profile settings</h1>
        <div className="mb-4">Change your profile settings</div>
        <form action={formAction}>
          <div className="flex justify-between">
            <div>
              <Label content="First name" />
              <Input
                defaultValue={defaultValues?.first_name || ''}
                name="first_name"
                type="text"
                aria-label="First name"
                aria-describedby="first_name"
                errors={state?.errors}
              />
              <FormControl message={state?.errors?.first_name} />
            </div>
            <div className="col-md-5">
              <Label content="Last name" />
              <Input
                defaultValue={defaultValues?.last_name || ''}
                name="last_name"
                type="text"
                aria-label="Last name"
                aria-describedby="last_name"
                errors={state?.errors}
              />
              <FormControl message={state?.errors?.last_name} />
            </div>
          </div>
          <Label content="Email" />
          <Input
            defaultValue={defaultValues?.email || ''}
            name="email"
            type="email"
            aria-label="Email"
            aria-describedby="email"
            errors={state?.errors}
          />
          <FormControl message={state?.errors?.email} />
          <FormControl message={state?.errors?.apiError} />
          <Button className="bg-pink-500 hover:bg-pink-300 mb-4">
            <Link href={routes.USERAVATAREDIT}>Change your avatar</Link>
          </Button>
          <Button className="mb-4">
            <Link href={routes.USERPASSWORDRESET}>Change your password</Link>
          </Button>
          <div className="flex items-center justify-between">
            <Button variant="default" className="w-28 uppercase" type="submit">
              Submit
            </Button>
            <a href={routes.USERINFO}>Cancel</a>
          </div>
        </form>
      </FormContainer>
    </DivCentered>
  )
}
