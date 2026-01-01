'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Button from '../ui/Button'
import Label from '../ui/Label'
import FormControl from '../ui/FormControl'
import { useFormState } from 'react-dom'
import { updateUserPassword } from '@/actions/createUpdateUser'
import Input from '../ui/Input'

const initialState = {
  success: '',
  errors: {
    password: '',
    new_password: '',
    confirm_password: '',
    apiError: '',
  },
}

export default function UpdatePasswordForm() {
  const [state, formAction] = useFormState(updateUserPassword, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      router.back()
    }
  }, [state.success])

  return (
    <div className="centered">
      <div className="px-8 pt-6 pb-8 mb-4 w-2/5">
        <h1 className="text-6xl font-bold">Profile settings</h1>
        <div className="mb-3">Change your password</div>
        <form action={formAction}>
          <Label content="Old password" />
          <Input
            name="password"
            type="password"
            placeholder="******"
            aria-label="Password"
            aria-describedby="password"
            errors={state?.errors}
          />
          <FormControl message={state?.errors?.password} />
          <Label content="New password" />
          <Input
            name="new_password"
            type="password"
            placeholder="******"
            aria-label="newPassword"
            aria-describedby="newPassword"
            errors={state?.errors}
          />
          <FormControl message={state?.errors?.new_password} />
          <Label content="Confirm new password" />
          <Input
            name="confirm_password"
            type="password"
            placeholder="******"
            aria-label="confirm_password"
            aria-describedby="confirm_password"
            errors={state?.errors}
          />
          <FormControl message={state?.errors?.confirm_password} />
          <FormControl message={state?.errors?.apiError} />
          <div className="flex items-center justify-between">
            <Button variant="default" className="w-28 uppercase" type="submit">
              Submit
            </Button>
            <button onClick={() => router.back()}>Back</button>
          </div>
        </form>
      </div>
    </div>
  )
}
