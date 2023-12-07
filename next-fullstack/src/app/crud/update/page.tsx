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

  const update = () => {
    const test_data = {
      id: 1,
      name: 'imber1更新',
      email: 'imber1@example.com'
    }
    mutate(
      '/api/user/update',
      fetch('/api/user/update', {
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
        <button onClick={update}>更新</button>
        <button onClick={findMany}>查询</button>
      </div>
    </div>
  )
}
