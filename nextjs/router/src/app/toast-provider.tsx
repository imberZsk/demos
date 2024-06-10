'use client'

// 记录页面中的一个公用弹窗的打开状态

import { createContext, useState } from 'react'

export const ToastContext = createContext({
  toastValue: false,
  setToast: (toast: boolean) => {}
})

export default function ToastProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [toastValue, setToastValue] = useState(false)
  return (
    <ToastContext.Provider
      value={{
        toastValue,
        setToast: (toast: boolean) => {
          setToastValue(toast)
        }
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}
