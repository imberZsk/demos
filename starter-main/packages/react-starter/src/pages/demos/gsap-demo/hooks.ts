import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export const useSection_one = () => {
  const titleRef = useRef<HTMLDivElement>(null)
  const subTitleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section_one = gsap.timeline()

    section_one
      .from(subTitleRef.current, {
        duration: 0.8,
        scale: 5
      })
      .from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.5
      })
    return () => {
      section_one.kill()
    }
  }, [])

  return { titleRef, subTitleRef }
}

export const useSection_two = () => {
  const twoRef = useRef<HTMLDivElement>(null)
  const li_one = useRef<HTMLLIElement>(null)
  const li_two = useRef<HTMLLIElement>(null)
  const li_three = useRef<HTMLLIElement>(null)
  const li_four = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const section_two = gsap.timeline({
      scrollTrigger: {
        trigger: twoRef.current,
        // markers: true,
        start: '30% 80%',
        end: '30% 80%',
        toggleActions: 'play none reverse none'
      }
      // stagger: '2'
    })

    section_two
      .addLabel('spin')
      .from(
        li_one.current,
        {
          x: '-30%',
          opacity: 0
        },
        'spin'
      )
      .from(
        li_two.current,
        {
          x: '30%',
          opacity: 0
        },
        'spin'
      )
      .from(
        li_three.current,
        {
          y: '30%',
          opacity: 0
        },
        'spin'
      )
      .from(
        li_four.current,
        {
          y: '30%',
          opacity: 0
        },
        'spin'
      )

    return () => {
      section_two.kill()
    }
  }, [])

  return { twoRef, li_one, li_two, li_three, li_four }
}

export const useSection_three = () => {
  const maskRef = useRef<HTMLDivElement>(null)
  const threeRef = useRef<HTMLDivElement>(null)
  const [maskDown, setMaskDown] = useState(false)
  const section_three = gsap.timeline()

  useEffect(() => {
    const section_three_init = gsap.timeline({
      scrollTrigger: {
        trigger: threeRef.current,
        pin: true,
        pinSpacing: true,
        start: '100% 100%',
        end: '+=1800',
        scrub: 1,
        toggleActions: 'play none reverse none'
      }
    })
    if (!maskDown) {
      section_three_init.to(maskRef.current, {
        left: 0,
        duration: 2,
        onComplete: () => {
          setMaskDown(true)
        }
      })
    } else {
      section_three_init.to(maskRef.current, {
        left: '100%',
        duration: 2,
        onComplete: () => {
          setMaskDown(false)
        }
      })
    }

    return () => {
      section_three.kill()
    }
  }, [maskDown, section_three])

  const showMask = () => {
    if (!maskDown) {
      section_three.to(maskRef.current, {
        left: 0,
        duration: 2,
        onComplete: () => {
          setMaskDown(true)
        }
      })
    } else {
      section_three.to(maskRef.current, {
        left: '100%',
        duration: 2,
        onComplete: () => {
          setMaskDown(false)
        }
      })
    }

    return () => {
      section_three.kill()
    }
  }

  return { maskRef, showMask, threeRef }
}

export const useSection_four = () => {
  const imgRef = useRef<HTMLImageElement>(null)
  const fourRef = useRef<HTMLDivElement>(null)
  const four_baseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section_four = gsap.timeline({
      scrollTrigger: {
        trigger: fourRef.current,
        pin: true,
        pinSpacing: true,
        start: '100% 100%',
        end: '+=3200',
        scrub: 1,
        toggleActions: 'play none reverse none'
      }
    })
    section_four.from(imgRef.current, {
      scale: window.innerWidth / 900,
      // 图片的中心和屏幕的中心一致
      x: 150
    })
    section_four.to(four_baseRef.current, {
      right: 0,
      duration: 3
    })
    return () => {
      section_four.kill()
    }
  }, [])

  return { imgRef, fourRef, four_baseRef }
}
