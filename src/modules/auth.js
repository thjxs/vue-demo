import http from '@/utils/http'

const state = {
  token: null,
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
      commit('setToken', response.access_token)
    }).then(() => dispatch('loadUser')).catch(() => {
      // console.log(e)
    })
  },

  logout ({ commit }) {
    commit('logout')
  },

  async loadUser ({ commit }) {
    try {
      const user = await http.get('/user')

      commit('setUser', user)
    } catch (e) {
      commit('loadUserFailure')
    }
  }

}

const getters = {
  authenticated: ({ token }) => token ? true : false,
  currentUserId: ({ user }) => user.id ? user.id : null
}

const mutations = {
  setToken (state, value) {
    state.token = value
  },

  setUser (state, user) {
    state.user = user
  },

  logout (state) {
    state.token = null,
    state.user = {}
  },

  loadUserFailure (state) {
    state.token = null
    state.user = {}
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
