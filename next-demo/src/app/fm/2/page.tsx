'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Page() {
  const targetRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'center start']
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const position = useTransform(scrollYProgress, (pos) => {
    if (pos === 0) return 'relative'
    return pos >= 1 ? 'relative' : 'fixed'
  })

  // pin完之后transition到最后
  const y = useTransform(scrollYProgress, (pos) => {
    if (pos === 1) return '100vh'
  })

  return (
    <div>
      <div className="h-screen bg-[#ccc]"></div>
      <motion.div
        className="h-[200vh] pb-[100vh] bg-yellow-200 relative"
        ref={targetRef}
      >
        <motion.div
          className="relative h-screen bg-black flex left-0 top-0 w-full"
          style={{ position, y }}
        >
          <motion.div className="m-auto inset-0" style={{ opacity }}>
            pin效果
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="h-screen bg-pink-200"></div>
      <div className="h-screen bg-pink-200"></div>
    </div>
  )
}
