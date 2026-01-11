import { EventType } from '@/models/event'
import Link from 'next/link'
import TableHeader from '../ui/TableHeader'
import TableData from '../ui/TableData'

interface Props {
  events: EventType[]
  handleDelete: (_id: string) => void
}
export default function EventTable({ events, handleDelete }: Props) {
  return (
    <>
      <thead className="bg-gray-50">
        <tr>
          <TableHeader scope="col">Name</TableHeader>
          <TableHeader scope="col">Location</TableHeader>
          <TableHeader scope="col">Date</TableHeader>
          <TableHeader scope="col">Edit</TableHeader>
          <TableHeader scope="col">Delete</TableHeader>
        </tr>
      </thead>
      <tbody className="bg-gray-50">
        {events?.map((event: EventType) => {
          return (
            <tr key={event._id}>
              <TableData>{event.name}</TableData>
              <TableData>{event.location}</TableData>
              <TableData>{event.date}</TableData>
              <TableData>
                <Link
                  href={`/events/${event._id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Link>
              </TableData>
              <TableData>
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => {
                    handleDelete(event._id)
                  }}
                >
                  Delete
                </button>
              </TableData>
            </tr>
          )
        })}
      </tbody>
    </>
  )
}
