'use client'

import CreateUpdateRole from '@/components/roles/CreateUpdateRole'
import { useAuth } from '@/contexts/AuthContext'
import { checkUserRole } from '@/lib/user'
import { useEffect, useState } from 'react'

export default function EventAdd() {
  const { user } = useAuth()

  const [isAdmin, setIsAdmin] = useState(false)

  const checkRole = async () => {
    const response = await checkUserRole()
    setIsAdmin(response.data)
  }
  useEffect(() => {
    checkRole()
  }, [user])

  if (isAdmin === false) {
    return (
      <div>
        <h2>Forbidden resource</h2>
      </div>
    )
  }

  return <CreateUpdateRole title="Add role" />
}
