/**
 * Created by liufulin on 18-5-31.
 */
// 这里举例分模块定义路由，可以定义多个
export default [{
  path: '/blog',
  alias: '/',
  name: 'blog',
  meta: {
    title: '博客'
  },
  component: require('../views/blog.vue')
}, {
  path: '/about',
  alias: '/',
  name: 'about',
  meta: {
    title: '关于我'
  },
  component: require('../views/about.vue')
}];