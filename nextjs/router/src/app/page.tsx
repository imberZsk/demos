'use client'

import Link from 'next/link'
import { useContext } from 'react'
import { ToastContext } from './toast-provider'
import { HomePage } from '@/components/pages/home-page'

export default function Page() {
  let photos = Array.from({ length: 6 }, (_, i) => i + 1)
  const toastShareValue = useContext(ToastContext)

  return (
    <section
      className="cards-container"
      onClick={() => {
        console.log(toastShareValue.toastValue)
        toastShareValue.setToast(true)
      }}
    >
      {photos.map((id) => (
        <Link className="card" key={id} href={`/photos/${id}`} passHref>
          {id}
        </Link>
      ))}
      <HomePage />
    </section>
  )
}
