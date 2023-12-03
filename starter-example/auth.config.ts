import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // authorized 回调用于验证请求是否有权通过 Next.js 中间件访问页面。它在请求完成之前调用，并接收具有 auth 和 request 属性的对象。 auth 属性包含用户会话， request 属性包含传入请求。
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },

  // 尽管我们使用凭据提供程序，但通常建议使用替代提供程序，例如 OAuth 或电子邮件提供程序。有关选项的完整列表，请参阅 NextAuth.js 文档。
  providers: [Credentials({})], // Add providers with an empty array for now
} satisfies NextAuthConfig;
