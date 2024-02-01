import Image from 'next/image'

export default function Home() {
  return (
    <main className="pl-24">
      <div className="grid grid-cols-3">
        <div>
          <div className="text-black font-bold">FIND THE BEST EVENTS</div>
          <h1 className="text-6xl font-bold">
            Are you looking for your next event?
          </h1>
          <br />
          <div>sfshfdhjk</div>
          <br />
          <div className="text-black font-bold">FIND YOUR NEXT EVENT</div>
          <div>dfd</div>
        </div>
        <div>
          <Image
            src="/picture-1.png"
            alt="Picture 1"
            width={300}
            height={200}
          />
        </div>
        <div>
          <Image
            src="/picture-2.png"
            alt="Picture 2"
            height={200}
            width={200}
          />
        </div>
      </div>
    </main>
  )
}
