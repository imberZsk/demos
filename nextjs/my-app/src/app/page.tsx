'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'

export default function Home() {
  useEffect(() => {
    const concurrent = async (
      promises: (() => Promise<{ message: string }>)[],
      maxCount: number
    ) => {
      const results: { message: string }[] = []
      const queue = [...promises] // 复制任务队列

      // 处理队列中的任务
      const runNext = async () => {
        while (queue.length > 0) {
          const promiseFn = queue.shift() // 从队列中取出任务函数
          if (!promiseFn) continue
          const result = await promiseFn()
          results.push(result)
        }
      }

      // 启动并发任务
      const workers = []

      for (let i = 0; i < maxCount; i++) {
        workers.push(runNext())
      }
      await Promise.all(workers) // 等待所有并发任务完成

      return results
    }

    // Usage example
    const fetchData = async (index: number) => {
      const response = await fetch('http://localhost:3000/api')
      return response.json()
    }

    const promiseArr = Array(10)
      .fill(null)
      .map((_, index) => () => fetchData(index)) // Change to return a function

    concurrent(promiseArr, 3).then((results) => {
      console.log('所有 Promise 完成', results)
    })
  }, [])

  const [posterUrl, setPosterUrl] = useState('')

  useEffect(() => {
    setTimeout(() => {
      html2canvas(document.querySelector('.poster-container') as HTMLElement, {
        backgroundColor: 'transparent',
        useCORS: true, // 【重要】开启跨域配置
        // scale: window.devicePixelRatio < 3 ? window.devicePixelRatio : 2,
        scale: 1,
        allowTaint: true, // 允许跨域图片
        width: window.innerWidth,
        height: window.innerHeight
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1.0)
        setPosterUrl(imgData)
      })
    }, 1000)
  }, [])

  return (
    <main className="poster-container h-screen w-screen">
      <Image src="/1.webp" width={430} height={932} alt="" unoptimized></Image>
      牛逼
      {posterUrl && (
        <Image src={posterUrl} width={430} height={932} alt=""></Image>
      )}
    </main>
  )
}
