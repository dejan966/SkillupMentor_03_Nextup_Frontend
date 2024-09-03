import Link from 'next/link'

export default function DashboardPanel() {
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
