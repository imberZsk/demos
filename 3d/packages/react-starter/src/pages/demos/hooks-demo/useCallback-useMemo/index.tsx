import { memo, useCallback } from 'react'
import Button from '@/comps/custom-button'
import { useState } from 'react'

const UseCallbackAndUseMemo: React.FC = () => {
  // 父组件的状态更新，不影响子组件的时候
  const [num, setNum] = useState(0)

  const fn1 = () => {
    console.log('fn1')
  }

  const fn2 = useCallback(() => {
    console.log('fn2')
  }, [])

  return (
    <div>
      <Button
        click={() => {
          setNum(num + 1)
        }}
      >
        减少子组件重新渲染/优化自定义hook
      </Button>
      <Child fn={fn1}></Child>
      <ChildWithUseCallback fn={fn2}></ChildWithUseCallback>
      <h1>{num}</h1>
    </div>
  )
}

type IChildProps = {
  fn: () => void
}

const Child: React.FC<IChildProps> = memo(({ fn }) => {
  console.log('没有用useCallback，导致子组件重新更新')
  return (
    <div className="my-10">
      <Button click={fn}>memo without useCallback</Button>
    </div>
  )
})

const ChildWithUseCallback: React.FC<IChildProps> = memo(({ fn }) => {
  console.log('用了useCallback，子组件不用重新更新')
  return (
    <div className="my-10">
      <Button click={fn}>memo with useCallback</Button>
    </div>
  )
})

export default UseCallbackAndUseMemo
