export default http => {
  http.interceptors.request.use(
    config => {
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
