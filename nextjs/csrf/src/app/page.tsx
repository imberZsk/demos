/* eslint-disable @next/next/no-img-element */
'use client'
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="mb-2">炒股网</div>
      {/* // eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="http://localhost:3000/api/transfer?amount=999999&to=28"
        alt=""
      />
    </div>
  )
}
