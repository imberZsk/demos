'use client'

import { type ElementRef, useEffect, useRef, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { ToastContext } from '@/app/toast-provider'
import { useCounterStore } from '@/providers/counter-store-provider'

export function Modal({ children }: { children: React.ReactNode }) {
  const value = useContext(ToastContext)
  const router = useRouter()
  const dialogRef = useRef<ElementRef<'dialog'>>(null)

  const { count, incrementCount, decrementCount } = useCounterStore(
    (state) => state
  )

  useEffect(() => {
    console.log(value.toastValue, count, 'modal')
  }, [count, value.toastValue])

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal()
    }
  }, [])

  function onDismiss() {
    value.setToast(false)
    router.back()
  }

  return createPortal(
    <div className="modal-backdrop">
      <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
        {children}
        <button onClick={onDismiss} className="close-button" />
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  )
}
