import request from '@/services/axios/request'
import { ReqTitle } from './type'

export const requestTitle = (): Promise<ReqTitle> => {
  return request.get('/myplus-qing/ug/pc/title/get')
}
