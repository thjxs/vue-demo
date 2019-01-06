import store from '@/store'

export default http => {
  http.interceptors.request.use(
    config => {
      const token = store.state.auth.token
      if (token) {
        config.headers.common.authorization = `Bearer ${token}`
      }
      config.withCredentials = true
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  http.interceptors.response.use(
    response => {
      return response.data
    },
    error => {
      return Promise.reject(error)
    }
  )
}
