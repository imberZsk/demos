'use client'

import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll
} from 'framer-motion'
import { useRef } from 'react'

const container = {
  hidden: {
    opacity: 1,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export default function Home() {
  const constraintsRef = useRef(null)
  const { scrollYProgress } = useViewportScroll()
  // scale:0.2到2
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2])

  const icon = {
    hidden: {
      pathLength: 0,
      fill: 'rgba(255, 255, 255, 0)'
    },
    visible: {
      pathLength: 1,
      fill: 'rgba(255, 255, 255, 1)'
    }
  }

  const x = useMotionValue(0)
  // transfrom x -100 - 100之间，透明度 0 1 0
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 h-[200vh]">
      <div className="grid grid-cols-3 gap-10">
        <div className="w-[250px] h-[250px] bg-gradient-to-t from-[#f0b] to-[#d0e] rounded-[12px] flex">
          <motion.div
            className="bg-[#ffffff] h-[76px] w-[76px] m-auto rounded-md"
            initial={{ scale: 0 }}
            animate={{ rotate: 180, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20
            }}
            // TODO:怎么刷新执行
            onClick={() => {}}
          />
        </div>
        <div className="w-[250px] h-[250px] bg-gradient-to-t from-[#f0b] to-[#d0e] rounded-[12px] flex">
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={container}
            className="bg-[rgba(255,255,255,0.2)] h-[76px] w-[76px] m-auto rounded-md grid grid-cols-2"
          >
            {[0, 1, 2, 3].map((_, index) => {
              return (
                <motion.li
                  key={index}
                  variants={item}
                  className="h-[30px] w-[30px] bg-white rounded-[50%] m-auto"
                ></motion.li>
              )
            })}
          </motion.ul>
        </div>
        <div className="w-[250px] h-[250px] bg-gradient-to-t from-[#f0b] to-[#d0e] rounded-[12px] flex">
          <motion.div
            className="bg-[#ffffff] h-[76px] w-[76px] m-auto rounded-md"
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{
              scale: 0.8,
              rotate: -90,
              borderRadius: '100%'
            }}
          />
        </div>
        <div className="w-[250px] h-[250px] bg-gradient-to-t from-[#f0b] to-[#d0e] rounded-[12px] flex">
          <motion.div
            ref={constraintsRef}
            className="bg-[rgba(255,255,255,0.2)] h-[76px] w-[76px] m-auto rounded-md flex"
          >
            <motion.div
              drag
              dragConstraints={constraintsRef}
              className="bg-[#ffffff] h-[26px] w-[26px] m-auto rounded-md"
            />
          </motion.div>
        </div>
        <div className="w-[250px] h-[250px] bg-gradient-to-t from-[#f0b] to-[#d0e] rounded-[12px] flex">
          {/* bg-pink-300 */}
          <div className="w-[80px] h-[80px] m-auto">
            <motion.div
              style={{ scale }}
              className="w-full h-full bg-[rgba(255,255,255,0.2)] rounded-[30px] overflow-hidden"
            >
              <motion.div
                className="bg-white w-[inherit] h-[inherit] origin-[50%_100%]"
                style={{
                  scaleY: scrollYProgress
                }}
              />
            </motion.div>
          </div>
        </div>
        <div className="w-[250px] h-[250px] bg-gradient-to-t from-[#f0b] to-[#d0e] rounded-[12px] flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <motion.path
              d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
              variants={icon}
              initial="hidden"
              animate="visible"
            />
          </svg>
        </div>
      </div>
      <motion.div
        className="w-[60px] h-[60px] bg-white"
        initial={{ opacity: 0 }}
        // TODO:如何设置时间
        whileInView={{ opacity: 1, scale: 2 }}
      >
        666
      </motion.div>
      <motion.div
        drag="x"
        style={{ x, opacity }}
        className="w-[60px] h-[60px] bg-white"
      />
    </main>
  )
}
