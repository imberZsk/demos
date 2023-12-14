import Button from '@/comps/custom-button'
import { useEffect, useRef, useState } from 'react'

const TsDemo: React.FC = () => {
  // 1、ref对普通元素的时候很简单，对定时器的时候有所不同
  const timer = useRef<number | null>(null)

  useEffect(() => {
    timer.current = setTimeout(() => {
      console.log('timeout')
    })
    return () => {
      timer.current && clearTimeout(timer.current)
    }
  }, [])

  // 2、useState初始状态为空时，要显示声明类型，对象类型
  type Obj = {
    count: number
    name: string
  }

  const [obj, setObj] = useState<Obj | null>(null)

  // 3、Event事件对象e，其他事件也是一样的套路
  const addObj = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e)
    const newObj = { count: 1, name: 'imber' }
    setObj(newObj)
  }

  // useImperativeHandle和this很少使用，就不管ts了
  return (
    <div className="p-10">
      <h1 className="my-10">定时器/事件对象</h1>
      <Button click={addObj}>点击事件</Button>
      <div className="py-10">{obj?.name}</div>
    </div>
  )
}

export default TsDemo
