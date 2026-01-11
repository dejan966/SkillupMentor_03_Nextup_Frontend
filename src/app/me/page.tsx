'use client'

import Link from 'next/link'
import { routes } from '@/constants/routesConstants'
import Button from '@/components/ui/Button'
import Label from '@/components/ui/Label'
import Input from '@/components/ui/Input'
import { useAuth } from '@/contexts/AuthContext'
import FormContainer from '@/components/ui/FormContainer'
import Avatar from '@/components/ui/Avatar'
import DivCentered from '@/components/ui/DivCentered'

export default function UserInfo() {
  const { user } = useAuth()

  return (
    <DivCentered>
      <FormContainer>
        <h1 className="text-6xl font-bold text-center">Your info!</h1>
        <div>
          <div className="flex justify-center">
            <Avatar
              src={
                user?.avatar.startsWith('https')
                  ? user?.avatar
                  : `${process.env.NEXT_PUBLIC_API_URL}/uploads/avatars/${user?.avatar}`
              }
              alt="Avatar"
              width={120}
              height={120}
            />
          </div>
          <div className="flex justify-between">
            <div className="mb-4">
              <div className="w-[16.5rem]">
                <Label content="First name" />
                <Input
                  value={user?.first_name}
                  name="first_name"
                  type="text"
                  aria-label="First name"
                  aria-describedby="first_name"
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="w-[16.5rem]">
                <Label content="Last name" />
                <Input
                  value={user?.last_name}
                  name="last_name"
                  type="text"
                  aria-label="Last name"
                  aria-describedby="last_name"
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <Label content="Email" />
            <Input
              value={user?.email}
              name="email"
              type="email"
              aria-label="Email"
              aria-describedby="email"
              readOnly
            />
          </div>
          <div className="flex justify-between">
            <Link href={routes.USEREDIT}>
              <Button variant="default" className="w-28">
                Edit
              </Button>
            </Link>
            <button>Delete account</button>
          </div>
        </div>
      </FormContainer>
    </DivCentered>
  )
}
