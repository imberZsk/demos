'use client'

import fetcher from '@/app/lib/fetch'
import useSWR, { mutate } from 'swr'

interface User {
  id?: number
  name?: string
  email: string
  avatar: string
}
export default function Page() {
  const { data } = useSWR<User[], Error>('/api/user', fetcher)

  const create = () => {
    const test_data = {
      id: 6,
      name: 'imber6',
      email: 'imber6@example.com'
    }
    mutate(
      '/api/user/create',
      fetch('/api/user/create', {
        method: 'POST',
        body: JSON.stringify(test_data)
      })
    )
  }

  const findMany = async () => {
    mutate('/api/user')
  }
  return (
    <div>
      <div className="mb-[10px]">
        {data?.map((item, index) => {
          return (
            <div key={index} className="flex gap-[20px] w-[400px]">
              <div>id:{item.id}</div>
              <div>name:{item.name}</div>
              <div>email:{item.email}</div>
            </div>
          )
        })}
      </div>
      <div className="flex gap-[10px]">
        <button onClick={create}>新增</button>
        <button onClick={findMany}>查询</button>
      </div>
    </div>
  )
}
