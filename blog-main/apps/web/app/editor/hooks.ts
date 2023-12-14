import { useState } from 'react'

export const useUpload = () => {
  const [value, setValue] = useState('')

  const submit = () => {
    // 请求存数据库的接口
    console.log(value)
  }

  return {
    submit,
    value,
    setValue
  }
}
