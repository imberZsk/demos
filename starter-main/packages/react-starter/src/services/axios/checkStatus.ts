export function checkStatus(status: number, msg?: string): void {
  let errMessage = ''

  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    case 401:
      break
    case 403:
      errMessage = ''
      break
    // 404请求不存在
    case 404:
      errMessage = ''
      break
    case 405:
      errMessage = ''
      break
    case 408:
      errMessage = ''
      break
    case 500:
      errMessage = ''
      break
    case 501:
      errMessage = ''
      break
    case 502:
      errMessage = ''
      break
    case 503:
      errMessage = ''
      break
    case 504:
      errMessage = ''
      break
    case 505:
      errMessage = ''
      break
    default:
  }
  if (errMessage) {
    // TODO:错误提示
    // createErrorModal({title: errMessage})
  }
}
