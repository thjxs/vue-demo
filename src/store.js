import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import topics from './modules/topics'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    auth,
    topics
  }
})
