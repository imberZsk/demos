import Button from '@/comps/custom-button'
import { requestTitle } from '@/services/api'
import { useState } from 'react'

const AxiosDemo: React.FC = () => {
  const [title, setTitle] = useState('')
  const handleGetData = async () => {
    const data = await requestTitle()
    setTitle(data.title)
  }
  return (
    <div className="p-10">
      <h1 className="my-10">axios封装/代理/环境和BaseUrl/拦截和报错处理</h1>
      <Button click={handleGetData}>点击发请求</Button>
      <div className="my-10 flex">
        <div>请求回来的数据：</div>
        <div>{title}</div>
      </div>
    </div>
  )
}

export default AxiosDemo
