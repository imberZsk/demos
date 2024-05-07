import { Outlet } from 'react-router-dom'
import Back from '../back'
import { useInitTheme } from '@/utils/theme'

const Layout: React.FC = () => {
  useInitTheme()

  return (
    <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white">
      <Back></Back>
      <Outlet />
    </div>
  )
}

export default Layout
