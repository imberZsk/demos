// 开发环境

const { merge } = require('webpack-merge')

// development：使用eval-cheap-module-source-map模式，能具体定位到源码位置和源码展示，适合开发模式，体积较小
// production：使用nosources-source-map，只能定位源码位置，不能源码展示，体积较小，适合生产模式

const base = require('./webpack.base')
const webpack = require('webpack')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    open: true
    // hot: true,
  },
  plugins: [
    // 定义全局变量
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_DEV: JSON.stringify('development')
          // 这里可以定义你的环境变量
          // VUE_APP_URL: JSON.stringify('https://xxx.com')
        }
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})
