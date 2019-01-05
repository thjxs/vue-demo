import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import http from './utils/http'

Vue.config.productionTip = false

Vue.filter('diffForHumans', function (date) {
  return moment(date).fromNow()
})

Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
