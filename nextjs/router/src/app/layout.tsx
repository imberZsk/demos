// import { WebVitals } from './component/page'
import './global.css'
import ToastProvider from './toast-provider'
import { CounterStoreProvider } from '@/providers/counter-store-provider'

export const metadata = {
  title: 'NextGram',
  description:
    'A sample Next.js app showing dynamic routing with modals as a route.',
  metadataBase: new URL('https://nextgram.vercel.app')
}

export default function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html>
      <body>
        <CounterStoreProvider>
          <ToastProvider>
            {props.children}
            {props.modal}
            {/* <WebVitals /> */}
            <div id="modal-root" />
          </ToastProvider>
        </CounterStoreProvider>
      </body>
    </html>
  )
}
