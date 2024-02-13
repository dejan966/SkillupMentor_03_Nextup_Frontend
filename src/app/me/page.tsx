'use client'
import { getCurrUser } from '@/hooks/useUsers'
import Link from 'next/link'

import { routes } from '@/enums/routesConstants'
import authStore from '@/stores/auth.store'

export default function UserInfo() {
  const { data: currUser, isLoading: isLoadingUser } = getCurrUser()

  return (
    <div>
      {isLoadingUser ? (
        <div>Loading...</div>
      ) : (
        <>
          {currUser.data && (
            <div className="centered">
              <div className="px-8 pt-6 pb-8 mb-4 w-2/5">
                <h1 className="text-4xl font-bold text-center">Your info!</h1>
                <div>
                  <div className="flex justify-center">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/avatars/${authStore.user?.avatar}`}
                      alt="Avatar"
                      className="userAvatar"
                      width={110}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="mb-4">
                      <div className="w-[16.5rem]">
                        <label className="inputText">First name</label>
                        <input
                          name="first_name"
                          type="text"
                          value={currUser.data.first_name}
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
                          value={currUser.data.last_name}
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
                      value={currUser.data.email}
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
                    <p>Delete account</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
