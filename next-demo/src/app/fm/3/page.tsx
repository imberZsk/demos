'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Section1() {
  const targetRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['100px 90vh', 'end end']
  })

  const y = useTransform(scrollYProgress, (pos) => {
    if (pos === 1) return '200px'
  })

  const opacity = useTransform(scrollYProgress, (pos) => {
    if (pos === 1) return 1
    return 0
  })

  const scale = useTransform(scrollYProgress, (pos) => {
    if (pos === 1) return 2
  })

  return (
    <div>
      <div className="h-screen bg-pink-200"></div>
      <motion.div className="relative flex h-screen bg-black" ref={targetRef}>
        <motion.div className="z-[1] mx-auto mt-[11.9vw] text-center">
          <motion.div
            className="text-[60px] font-bold text-white z-[2] duration-1000 opacity-0"
            style={{ y, scale, opacity }}
          >
            dsadasdasd
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="h-screen bg-pink-200"></div>
    </div>
  )
}
