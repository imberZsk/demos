import { AxiosError, AxiosResponse } from 'axios'
import { checkStatus } from './checkStatus'

const processData = (res: AxiosResponse) => {
  // TODO:统一处理数据结构
  return res.data
}

const successHandle = (res: AxiosResponse) => {
  // TODO:处理一些成功回调，例如请求进度条
  return res.data
}

const errorHandle = (err: AxiosError) => {
  if (err.status) checkStatus(err.status)
  else return Promise.reject(err)
}

export { processData, successHandle, errorHandle }
