'use client'
import { ToastContext } from '@/app/toast-provider'
import { useContext, useEffect } from 'react'

export default function PhotoPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const toastValue = useContext(ToastContext)

  useEffect(() => {
    console.log(toastValue, 'photos')
  }, [toastValue])
  return <div className="card">{id}</div>
}
