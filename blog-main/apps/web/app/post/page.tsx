'use client'

import { Viewer } from '@bytemd/react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface Data {
  value: string
}

const Page = () => {
  const { data, error, isLoading } = useSWR<Data, Error>('http://localhost:3000/editor/1', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div>
      <Viewer value="666" />
      {data?.value}
    </div>
  )
}

export default Page
