'use client'

import { useEffect } from 'react'

const Index: React.FC = () => {
  const toDark = () => {
    const classList = document.documentElement.classList
    classList.add('dark')
    localStorage.setItem('theme', 'dark')
    classList.remove('light')
  }

  const toLight = () => {
    const classList = document.documentElement.classList
    classList.add('light')
    localStorage.setItem('theme', 'light')
    classList.remove('dark')
  }

  useEffect(() => {
    window.addEventListener('storage', () => {
      console.log('111')
      const item = localStorage.getItem('theme') || 'light'
      if (item === 'dark') {
        toDark()
      } else {
        toLight()
      }
    })

    const item = localStorage.getItem('theme') || 'light'
    localStorage.setItem('theme', item)
    if (item === 'dark') {
      if (document.documentElement.classList.contains('dark')) {
      } else {
        document.documentElement.classList.add('dark')
      }
      document.documentElement.classList.remove('light')
    } else {
      if (document.documentElement.classList.contains('light')) {
      } else {
        document.documentElement.classList.add('light')
      }
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <div
      onClick={() => {
        const classList = document.documentElement.classList
        if (classList.contains('dark')) {
          toLight()
        } else {
          toDark()
        }
      }}
    >
      切换
    </div>
  )
}

export default Index
