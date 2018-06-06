# vue-ssr-demo
vue 服务端渲染demo
```
├── build  构建脚本目录
│   ├── webpack.base.conf.js
│   ├── webpack.client.dev.conf.js
│   ├── webpack.client.pro.conf.js
│   └── webpack.server.conf.js
├── config  环境配置
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── test.env.js
├── dist     build后输出目录
│   ├── bundle.client.js
│   ├── bundle.client.pro.js     生产环境client文件
│   ├── bundle.server.js
│   ├── bundle.server.js.map
│   └── vue-ssr-client-manifest.json
├── package.json
├── README.md
├── server.js     开发环境server(配置很重要),生产环境同开发环境，只是导入的dist/client文件不一样
├── src          Demo代码
│   ├── app.js
│   ├── App.vue
│   ├── entry-client.js     客户端特定引导逻辑(很重要)
│   ├── entry-server.js     服务端特定引导逻辑(很重要)
│   ├── index.template.html
│   ├── routes
│   ├── store
│   ├── utils
│   └── views
└── static
```
开发环境中执行如下命令：
```
npm run build-client-dev
npm run build-server-dev
npm run dev-server
```
生产环境输出命令：
```
npm run release
npm run pro-server
```