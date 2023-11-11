'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

const textVariants = {
  initial: {
    x: -500,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1
    }
  },
  scrollButton: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 2,
      repeat: Infinity
    }
  }
}

const items = [
  {
    id: 1,
    title: 'React Commerce',
    img: 'https://images.pexels.com/photos/18073372/pexels-photo-18073372/free-photo-of-young-man-sitting-in-a-car-on-a-night-street.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.'
  },
  {
    id: 2,
    title: 'Next.js Blog',
    img: 'https://images.pexels.com/photos/18023772/pexels-photo-18023772/free-photo-of-close-up-of-a-person-holding-a-wristwatch.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.'
  },
  {
    id: 3,
    title: 'Vanilla JS App',
    img: 'https://images.pexels.com/photos/6894528/pexels-photo-6894528.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.'
  },
  {
    id: 4,
    title: 'Music App',
    img: 'https://images.pexels.com/photos/18540208/pexels-photo-18540208/free-photo-of-wood-landscape-water-hill.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.'
  }
]

export default function Page() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref
  })

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300])

  return (
    <>
      <section className="h-screen bg-[#161616] flex">
        <motion.div
          className="m-auto w-[1200px]"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2
            variants={textVariants}
            className="mb-6 text-[rebeccapurple] text-[30px]"
          >
            Imber
          </motion.h2>
          <motion.h1 variants={textVariants} className="mb-10 text-[40px]">
            Web developer and UI designer
          </motion.h1>
          <motion.div variants={textVariants} className="mb-10">
            <motion.button
              variants={textVariants}
              className="border border-white rounded-[10px] mr-[20px] p-[20px]"
            >
              See the Latest Works
            </motion.button>
            <motion.button
              variants={textVariants}
              className="border border-white rounded-[10px] mr-[20px] p-[20px]"
            >
              Contact Me
            </motion.button>
          </motion.div>
          <motion.img
            variants={textVariants}
            animate="scrollButton"
            src="/scroll.png"
            alt=""
          />
        </motion.div>
      </section>

      <section className="h-screen bg-[#111132]">
        <motion.div
          className="text-[40px] text-red-500 text-center"
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 2 }}
        >
          666
        </motion.div>
      </section>

      {items.map((item) => (
        <section key={item.id} className="h-screen">
          <div className="h-full">
            <div className="flex h-full justify-center items-center">
              <div className="h-1/2 w-1/2" ref={ref}>
                <Image
                  height={200}
                  width={200}
                  src={item.img}
                  className="object-cover w-full h-full"
                  alt=""
                />
              </div>
              <motion.div className="w-1/2" style={{ y }}>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
                <button>See Demo</button>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
