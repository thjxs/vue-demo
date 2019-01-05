import http from '@/utils/http'

const state = {
  authenticated: false,
  user: {}
}

const actions = {
  attemptLogin ({ commit, dispatch }, {username, password}) {
    http.post('oauth/token', {
      client_id: process.env.VUE_APP_CLIENT_ID,
      client_secret: process.env.VUE_APP_CLIENT_SECRET,
      grant_type: 'password',
      username: username,
      password: password,
      scope: ''
    }).then(response => {
      const accessToken = JSON.stringify({data: response.access_token, expire_in: Date.now() + 1000*60*60*24*10})
      window.localStorage.setItem('access_token', accessToken)
      http.defaults.headers.common.Authorization = `Bearer ${response.access_token}`
      commit('setAuthenticated', true)
    }).then(() => dispatch('loadUser')).catch(e => {
      console.log(e)
    })
  },

  logout ({ commit }) {
    commit('setAuthenticated', false)
    commit('setUser', {})
  },

  loadUser ({ commit }) {
    http.get('/user').then(user => commit('setUser', user)).catch(e => {
      console.log(e)
    })
  }

}

const getters = {
  authenticated: ({ authenticated }) => authenticated,
  currentUser: ({ user }) => user
}

const mutations = {
  setAuthenticated (state, value) {
    state.authenticated = value
  },

  setUser (state, user) {
    state.user = user
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
