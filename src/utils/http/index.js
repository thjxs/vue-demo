import axios from 'axios'
import interceptors from './interceptors'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 2500
})

interceptors(http)

export default http
