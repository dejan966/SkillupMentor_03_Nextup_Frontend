'use client'

import Link from 'next/link'
import { fetchCurrUser } from '@/lib/user'
import { routes } from '@/enums/routesConstants'
import { useQuery } from '@tanstack/react-query'
import useLocalStorage from '@/hooks/useLocalStorage'
import Image from 'next/image'

export default function UserInfo() {
  const [value] = useLocalStorage()
  const {
    data: currUser,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['currUser'],
    queryFn: fetchCurrUser,
  })

  if (isError) {
    return (
      <div>
        <h2>Something went wrong!</h2>
        <button
          type="button"
          className="blue text-white h-12 w-20 rounded-xl"
          onClick={() => refetch()}
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="centered">
      <div className="px-8 pt-6 pb-8 mb-4 w-2/5">
        <h1 className="text-6xl font-bold text-center">Your info!</h1>
        <div>
          <div className="flex justify-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/avatars/${value.avatar}`}
              alt="Avatar"
              className="userAvatar"
              width={120}
              height={120}
            />
          </div>
          <div className="flex justify-between">
            <div className="mb-4">
              <div className="w-[16.5rem]">
                <label className="inputText">First name</label>
                <input
                  name="first_name"
                  type="text"
                  value={currUser?.data.first_name}
                  aria-label="First name"
                  aria-describedby="first_name"
                  className="tailwind-form-control"
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="w-[16.5rem]">
                <label className="inputText">Last name</label>
                <input
                  name="last_name"
                  type="text"
                  value={currUser?.data.last_name}
                  aria-label="Last name"
                  aria-describedby="last_name"
                  className="tailwind-form-control"
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="inputText">Email</label>
            <input
              name="email"
              type="email"
              value={currUser?.data.email}
              aria-label="Email"
              aria-describedby="email"
              className="tailwind-form-control"
              readOnly
            />
          </div>
          <div className="flex justify-between">
            <Link href={routes.USEREDIT}>
              <button
                type="button"
                className="blue text-white rounded-full h-10 w-28"
              >
                Edit
              </button>
            </Link>
            <button type="button">Delete account</button>
          </div>
        </div>
      </div>
    </div>
  )
}
