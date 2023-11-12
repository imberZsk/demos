'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Page() {
  const targetRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const position = useTransform(scrollYProgress, (pos) => {
    console.log(pos)
    pos >= 1 ? 'relative' : 'fixed'
  })

  return (
    <div>
      <div className="h-screen bg-[#ccc]">
        <motion.div
          style={{ opacity }}
          ref={targetRef}
          className="relative mb-[8rem] h-screen py-16 text-white before:pointer-events-none before:fixed before:inset-0 before:z-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),_var(--color-secondary)_0%,_transparent_100%)] before:opacity-40"
        >
          <motion.div
            style={{ scale, x: '-50%', position }}
            className="fixed left-1/2 z-10 flex flex-col items-center"
          >
            666
          </motion.div>
        </motion.div>
      </div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div></div>
    </div>
  )
}
