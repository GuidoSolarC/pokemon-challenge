import Vue from 'vue'
import App from './App.vue'

import store from './store'

// https://router.vuejs.org
import router from './router/index'

// https://axios-http.com
import axios from 'axios'
import VueAxios from 'vue-axios'

// https://getbootstrap.com
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

// Custom css
import "./assets/css/main.css"

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
