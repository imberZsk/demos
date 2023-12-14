import { useEffect, useState } from 'react'

// 通用延迟显示
export const useShowComponent = () => {
  const [showComponent, setShowComponent] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [])
  return showComponent
}

// 通用视频懒加载
export const useLazyVideo = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target
            const src = video.getAttribute('data-src')
            if (src) {
              video.setAttribute('src', src)
              video.removeAttribute('data-src')
            }
            observer.unobserve(video)
          }
        })
      },
      {
        rootMargin: '200px'
      }
    )
    const videos = document.querySelectorAll('video')
    videos.forEach((item) => {
      observer.observe(item)
    })
  }, [])
}

// 通用图片懒加载
export const useLazyImage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target
            const src = image.getAttribute('data-src')
            if (src) {
              image.setAttribute('src', src)
              image.removeAttribute('data-src')
            }
            observer.unobserve(image)
          }
        })
      },
      {
        rootMargin: '200px'
      }
    )
    const images = document.querySelectorAll('img')
    images.forEach((item) => {
      observer.observe(item)
    })
  }, [])
}
