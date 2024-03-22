// import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
// import { AppRouter } from 'trpc/index'

// // 定义一个trpc客户端
// export const trpc = createTRPCProxyClient<AppRouter>({
//   links: [
//     httpBatchLink({
//       // url: 'http://localhost:7001'
//       url: '/api'
//     })
//   ]
// })

import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from 'trpc/index'

export const trpc = createTRPCReact<AppRouter>()
