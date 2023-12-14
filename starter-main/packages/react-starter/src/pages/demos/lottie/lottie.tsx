import lottie from 'lottie-web'
import { useEffect, useRef, useState } from 'react'
const Lottie: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieAnimation = useRef<any>(null)
  useEffect(() => {
    lottieAnimation.current = lottie.loadAnimation({
      container: document.getElementById('wrap') as HTMLDivElement,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/like.json'
    })
    return () => lottieAnimation.current.destroy()
  }, [])

  const handlePause = () => {
    if (isLiked) {
      lottieAnimation.current.goToAndStop(0)
      setIsLiked(!isLiked)
    } else {
      lottieAnimation.current.play()
      setIsLiked(!isLiked)
    }
  }

  return (
    <div className="flex-center">
      <div
        id="wrap"
        onClick={handlePause}
        className="h-20 w-20 cursor-pointer"
      ></div>
    </div>
  )
}

export default Lottie
