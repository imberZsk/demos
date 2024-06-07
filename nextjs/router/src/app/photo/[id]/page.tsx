'use client'

import { useSearchParams } from 'next/navigation'

const Page = () => {
  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  return <div>{id}</div>
}

export default Page
