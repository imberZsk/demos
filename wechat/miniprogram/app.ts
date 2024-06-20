// app.ts
import settings from './settings'
import '@libs/pageDecorator'

App<IAppOption>({
  globalData: {
    buyCarData: null
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: (res) => {
        console.log(res.code, 'login')
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  navigateTo(url?: string) {
    !url && (url = settings.tabBarPages[0])
    settings.tabBarPages.includes(url)
      ? wx.switchTab({ url }) //跳转到应用程序的底部导航栏定义的标签页，标签页之间的导航
      : wx.navigateTo({ url }) //普通页面之间的导航，需要保留当前页面并跳转到新页面
  }
})
