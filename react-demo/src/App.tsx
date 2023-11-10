import { useEffect } from 'react'
import './App.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    const init = async () => {
      const tween = gsap.timeline({
        scrollTrigger: {
          trigger: '#section2',
          pin: true,
          start: '0% 0%',
          end: '+=200',
          scrub: 1,
          toggleActions: 'play none none none',
          markers: true
        }
      })
      tween.to('#section2_entry', {
        opacity: 0
      })
    }
    init()
  }, [])

  return (
    <section
      className="h-screen w-screen bg-[#ccc] text-center text-[16px]"
      id="section2"
    >
      <h1 className="m-auto text-[30px] text-[#fff]" id="section2_entry">
        Entry
      </h1>
    </section>
  )
}

export default App
