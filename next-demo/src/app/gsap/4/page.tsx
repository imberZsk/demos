'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// TODO:两个问题，一个警告，一个报错

import { useLayoutEffect, useRef } from 'react'
gsap.registerPlugin(ScrollTrigger)
export default function Section1() {
  const section2Ref = useRef<HTMLVideoElement>(null)
  const videoRef = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top top',
          end: '+=500',
          pin: true,
          scrub: true,
          onUpdate(self) {
            try {
              videoRef.current.currentTime =
                self.progress * videoRef.current.duration
            } catch (e) {}
          }
        }
      })
      t1.to('.title2', { opacity: 0 })
    })
    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div>
      <div className="h-screen bg-pink-200 section1"></div>
      <div className="h-screen bg-black section2 relative" ref={section2Ref}>
        <video
          src="/2.mp4"
          muted
          playsInline
          className="w-full h-full"
          ref={videoRef}
        ></video>
        <div className="title2 absolute top-0 left-0">title2</div>
      </div>
      <div className="h-screen section3 bg-blue-300"></div>
    </div>
  )
}
