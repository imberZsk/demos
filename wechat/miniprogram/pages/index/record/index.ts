Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 500,
    current: 0 // 当前显示的swiper项
  },
  onLoad() {},
  // 监听 swiper 切换事件
  onSwiperChange(e: WechatMiniprogram.SwiperChange) {
    this.setData({
      current: e.detail.current
    })
  }
})
