import { useEffect } from 'react'

// // 切换为白色主题
// const toLight = () => {
//   localStorage.setItem('theme', 'light')
//   const el = document.documentElement
//   el.classList.remove('dark')
// }

// // 切换为黑色主题
// const toDark = () => {
//   localStorage.setItem('theme', 'dark')
//   const el = document.documentElement
//   el.classList.add('dark')
// }

// // 初始化主题
// export const initTheme = () => {
//   // 从local获取到的theme
//   const theme = window.localStorage.getItem('theme')
//   // 获取匹配到的系统主题色
//   const matchMedia = window.matchMedia('(prefers-color-scheme:dark)')
//   // 监听系统主题色改变
//   matchMedia.onchange = () => {
//     // 如果匹配到黑色
//     if (matchMedia.matches) {
//       toDark()
//     } else {
//       toLight()
//     }
//   }
//   // 如果有设置过主题，取之前设置过的
//   if (theme) {
//     if (theme === 'dark') {
//       toDark()
//     } else {
//       toLight()
//     }
//   }
//   // 没有设置过取系统的黑色，没有取到默认设为白色
//   else {
//     if (matchMedia.matches) {
//       toDark()
//     } else {
//       toLight()
//     }
//   }
// }

// // 手动切换
// export const toggleTheme = () => {
//   const el = document.documentElement
//   console.log(el.classList)
//   if (el.classList.contains('dark')) {
//     toLight()
//   } else {
//     toDark()
//   }
// }

// Tailwind changeTheme

export const useInitTheme = () => {
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])
}
