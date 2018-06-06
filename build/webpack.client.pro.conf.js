/**
 * Created by liufulin on 18-5-31.
 */
process.env.NODE_ENV = 'production'
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
    // filename: 'bundle.client.pro.[chunkhash].js',//打包后输出文件的文件名
    filename: 'bundle.client.pro.js',//打包后输出文件的文件名
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
    new VueSSRClientPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,        //去掉注释
      beautify: false, // 最紧凑的输出
      compress: {
        warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
        drop_console: true,  // 删除所有的 `console` 语句
        collapse_vars: true, // 内嵌定义了但是只用到一次的变量
        reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
      }
    }),
  ]
})
