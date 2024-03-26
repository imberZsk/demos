'use client'

import { useEffect, useState } from 'react'

const DataShow = ({ target }: any) => {
  const [data, setData] = useState<any>([])
  const sleep = () => new Promise((r: any) => setTimeout(r, 1000))

  useEffect(() => {
    setData(target)
  }, [target])

  useEffect(() => {
    if (typeof window !== undefined) {
      window.onscroll = async () => {
        // 判断是否滚动到底部，然后加载更多数据
        const documentHeight = document.documentElement.scrollHeight // 总的页面高度
        const windowHeight = window.innerHeight // 可视区高度
        const scrollPosition = window.scrollY // 滚动条滚动的距离
        const threshold = 50

        if (documentHeight - (scrollPosition + windowHeight) <= threshold) {
          await sleep()
          console.log(111)
          const data2 = [
            {
              id: 2,
              name: 'John Doe',
              email: 'johndoe@example.com'
            },
            {
              id: 2,
              name: 'John Doe',
              email: 'johndoe@example.com'
            }
          ]

          setData((data: any) => [...data, ...data2])
          console.log('下拉加载更多')
        }
      }
    }
  }, [])

  return (
    <div>
      {data?.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="h-[200px] w-[800px] border border-[#ff4132]"
          >
            {item.name}
            {item.id}-{index}
          </div>
        )
      })}
    </div>
  )
}

export default DataShow
