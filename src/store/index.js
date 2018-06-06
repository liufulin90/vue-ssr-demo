/**
 * Created by liufulin on 18-5-31.
 */
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import blogStore from './blog'

Vue.use(Vuex)

// 假定我们有一个可以返回 Promise 的
export function createStore () {
  return new Vuex.Store({
    state: {
      author: '',
      github: ''
    },
    actions: {
      getAuthor ({ commit }) {
        commit('setAuthor', {
          author: 'Flynn',
          github: 'https://github.com/liufulin90'
        })
      }
    },
    mutations: {
      setAuthor (state, {author, github}) {
        state.author = author
        state.github = github
      }
    },
    modules: {
      // 分模块定义
      blogStore
    }
  })
}
