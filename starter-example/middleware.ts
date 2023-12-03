import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// 使用中间件执行此任务的优点是，在中间件验证身份验证之前，受保护的路由甚至不会开始渲染，从而增强应用程序的安全性和性能。
export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
