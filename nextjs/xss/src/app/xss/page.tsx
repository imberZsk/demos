'use client'

import { useEffect, useState } from 'react'

const Page = () => {
  const [data, setData] = useState<any>([])
  const [comment, setComment] = useState('')

  const fetchFn = async () => {
    fetch('/api/comment/read')
      .then((res) => res.json())
      .then((response) => setData(response.data))
  }

  useEffect(() => {
    fetchFn()
  }, [])
  return (
    <div className="flex justify-center flex-col items-center p-20">
      {/* <script>alert(111)</script> */}
      <input
        type="text"
        className="text-black w-[200px] mb-6 px-2"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value)
        }}
      />
      <div
        onClick={() => {
          fetch('/api/comment/create', {
            method: 'POST',
            body: JSON.stringify({
              comment
            })
          })
            .then((res) => res.json())
            .then(() => {
              fetchFn()
              setComment('')
            })
        }}
      >
        提交评论
      </div>
      <hr className="bg-red-500 w-full my-20" />
      <div className="">评论列表</div>
      <div className="mt-8">
        {data?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="my-2 text-fuchsia-400"
              dangerouslySetInnerHTML={{ __html: item.comment }}
            ></div>
          )
        })}
      </div>
    </div>
  )
}

export default Page
