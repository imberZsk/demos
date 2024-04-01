'use client'
import { toast } from 'sonner'
import { useState } from 'react'

const Button = () => {
  const [state, setState] = useState(1)
  return (
    <>
      <div
        onClick={() => {
          // setState(state + 1)
          toast('Event has been created')
        }}
      >
        点击{state}
      </div>
    </>
  )
}

export default Button
