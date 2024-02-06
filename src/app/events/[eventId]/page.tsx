type Props = {
  params: {
    eventId: string
  }
}

export default function Event({ params }: Props) {
  return (
    <div>
      <h1>One event {params.eventId}</h1>
    </div>
  )
}
