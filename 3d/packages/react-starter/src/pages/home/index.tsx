import { routeArr } from '@/router'
import { useNavigate } from 'react-router-dom'
import './index.css'
import { useState } from 'react'

const Home: React.FC = () => {
  console.log(this)
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)

  const toDemo = (path: string) => {
    navigate(path)
  }

  const handleTheme = () => {
    if (localStorage.theme === 'light') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setChecked(false)
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setChecked(true)
    }
  }

  return (
    <>
      <div className="margin-center relative grid w-[800px] grid-cols-6 !pt-[40px]">
        {routeArr[0].children.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => toDemo(item.path)}
              className="mb-[40px]"
            >
              {item.path}
            </div>
          )
        })}
        <div className="toggle-switch">
          <label className="switch-label">
            <input
              type="checkbox"
              className="checkbox"
              checked={checked}
              onChange={() => {
                handleTheme()
              }}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </>
  )
}

export default Home
