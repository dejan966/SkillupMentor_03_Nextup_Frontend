'use client'

import { useAuth } from '@/contexts/AuthContext'
import { checkUserRole } from '@/lib/user'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function DashboardPanel() {
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
  return (
    <div>
      <div>
        <Link href="/dashboard/users">Users</Link>
      </div>
      <div>
        <Link href="/dashboard/events">Events</Link>
      </div>
      <div>
        <Link href="/dashboard/roles">Roles</Link>
      </div>
    </div>
  )
}
