'use client'

import CreateUpdateRole from '@/components/roles/CreateUpdateRole'
import LoadingCircle from '@/components/ui/LoadingCircle'
import { fetchRole } from '@/lib/role'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    roleId: string
  }
}

export default function RoleEdit({ params }: Props) {
  const {
    data: roleData,
    isSuccess,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['fetchRole'],
    queryFn: () => fetchRole(params.roleId),
  })

  if (roleData?.data.message === 'Unauthorized') {
    return <div>Unauthorized</div>
  }

  if (isSuccess === true && !roleData?.data._id) {
    notFound()
  }

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

  if (isLoading) {
    return (
      <div>
        <LoadingCircle />
      </div>
    )
  }

  return <CreateUpdateRole title="Manage role" defaultValues={roleData?.data} />
}
