import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { screen1, screen2, screen3, screen4, screen5 } from './const'
import {
  useSection_four,
  useSection_one,
  useSection_three,
  useSection_two
} from './hooks'
import './index.css'
gsap.registerPlugin(ScrollTrigger)
const GsapScroll: React.FC = () => {
  // 1、变换（缩放，移动等），css属性变化（透明）
  const { titleRef, subTitleRef } = useSection_one()
  // 2、依此执行/间隔执行/同步执行动画
  const { twoRef, li_one, li_two, li_three, li_four } = useSection_two()
  // 3、触发动画
  const { threeRef, maskRef, showMask } = useSection_three()
  // 4、从全屏缩入盒子，再水平滑动效果
  const { imgRef, fourRef, four_baseRef } = useSection_four()
  // 5、覆盖前面一屏的效果

  // 6、统一处理
  return (
    <div className="bg-stone-900 text-white">
      {/* section_one */}
      <div className="h-screen pt-48">
        <div className="text-center font-bold mb-10 text-xl" ref={titleRef}>
          {screen1.subTitle}
        </div>
        <div className="text-center font-bold text-5xl" ref={subTitleRef}>
          {screen1.title}
        </div>
      </div>

      {/* section_two */}
      <div className="h-screen py-52" ref={twoRef}>
        <ul className="w-[980px] margin-center grid gap-6 grid-cols-3 auto-rows-[360px] section_two">
          <li className="col-span-2 rounded-3xl overflow-hidden" ref={li_one}>
            <video
              src={screen2[0].url}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            ></video>
          </li>
          <li className="row-span-2 rounded-3xl overflow-hidden" ref={li_two}>
            <video
              src={screen2[1].url}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            ></video>
          </li>
          <li
            className="rounded-3xl bg-cover overflow-hidden"
            style={{ backgroundImage: `url(${screen2[2].url})` }}
            ref={li_three}
          ></li>
          <li
            className="rounded-3xl bg-cover overflow-hidden"
            style={{ backgroundImage: `url(${screen2[3].url})` }}
            ref={li_four}
          ></li>
        </ul>
      </div>

      {/* section_three */}
      <div
        className="h-screen bg-cover flex justify-center items-center overflow-hidden"
        ref={threeRef}
      >
        <div className="button1" onClick={showMask}>
          {screen3.button}
        </div>
        <div
          className="h-screen w-screen absolute pointer-events-none bg-slate-100 left-full opacity-5"
          ref={maskRef}
        ></div>
      </div>

      {/* section_four */}
      <div
        className="h-screen flex justify-center items-center overflow-hidden"
        ref={fourRef}
      >
        <div className="w-[1200px] relative h-[680px]">
          <div className="absolute flex" ref={four_baseRef}>
            {screen4.map((item, index) => {
              return (
                <div key={index} className="mr-7 w-[900px] h-[580px]">
                  <img
                    ref={index === 0 ? imgRef : null}
                    src={item.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* section_five */}
      <video
        src={screen5[0].url}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      ></video>
    </div>
  )
}

export default GsapScroll
