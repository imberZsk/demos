import { useSyncExternalStore, useDebugValue } from 'react'

function StatusBar() {
  const isOnline = useOnlineStatus()
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
}

export default function UseDebugValue() {
  return <StatusBar />
}

function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  )
  useDebugValue(isOnline ? 'Online' : 'Offline')
  return isOnline
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function subscribe(callback: any) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}
