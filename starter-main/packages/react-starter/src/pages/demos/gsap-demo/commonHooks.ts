// 前提是已经注册scrollTrigger
import { useEffect } from 'react'
// type Multipart = {}

// 通用单模块渐入效果
export const useSingleFadeIn = () => {
  useEffect(() => {
    const timeline = document.querySelectorAll('.singleFadeIn')
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLDivElement
        const gsapConfig = {
          y: target.dataset.y,
          x: target.dataset.x,
          opacity: 0,
          scale: target.dataset.scale
        }
        const scrollConfig = {
          trigger: target,
          start: target.dataset.start || '0% 90%',
          end: target.dataset.end || '0% 90%',
          toggleActions: 'play none reverse none'
        }
        if (entry.isIntersecting) {
          gsap.from(target, gsapConfig)
          intersectionObserver.unobserve(entry.target)
        }
        if (!entry.isIntersecting) {
          const tween = gsap.timeline({
            scrollTrigger: scrollConfig
          })
          tween.from(target, gsapConfig)
        }
        intersectionObserver.unobserve(target)
      })
    })
    timeline.forEach((item) => {
      intersectionObserver.observe(item)
    })
  }, [])
}

// 通用多模块渐入效果
// export const useMultipartFadeIn = ({
//   multipartFadeInFa,
//   multipartFadeInSon
// }: Multipart) => {
//   useEffect(() => {
//     const son = document.querySelectorAll(`${wrap} li`)
//     const fa = document?.querySelectorAll(wrap)
//     const tween = gsap.timeline({
//       scrollTrigger: {
//         trigger: fa,
//         start: '0% 80%',
//         end: '0% 80%',
//         toggleActions: 'play none reverse none'
//       }
//     })
//     tween.from(son, {
//       opacity: 0,
//       stagger,
//       y
//     })
//   }, [])
// }

// 通用通用卡片效果

// 通用全屏覆盖效果
