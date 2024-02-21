'use client'

import { useEffect, useState } from 'react'

const Index: React.FC = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // const interval = setInterval(() => {
    //   //inner
    //   setCount(count + 1)
    // }, 1000)
    // return () => clearInterval(interval)
  }, [])

  function outer() {
    const x = 1

    function inner() {
      console.log(x) // 内部函数引用了外部函数的变量 x
    }

    return inner
  }

  const closureFunc = outer() // outer 函数执行后返回 inner 函数
  closureFunc() // 输出 1，因为 inner 函数形成了闭包，可以访问外部函数的变量 x

  useEffect(() => {
    ;(function rem() {
      let dw = 1000 // 设计图宽度
      let sw = window.screen.width // 屏幕宽度  430
      let fontSize = (sw / dw) * 100 // 方案1 // let fontSize = (sw / dw)            // 方案2
      let oHtml = document.getElementsByTagName('html')[0]
      oHtml.style.fontSize = fontSize + 'px'
      window.onresize = function (event) {
        rem()
      }
    })()
  }, [])
  return (
    <div>
      <div className="bg-[#cccccc] text-[0.93rem]">AI 图库 百变修图</div>
      <p>count: {count}</p>
    </div>
  )
}

export default Index
