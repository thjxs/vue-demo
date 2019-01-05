import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import http from './utils/http'
import VeeValidate from 'vee-validate'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

Vue.filter('diffForHumans', function (date) {
  return moment(date).fromNow()
})

Vue.prototype.$http = http

Vue.use(VeeValidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
