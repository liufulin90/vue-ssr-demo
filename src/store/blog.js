/**
 * Created by liufulin on 18-6-1.
 */

import {Request} from '../utils/request'

export default {
  state: {
    blogList: []
  },
  actions: {
    getList ({ commit }) {
      return Request('/api/getList').then(res => {
        commit('setList', res.data.list)
      })
    }
  },
  mutations: {
    setList (state, list) {
      state.blogList = list
    }
  }
}