import { useEffect, useState } from 'react'

const useTheme = () => {
  const init = () => {
    if (typeof window === 'undefined') {
      return 'light'
    }
    const classList = document.documentElement.classList
    return classList.contains('dark') ? 'dark' : 'light'
  }

  const [theme, setTheme] = useState(init)

  // 初始化theme
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light'
    setTheme(storedTheme)
  }, [])

  // 当theme变化的时候切换html上的class属性
  useEffect(() => {
    const classList = document.documentElement.classList
    classList.toggle('dark', theme === 'dark')
    classList.toggle('light', theme === 'light')
    // 变化操作
  }, [theme])

  // 监听storage事件，更新主题
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'theme') {
        setTheme(event.newValue || 'light')
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // 新增：监听系统切换事件，更新主题
  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const newTheme = event.matches ? 'dark' : 'light'
      setTheme(newTheme)
      localStorage.setItem('theme', newTheme) // 持久化缓存
    }

    mediaQueryList.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQueryList.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  // 切换事件
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme) // 持久化缓存
  }

  return { theme, toggleTheme }
}

export default useTheme
