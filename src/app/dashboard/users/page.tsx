'use client'

import useFirebaseAuth from '@/hooks/firebase/useFirebaseAuth'
import { fetchUsers, fetchCurrUser } from '@/lib/user'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import UserTable from '@/components/users/UserTable'

export default function AdminPanel() {
  const [token] = useFirebaseAuth()
  const [pageNumber, setPageNumber] = useState(1)
  const [allUsers, setAllUsers] = useState<any>([])

  const fetchAllUsers = async () => {
    let res
      if (token !== '')
        res = await fetchUsers(pageNumber, {
          headers: { Authorization: `Bearer ${token}` },
        })
      else res = await fetchUsers(pageNumber)
      setAllUsers(res.data)
  }
  
  useEffect(()=>{
    fetchAllUsers()
  }, [pageNumber])
  const { data: currUser } = useQuery({
    queryKey: ['currUser'],
    queryFn: async () => {
      let data
      if (token !== '')
        data = await fetchCurrUser({
          headers: { Authorization: `Bearer ${token}` },
        })
      else data = await fetchCurrUser()
      return data
    },
  })

  if (currUser) {
    if (currUser?.data.role.name !== 'ADMIN') {
      notFound()
    }
  }

  return (
      <UserTable users={allUsers?.data} setPageNumber={setPageNumber} meta={allUsers?.meta} />

  )
}
