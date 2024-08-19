import { EventType } from "@/models/event"
import Link from "next/link"

interface Props {
    events: EventType[]
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
    meta: any
}
export default function EventTable({events, setPageNumber, meta}: Props) {
    const handleDelete = (_id: string) => {}
    return (
        <>
            <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {events?.map((event: EventType) => {
            return (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{event.location}</td>
                <td>{event.date}</td>
                <td>{event.description}</td>
                <td>
                  <Link href={`events/${event._id}/edit`}>Edit</Link>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(event._id)
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="flex justify-end">
        {meta?.page > 1 && 
        <button className="bg-blue-800 hover:bg-blue-500 text-white rounded-full h-10 w-28" onClick={()=>setPageNumber(prev => prev - 1)}>Prev</button>
        }
        {meta?.page < meta?.last_page &&
        <button className="bg-blue-800 hover:bg-blue-500 text-white rounded-full h-10 w-28" onClick={()=>setPageNumber(prev => prev + 1)}>Next</button>        
        }

    </div>
        </>
    )
}