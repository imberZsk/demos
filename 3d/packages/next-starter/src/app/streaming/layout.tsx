import React from 'react'

export const metadata = {
  title: 'Streaming'
}

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
