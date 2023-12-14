import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger']
  },
  css: {
    // 开css sourcemap方便找css
    devSourcemap: true
  },
  plugins: [
    react(),
    visualizer({
      open: false // 打包完成后自动打开浏览器，显示产物体积报告
    })
  ],
  server: {
    // 自动打开浏览器
    port: 9222,
    open: true,
    proxy: {
      '/api': {
        target: 'https://myplus-api.meizu.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    // 配置别名
    alias: { '@': path.resolve(__dirname, './src') }
  },
  //打包路径变为相对路径,用liveserver打开,便于本地测试打包后的文件
  base: './',
  // 页面路由还是谢名字.tsx吧
  // 打出来的包默认是没有gzip的，通过nginx去gzip
  build: {
    // sourcemap: true,
    rollupOptions: {
      output: {
        chunkFileNames: '[name]-[hash].js'
      }
    }
    // 如果要把插件分开打包，不要打在index里面
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes("node_modules")) {
    //         // 让每个插件都打包成独立的文件
    //         return id .toString() .split("node_modules/")[1] .split("/")[0] .toString();
    //       }
    //     }
    //   }
    // }
  }
})
