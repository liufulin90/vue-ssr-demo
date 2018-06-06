/**
 * Created by liufulin on 18-5-31.
 */
const Vue = require('vue')
const express = require('express')
const server = express()
const proConfig = require('./config/prod.env')
const devConfig = require('./config/dev.env')

// 不使用template
const renderer = require('vue-server-renderer').createRenderer()

// Server-Side Bundle File
const createApp = require('./dist/bundle.server.js')['default']
// Client-Side Bundle File
if (process.env.NODE_ENV == 'production') {
  var clientBundleFileUrl = '/bundle.client.pro.js'
  var port = proConfig.PORT;
} else {
  var clientBundleFileUrl = '/bundle.client.js'
  var port = devConfig.PORT;
}

server.use('/', express.static(__dirname + '/dist'))
server.use('/static', express.static('static'));

// api
server.get('/api/getList', (req, res) => {
  res.json(
    {
      list: [
        {'title': 11},
        {'title': 22},
        {'title': 33},
        {'title': 44}
      ]
    }
  )
})

server.get('*', (req, res) => {
  const context = {
    url: req.url,
    meta: `
      <meta charset="UTF-8">
    `,
    clientBundleFileUrl: clientBundleFileUrl,
  }
  // 创建一个 Vue 实例
  createApp(context).then(app => {
    // 将 Vue 实例渲染为 HTML
    renderer.renderToString(app, context, (err, html) => {
      if (err){
        res.status(500).send(`
            <h1>Error: ${err.message}</h1>
            <pre>${err.stack}</pre>
        `)
      } else {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
              ${context.meta}
              <title>${context.currentRoute.meta.title}</title>
              <link rel="shortcut icon" href="/static/favicon.ico"> 
            </head>
            <body>
            <div id="app" data-server-rendered="true">
            ${html}
            </div>
            <script>window.__INITIAL_STATE__ = ${JSON.stringify(context.state)}</script>
            <script src="${clientBundleFileUrl}"></script>
            </body>
            </html>
        `)
        // res.send(html)
      }
    });
  }, err => {
    console.log(err.message)
    console.log(err.stack)
    if (err.code === 404) {
      res.status(404).end('Page not found')
    } else {
      res.status(500).end('Internal Error')
    }
  })
})

server.listen(port)
console.log(`server listen on ${port}`)
