/**
 * Created by liufulin on 18-5-31.
 */
// router.js
import Vue from 'vue'
import Router from 'vue-router'
import othersRouter from './others.js'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/home',
        alias: '/',
        name: 'home',
        meta: {
          title: '主页'
        },
        component: require('../views/home.vue')
      },
      ...othersRouter
    ]
  })
}
