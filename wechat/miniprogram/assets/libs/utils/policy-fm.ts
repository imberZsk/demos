/**
 * 由于policy是单独的鉴权体系，所以，这里单独封装，
 * 管理后台对应当前小程序的包名：com.polestar.china.mini
 * 如果要改动该文件，建议咨询清楚接口其他字段、请求头字段的含义
 */

import { toast } from '@common/encapsulatesWxApi.js'
import md5 from './md5.min.js'

const policyAppId = '64410884561866019440'
const policyAppSecret = '858a0ef2756d47c69601bb65696a9270'
const policyStorageKey = 'fm_policy_20230918'

function getHeaderData(type = 'get') {
  const sysInfo: WechatMiniprogram.SystemInfo = wx.getSystemInfoSync()
  const reqTime = Date.now()

  return {
    appId: policyAppId,
    appSign: md5(`${policyAppId}${policyAppSecret}${reqTime}`), // appSign = md5(appId + Secrect + reqTime)
    reqTime,
    'X-brand': sysInfo.brand,
    'X-client-language': sysInfo.language,
    'X-model': sysInfo.model,
    'X-os-version': sysInfo.system,
    'X-version-name': sysInfo.version,
    ...(type === 'record' ? { 'X-area': sysInfo.language } : {})
  }
}

interface RequestPolicyData {
  code: number
  data: {
    data: { // 其他类型请查看飞书文档：https://xjmz.feishu.cn/wiki/BTefw3LkQiPD0hkgC8AcMgbQnne
      policyUrl: string
      version: number
    },
    newest: boolean // 本地是否最新版本
  }
  msg: string
}

/** 根据category获取协议url */
export function requestPolicyData(data: { category: string, version?: string }, newVerCallback?: Function) {
  return new Promise((resolve, reject) => {
    const storageInfo = wx.getStorageSync(policyStorageKey) || {}
    
    const version = storageInfo[data.category]
    if (version) { data.version = version }

    // 协议都是以文本链接方式显示，不考虑与业务接口并发的情况，应当是业务处理好才到这里，所以，这里不做处理
    wx.showLoading({ title: '加载中', mask: true })

    wx.request({
      url: 'https://policy.flyme.com/internal/v1/policy',
      method: 'GET',
      responseType: 'text',
      data,
      header: getHeaderData(),
      success: (res: WechatMiniprogram.RequestSuccessCallbackResult) => {
        const httpData = res.data as RequestPolicyData
        if (httpData.code === 200) {
          // 如果本地不是最新版本
          if (!httpData.data.newest && newVerCallback) {
            newVerCallback()
          }

          storageInfo[data.category] = httpData.data.data.version
          wx.setStorageSync(policyStorageKey, storageInfo)

          resolve(httpData.data.data.policyUrl)
        } else {
          toast(httpData?.msg || "服务端异常，请重试", 1500)
        }
      },
      fail: (err) => {
        reject(err)
      },
      complete() {
        wx.hideLoading()
      }
    })
  })
}

/** 反馈上报同意、不同意协议 */
export function recordPolicyData(categoryList: Array<{ category: string, version?: string }>) {
  return new Promise((resolve, reject) => {
    const storageInfo = wx.getStorageSync(policyStorageKey) || {}
    
    categoryList.forEach(item => {
      const version = storageInfo[item.category]
      if (version) { item.version = String(version) }
    })

    const requestData = {
      baseInfoList: categoryList,
      businessId: wx.getStorageSync('openid'),
      operation: '2',
      type: 'polestar',
      useId: wx.getStorageSync('pscnid')
    }

    wx.request({
      url: 'https://policy.app.polestar-auto.com/internal/v1/operate/record',
      method: 'POST',
      responseType: 'text',
      data: requestData,
      header: { 'Content-Type': 'application/json', ...getHeaderData('record') },
      success: (res: WechatMiniprogram.RequestSuccessCallbackResult) => {
        const httpData = res.data as RequestPolicyData
        if (httpData.code === 200) {

          resolve(httpData.data)
        } else {
          toast(httpData?.msg || "服务端异常，请重试", 1500)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}