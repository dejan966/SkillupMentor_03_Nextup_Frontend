'use client'

import Grid from '@/components/ui/Grid'
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
    <Grid className="laptop:grid-cols-3 tablet:grid-cols-2 gap-4">
      <Grid className="p-4 phone:h-40 tablet:h-20 rounded-xl bg-white shadow-lg my-4">
        <Link href="/dashboard/users">Users</Link>
        <div>Operations on Users table</div>
      </Grid>
      <Grid className="p-4 phone:h-40 tablet:h-20 rounded-xl bg-white shadow-lg my-4">
        <Link href="/dashboard/events">Events</Link>
        <div>Operations on Events table</div>
      </Grid>
      <Grid className="p-4 phone:h-40 tablet:h-20 rounded-xl bg-white shadow-lg my-4">
        <Link href="/dashboard/roles">Roles</Link>
        <div>Operations on Roles table</div>
      </Grid>
    </Grid>
  )
}
