'use client'

import { useEffect } from 'react'

const Concurrent = () => {
  useEffect(() => {
    const fn = async (reqs: any, max: number) => {
      const queue = [...reqs]
      const ret: any[] = []

      const runNext = async () => {
        while (queue.length > 0) {
          const proFn = queue.shift()
          if (!proFn) continue
          const res = await proFn()
          ret.push(res)
        }
      }

      const workers = []

      for (let i = 0; i < max; i++) {
        workers.push(runNext())
      }

      await Promise.all(workers)

      return ret
    }

    const fetchFn = async () => {
      const response = await fetch('http://localhost:3000/api/test')
      return response.json()
    }

    const arr = [
      () => fetchFn(),
      () => fetchFn(),
      () => fetchFn(),
      () => fetchFn(),
      () => fetchFn(),
      () => fetchFn(),
      () => fetchFn(),
      () => fetchFn(),
      () => fetchFn(),
      () => fetchFn(),
      () => fetchFn()
    ]

    fn(arr, 3).then((res) => {
      console.log('所有 Promise 完成', res)
    })
  }, [])
  return <div></div>
}

export default Concurrent
