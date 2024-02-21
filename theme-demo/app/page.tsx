'use client'

import { useRef, useState, useEffect } from 'react'

const useCardAnimation = () => {
  const cardRef = useRef<HTMLDivElement | null>(null) // 卡片
  const lightRef = useRef<HTMLDivElement | null>(null) // 光源
  const [isShowLight, setIsShowLight] = useState(false) // 是否显示光源
  const [pos, setPos] = useState({ left: '0px', top: '0px' }) // 光源位置

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        setIsShowLight(true) // 进入盒子显示光源

        const { x, y } = cardRef.current.getBoundingClientRect() // 父元素相对于页面窗口
        const { clientX, clientY } = e // 鼠标在页面位置

        const offsetX = clientX - x // 计算鼠标在盒子内的水平偏移量
        const offsetY = clientY - y // 计算鼠标在盒子内的垂直偏移量

        setPos({
          left: offsetX - 100 + 'px', // 100为光源宽度的1/2
          top: offsetY - 100 + 'px' // 100为光源高度的1/2
        })

        const maxXRotation = 5 // 最大绕 X 轴旋转角度
        const maxYRotation = 5 // 最大绕 Y 轴旋转角度

        const rangeX = 400 / 2 // X 轴旋转范围
        const rangeY = 400 / 2 // Y 轴旋转范围

        const rotateX = ((offsetY - rangeY) / rangeY) * maxXRotation // 根据鼠标在 Y 轴上的位置计算绕 X 轴的旋转角度
        const rotateY = -1 * ((offsetX - rangeX) / rangeX) * maxYRotation // 根据鼠标在 X 轴上的位置计算绕 Y 轴的旋转角度

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` // 设置3D透视
      }
    }

    const handleMouseLeave = () => {
      setIsShowLight(false) // 离开盒子隐藏光源
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)` // 设置3D透视
      }
    }

    cardRef.current?.addEventListener('mousemove', handleMouseMove)
    cardRef.current?.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cardRef.current?.removeEventListener('mousemove', handleMouseMove)
      cardRef.current?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return { cardRef, lightRef, isShowLight, pos }
}

export default function Home() {
  const {
    cardRef: cardRef1,
    lightRef: lightRef1,
    isShowLight: isShowLight1,
    pos: pos1
  } = useCardAnimation()
  const {
    cardRef: cardRef2,
    lightRef: lightRef2,
    isShowLight: isShowLight2,
    pos: pos2
  } = useCardAnimation()
  const {
    cardRef: cardRef3,
    lightRef: lightRef3,
    isShowLight: isShowLight3,
    pos: pos3
  } = useCardAnimation()

  return (
    <main className="h-screen p-24 flex justify-center items-center bg-black gap-5">
      <div
        className="w-[400px] h-[400px] flex-center flex-col rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#1C1C1F] relative overflow-hidden"
        ref={cardRef1}
        style={{
          willChange: 'transform',
          transform:
            'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
        }}
      >
        <div
          className={`${
            isShowLight1 ? '' : 'hidden'
          } absolute h-[200px] w-[200px] rounded-full bg-[#ff4132] blur-[150px] filter`}
          ref={lightRef1}
          style={pos1}
        ></div>
      </div>
      <div
        className="w-[400px] h-[400px] flex-center flex-col rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#1C1C1F] relative overflow-hidden"
        ref={cardRef2}
        style={{
          willChange: 'transform',
          transform:
            'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
        }}
      >
        <div
          className={`${
            isShowLight2 ? '' : 'hidden'
          } absolute h-[200px] w-[200px] rounded-full bg-[#f9b613] blur-[150px] filter`}
          ref={lightRef2}
          style={pos2}
        ></div>
      </div>
      <div
        className="w-[400px] h-[400px] flex-center flex-col rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#1C1C1F] relative overflow-hidden"
        ref={cardRef3}
        style={{
          willChange: 'transform',
          transform:
            'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
        }}
      >
        <div
          className={`${
            isShowLight3 ? '' : 'hidden'
          } absolute h-[200px] w-[200px] rounded-full bg-[#3191f7] blur-[150px] filter`}
          ref={lightRef3}
          style={pos3}
        ></div>
      </div>
    </main>
  )
}
