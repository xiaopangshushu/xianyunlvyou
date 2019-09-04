// 使用vuex实现状态管理
// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// 创建store
// store一般包含四个成员：
// state:存储数据的对象
// mutaitions：操作State的函数集合
// actions：触发mutation中函数的函数集合
// getters：访问器,获取数据

export default new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    //   函数有一个默认的参数state，这个state就是store中的state
    // 第一个参数永远都是state
    setUserName (state, value) {
      localStorage.setItem('vuex_username', value)
      state.username = value
    }
  },
  actions: {
    setUserNameAction ({ commit }, value) {
      // mutatiosns中的函数应该commit触发
      commit('setUserName', value)
    }
  },
  getters: {
    getusername () {
      return localStorage.getItem('vuex_username')
    }
  }
})


