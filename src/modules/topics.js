const state = {
  currentPage: 1
}

const mutations = {
  setCurrentPage (state, currentPage) {
    state.currentPage = currentPage
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
