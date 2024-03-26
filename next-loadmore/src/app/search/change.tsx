'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const Change: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const change = (id: any) => {
    const params = new URLSearchParams(searchParams)
    params.set('id', id)
    router.replace(`${pathname}?${params.toString()}`)
  }
  return (
    <div>
      <div onClick={() => change(1)}>id为1</div>
      <div onClick={() => change(2)}>id为2</div>
    </div>
  )
}

export default Change
