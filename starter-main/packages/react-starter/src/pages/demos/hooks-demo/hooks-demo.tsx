import { useState } from 'react'
import UseCallbackAndUseMemo from './useCallback-useMemo'
import UseContextAndUseReducer from './useContext-useReducer'
import UseDebugValue from './useDebugValue'
import UseImperativeHandle from './useImperativeHandle'
import UseLayoutEffect from './useLayoutEffect'
import UseId from './useId'
import UseTransition from './UseTransition'
import UseDeferredValue from './UseDeferredValue'

const HooksDemo: React.FC = () => {
  const DemoArr = [
    {
      name: 'UseCallbackAndUseMemo',
      el: <UseCallbackAndUseMemo />
    },
    {
      name: 'UseContextAndUseReducer',
      el: <UseContextAndUseReducer />
    },

    {
      name: 'UseImperativeHandle',
      el: <UseImperativeHandle />
    },
    {
      name: 'UseLayoutEffect',
      el: <UseLayoutEffect />
    },
    {
      name: 'UseDebugValue',
      el: <UseDebugValue />
    },
    {
      name: 'UseId',
      el: <UseId />
    },
    {
      name: 'UseDeferredValue',
      el: <UseDeferredValue />
    },
    {
      name: 'UseTransition',
      el: <UseTransition />
    }
  ]

  const [idx, setIdx] = useState(5)
  return (
    <div className="p-10">
      {DemoArr.map((item, index) => {
        return (
          <button
            className="px-10 pt-10"
            key={index}
            onClick={() => {
              setIdx(index)
            }}
          >
            {item.name}
          </button>
        )
      })}
      <div className="mt-20">{DemoArr[idx].el}</div>
    </div>
  )
}

export default HooksDemo
