import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { SlideArr } from './const'
const Slider: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null)
  const [cur, setCur] = useState(0) //控制轮播图小圆点
  return (
    <Swiper
      className="w-full h-[764px]"
      // 根据容器能显示多少个,可以auto，苹果官网就是auto效果
      // slidesPerView={2}
      slidesPerView={'auto'}
      // 间距为16px
      spaceBetween={16}
      // 注入模块
      modules={[Pagination, Autoplay]}
      // 居中显示
      centeredSlides={true}
      // 在loop 模式下使用 slidesPreview:'auto' ，还需使用该参数设置所要用到的loop 个数(一般设置大于可视slide个数2个即可)
      // loopedSlides={data?.length + 2}
      // 无限循环
      loop={true}
      // 变换的速度
      speed={1000}
      // 初次展示第几个slide
      // initialSlide={5}
      // 自动轮博的速度
      autoplay={{
        disableOnInteraction: false, //需要加上这个属性，点击轮播图后仍可以轮播
        delay: 3000
      }}
      // 获取实例
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={(swiper) => {
        setCur(swiper.realIndex)
      }}
    >
      {SlideArr?.map((item, index) => {
        return (
          <SwiperSlide key={index} className="!w-[680px]">
            {index}
            <img src={item.url} alt="" className="w-[680px]" />
          </SwiperSlide>
        )
      })}
      {/* 自定义小圆点 */}
      <ul className="flex margin-center w-fit pt-10 gap-6 absolute bottom-0 left-1/2 -translate-x-1/2">
        {SlideArr?.map((_item, index) => {
          return (
            <li
              key={index}
              className={` w-[20px] h-[20px] rounded-[50%] bg-pink-500 ${
                cur === index ? 'active:' : ''
              }`}
              onClick={() => {
                swiperRef.current.slideToLoop(index, 1000, false)
                setCur(swiperRef.current.realIndex)
              }}
            ></li>
          )
        })}
      </ul>
    </Swiper>
  )
}
export default Slider
