import type { InternalAxiosRequestConfig } from 'axios'

const defaultRequestInterception = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  // 设置请求头的Authorization字段为token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

export { defaultRequestInterception }
