import Button from '@/comps/custom-button'
import { createContext, useContext, useReducer, useRef, useState } from 'react'

// 创建context
const CountContext = createContext(0)

// 父组件
const UseContextAndUseReducer: React.FC = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <div className="py-10">父组件</div>
      <Button click={() => setCount((count) => count + 1)}>点击+1</Button>
      <br />
      <br />
      {/* 如果要结合useReducer,这个count就是调用useReducer后返回的state */}
      <CountContext.Provider value={count}>
        <Child></Child>
      </CountContext.Provider>
      <br />
      <StateDemo></StateDemo>
      <br />
      <ReducerDemo></ReducerDemo>
    </div>
  )
}

// 子组件
const Child: React.FC = () => {
  const count = useContext(CountContext)
  return <div>子组件收到数据共享：{count}</div>
}

// useState修改[{}]
const StateDemo = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [state, setState] = useState([
    {
      name: 'imber',
      age: 18
    },
    {
      name: 'ding',
      age: 16
    }
  ])

  // 如果用state管理数据需要每次解构一层，再在新的数据上处理后setState
  const add = () => {
    const obj = {
      name: inputRef.current?.value || 'hello',
      age: 10
    }
    const newState = [...state]
    newState.push(obj)
    setState(newState)
  }

  return (
    <div>
      state管理数据
      <br />
      <div>
        <span onClick={add}> 新增：</span>{' '}
        <input className="text-black" type="text" ref={inputRef} />
      </div>
      {state.map((item, index) => {
        return (
          <div className="flex" key={index}>
            <br />
            <div className="mr-10">name:{item.name}</div>
            <div>age:{item.age}</div>
          </div>
        )
      })}
    </div>
  )
}

// useReducer修改[{}]
const ReducerDemo = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const initValue = [
    {
      name: 'imber',
      age: 18
    },
    {
      name: 'ding',
      age: 16
    }
  ]

  type Action = {
    type: string
    payload: {
      name: string
      age: number
    }
  }

  const reducer = (state: typeof initValue, action: Action) => {
    console.log(action)
    switch (action.type) {
      case 'add':
        return [...state, action.payload]
        break
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initValue)

  const add = () => {
    dispatch({
      type: 'add',
      payload: { name: inputRef.current?.value || '', age: 18 }
    })
  }

  return (
    <div>
      reducer管理数据
      <div>
        <span onClick={add}> 新增：</span>{' '}
        <input className="text-black" type="text" ref={inputRef} />
      </div>
      {state.map((item, index) => {
        return (
          <div className="flex" key={index}>
            <br />
            <div className="mr-10">name:{item.name}</div>
            <div>age:{item.age}</div>
          </div>
        )
      })}
    </div>
  )
}

export default UseContextAndUseReducer
