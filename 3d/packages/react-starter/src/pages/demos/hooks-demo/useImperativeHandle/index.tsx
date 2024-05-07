import Button from '@/comps/custom-button'
import { forwardRef, useImperativeHandle, useRef } from 'react'

const UseImperativeHandle: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null)
  function handleClick() {
    ref.current?.focus()
  }
  return (
    <div>
      <Button click={handleClick}>
        父组件调用子组件的方法/暴露子组件的ref或者方法
      </Button>
      <MyInput label="Enter your name:" ref={ref} />
    </div>
  )
}

type MyInputProps = {
  label: string
}

// 注意这个ref可以不用定义类型
const MyInput = forwardRef(function FaHandleSon(props: MyInputProps, ref) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { label, ...otherProps } = props
  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          inputRef.current?.focus()
        },
        scrollIntoView() {
          inputRef.current?.scrollIntoView()
        }
      }
    },
    []
  )
  return (
    <div className="py-10">
      <label>
        {label}
        <input {...otherProps} ref={inputRef} className="text-black" />
      </label>
    </div>
  )
})

export default UseImperativeHandle
