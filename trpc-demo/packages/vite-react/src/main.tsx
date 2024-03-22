import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import RootProvider from './providers/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RootProvider>
    <App />
  </RootProvider>
)
