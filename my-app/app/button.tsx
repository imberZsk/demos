'use client'

import useTheme from './hook'

const Button: React.FC = () => {
  const { toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="text-[#000000] dark:text-[#ffffff] text-[120px] m-auto"
    >
      主题切换
    </button>
  )
}

export default Button
