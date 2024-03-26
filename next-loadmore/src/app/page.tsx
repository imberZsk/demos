'use client'

import { useCallback, useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const sleep = () => new Promise((r: any) => setTimeout(r, 1000))

  const getTemp = () => {
    let temp = []
    for (let index = 0; index < 30; index++) {
      const obj = { name: index }
      temp.push(obj)
    }
    return temp
  }

  const getData = useCallback(async () => {
    await sleep()
    const temp = getTemp()
    return temp
  }, [])

  useEffect(() => {
    const temp = getTemp()
    setData(temp)
  }, [])

  useEffect(() => {
    if (typeof window !== undefined) {
      window.onscroll = async () => {
        // 判断是否滚动到底部，然后加载更多数据
        const documentHeight = document.documentElement.scrollHeight // 总的页面高度
        const windowHeight = window.innerHeight // 可视区高度
        const scrollPosition = window.scrollY // 滚动条滚动的距离
        const threshold = 50

        if (
          documentHeight - (scrollPosition + windowHeight) <= threshold &&
          !loading
        ) {
          console.log('666')
          setLoading(true)
          const data2: any = await getData()
          setData(() => {
            return [...data, ...data2]
          })
          setLoading(false)
        }
      }
    }
  }, [data, getData, loading])

  return (
    <div className="w-[800px] mx-auto">
      {data.map((item: any, index: number) => {
        return (
          <button
            key={index}
            className="h-[50px] w-full border border-[#cccccc]"
          >
            下拉加载{index}
          </button>
        )
      })}
      <div>{loading && '加载中..............'}</div>
    </div>
  )
}
