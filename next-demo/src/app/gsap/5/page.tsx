'use client'

import { useIsomorphicLayoutEffect } from 'framer-motion'
// import { useIsomorphicLayoutEffect } from '@/app/hooks'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import { useRef } from 'react'
gsap.registerPlugin(ScrollTrigger)
export default function Section1() {
  const section2Ref = useRef<HTMLDivElement>(null)
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top top',
          end: '+=1500',
          pin: true,
          scrub: true
        }
      })
      // t1.set('.bg-black', { x: 100, y: 50, opacity: 0 }, 1)
      t1.from('.bg-img', { clipPath: 'inset(331px 756.5px)' })
      // [`inset(${windowWidth * 0.3}px ${windowWidth * 0.18}px)`, 'inset(0 0)']
      // inset(331px 756.5px)
    })
    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div>
      <div className="h-screen bg-pink-200 section1"></div>
      <div className="h-screen section2 relative" ref={section2Ref}>
        <div className="h-screen w-screen left-0 top-0 bg-black"></div>
        <Image
          width={1000}
          height={1000}
          className="h-screen w-screen bg-img absolute left-0 top-0 z-[1]"
          src="https://ssm.res.meizu.com/admin/2023/02/15/1403842183/KKueBlrjoQ.jpg?x-oss-process=image/format,webp"
          alt=""
        />
      </div>
      <div className="h-screen section3 bg-blue-300"></div>
    </div>
  )
}
