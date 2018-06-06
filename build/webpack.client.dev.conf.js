/**
 * Created by liufulin on 18-5-31.
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const projectRoot = path.resolve(__dirname, '..')

module.exports = merge(baseConfig, {
  entry: path.join(projectRoot, 'src/entry-client.js'),
  output: {
    path: path.join(projectRoot, 'dist'),//打包后的文件存放的地方
    filename: 'bundle.client.js'//打包后输出文件的文件名
  },
  plugins: [
    // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "manifest",
    //   minChunks: Infinity
    // }),
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ]
})
