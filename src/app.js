/**
 * Created by liufulin on 18-5-31.
 */
// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './routes/'
import { createStore } from './store/'
import { sync } from 'vuex-router-sync'

Vue.mixin({
  beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store
      })
    }
  }
})

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp () {
  // 创建 router 和 store 实例
  const router = createRouter()
  const store = createStore()
  // 同步路由状态(route state)到 store
  sync(store, router)

  // 创建应用程序实例，将 router 和 store 注入到根 Vue 实例
  const app = new Vue({
    router,
    store,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })

  // 暴露 app, router 和 store。
  return { app, router, store }
}

