// import { jumpToSpecifiedPage } from "../common/pageStack";
// import { token } from "../common/user";

Component({
  data: {
    selected: 0,
    color: '#b6babb',
    selectedColor: '#0f1820',
    borderStyle: 'white',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: '/pages/index/record/index',
        iconPath: '/assets/imgs/tarBar/discover.png',
        selectedIconPath: '/assets/imgs/tarBar/discover_active.png',
        text: '登记',
        needLogin: false
      },
      {
        pagePath: '/pages/index/buy-car/index',
        iconPath: '/assets/imgs/tarBar/buy.png',
        selectedIconPath: '/assets/imgs/tarBar/buy_active.png',
        text: '购车',
        needLogin: false
      },
      {
        pagePath: '/pages/index/mine/index',
        iconPath: '/assets/imgs/tarBar/my.png',
        selectedIconPath: '/assets/imgs/tarBar/my_active.png',
        text: '个人',
        needLogin: true
      }
    ]
  },
  attached() {},
  methods: {
    async switchTab(e: WechatMiniprogram.TouchEvent) {
      console.log(e)
      const app = getApp<IAppOption>()
      const { path } = e.currentTarget?.dataset
      app.navigateTo(path)
    },

    async isNeedWechatAuth() {
      return new Promise((resolve) => {
        wx.getPrivacySetting({
          success: (res) => {
            if (res.needAuthorization) {
              resolve(true)
            } else {
              resolve(false)
            }
          },
          fail: () => {
            resolve(false)
          }
        })
      })
    }
  }
})
