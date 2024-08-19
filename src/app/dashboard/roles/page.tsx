'use client'

import useFirebaseAuth from '@/hooks/firebase/useFirebaseAuth'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { fetchRoles } from '@/lib/role'
import { notFound } from 'next/navigation'
import { RoleType } from '@/models/role'
import { fetchCurrUser } from '@/lib/user'
import RoleTable from '@/components/roles/RoleTable'
import { useEffect, useState } from 'react'

export default function AdminPanel() {
  const [token] = useFirebaseAuth()
  const [pageNumber, setPageNumber] = useState(1)
  const [allRoles, setAllRoles] = useState<any>([])
  
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

  const fetchAllRoles = async () => {
    let res
      if (token !== '')
        res = await fetchRoles(pageNumber, {
          headers: { Authorization: `Bearer ${token}` },
        })
      else res = await fetchRoles(pageNumber)
      setAllRoles(res.data)
  }

  useEffect(()=>{
    fetchAllRoles()
  }, [pageNumber])


  if (currUser) {
    if (currUser?.data.role.name !== 'ADMIN') {
      notFound()
    }
  }

  return (
      <RoleTable roles={allRoles?.data} setPageNumber={setPageNumber} meta={allRoles?.meta} />
    
  )
}
