import { EventType } from '@/models/event'

type Props = {
  event?: EventType
  title: string
}

export default function CreateUpdateEvent({ event, title }: Props) {
  return (
    <div className="grid grid-cols-2 pl-24 pr-24">
      <div>
        <h1 className="text-2xl text-black">{title}</h1>
        <div>{event?.name}</div>
      </div>
      <div>
        <h1 className="text-2xl text-black">Added events</h1>
      </div>
    </div>
  )
}
