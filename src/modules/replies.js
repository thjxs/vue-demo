import http from '@/utils/http'

const state = {
  data: [],
  meta: Object
}

const actions = {
  loadReplies ({ commit }, topicId, page = 1) {
    http.get(`/topics/${topicId}/replies?include=user&page=${page}`).then(replies => {
      commit('setReplies', replies)
    })
  }
}

const mutations = {
  setReplies ({ state }, replies) {
    state.data = replies.data
    state.meta = replies.meta
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
