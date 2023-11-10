'use client'

import React, { useLayoutEffect, useEffect, useRef } from 'react'
import gsap from 'gsap-trial/dist/gsap'
import { ScrollTrigger } from 'gsap-trial/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap-trial/dist/ScrollSmoother'

export function Home() {
  const main = useRef()
  const smoother = useRef()
  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect

  const scrollTo = () => {
    smoother.current.scrollTo('.box-c', true, 'center center')
  }

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // create the smooth scroller FIRST!
      smoother.current = ScrollSmoother.create({
        smooth: 2, // seconds it takes to "catch up" to native scroll position
        effects: true // look for data-speed and data-lag attributes on elements and animate accordingly
      })
      ScrollTrigger.create({
        trigger: '.box-c',
        pin: true,
        start: 'center center',
        end: '+=300',
        markers: true
      })
    }, main)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <div id="smooth-wrapper" ref={main}>
        <div id="smooth-content">
          <header className="header">
            <h1 className="title">GreenSock ScrollSmoother on a NextJS App</h1>
            <button className="button" onClick={scrollTo}>
              Jump to C
            </button>
          </header>
          <div className="box box-a" data-speed="0.5">
            a
          </div>
          <div className="box box-b" data-speed="0.8">
            b
          </div>
          <div className="box box-c" data-speed="1.5">
            c
          </div>
          <div className="line"></div>
        </div>
      </div>
      <footer>
        <a href="https://greensock.com/scrollsmoother">
          <img
            className="greensock-icon"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/scroll-smoother-logo-light.svg"
            width="220"
            height="70"
          />
        </a>
      </footer>
    </>
  )
}

export default Home
