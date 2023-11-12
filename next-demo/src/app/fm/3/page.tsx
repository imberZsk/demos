'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Page() {
  const targetRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    // 底部显示完了开始
    // "start end" 表示当目标的起点与容器的终点相遇时。
    offset: ['end end', 'end start']
    // offset: ['end end', 'start start']
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  // const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  // const padding = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const position = useTransform(scrollYProgress, (pos) => {
    console.log(pos)
    if (pos === 0) return 'relative'
    return pos >= 1 ? 'relative' : 'fixed'
  })

  // 一开始padding-300px，滚动完结后，padding为0

  return (
    <div>
      <div className="h-screen bg-[#ccc]"></div>
      <div className="h-[200vh] pb-[100vh]">
        <motion.div
          className="relative h-screen bg-black pb-[300px]"
          style={{ position }}
          ref={targetRef}
        >
          <motion.div
            style={{ position }}
            className="relative top-0 w-full left-0 flex h-screen"
          >
            <motion.div className="m-auto inset-0" style={{ opacity }}>
              66666666
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <div className="h-screen bg-pink-200"></div>
    </div>
  )
}
