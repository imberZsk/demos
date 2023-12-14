import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import './styles/apply.css'
import router from './router'
// import { StrictMode } from 'react'

// createRoot表示并发模式,能使用useDeferredValue useTransition
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // 两次渲染看结果是否相同，纯函数应该相同才对
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
)
