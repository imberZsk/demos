// 打包后会有1kb的css用不到的，没有影响
// 用了antd组件关系也不大，antd5的样式是按需的
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // colors: {
      //   themeColor: '#ff4132',
      //   textColor: '#1a1a1a'
      // },
      // 如果写自适应布局，可以指定设计稿为1000px,然后只需要写/10的数值
      // fontSize: {
      //   xs: '3.3vw',
      //   sm: '3.9vw'
      // }
    }
  },
  plugins: []
}
