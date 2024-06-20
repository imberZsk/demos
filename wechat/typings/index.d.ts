/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo
    buyCarData?: any
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
  navigateTo(url?: string): void
}
