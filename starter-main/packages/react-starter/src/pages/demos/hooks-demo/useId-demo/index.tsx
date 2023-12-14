import React from 'react'
import { useLayoutEffect, useRef, useState } from 'react'

function UseLayoutEffect() {
  const ref = useRef<HTMLDivElement>(null)
  const [tooltipHeight, setTooltipHeight] = useState(0) // You don't know real height yet

  useLayoutEffect(() => {
    const { height } = (ref.current && ref.current.getBoundingClientRect()) || {
      height: 10
    }
    setTooltipHeight(height) // Re-render now that you know the real height
  }, [])
  return (
    <div>
      <div ref={ref}>{tooltipHeight}</div>
    </div>
  )
  // ...use tooltipHeight in the rendering logic below...
}

export default UseLayoutEffect
