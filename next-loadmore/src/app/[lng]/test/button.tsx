'use client'

import { useState } from 'react'

const Button = () => {
  const [state, setState] = useState(1)
  return (
    <div
      onClick={() => {
        setState(state + 1)
      }}
    >
      点击{state}
    </div>
  )
}

export default Button
