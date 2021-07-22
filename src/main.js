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

// https://fontawesome.com
import "@fortawesome/fontawesome-free/js/brands"
import "@fortawesome/fontawesome-free/js/solid"
import "@fortawesome/fontawesome-free/js/fontawesome"
// https://github.com/Inndy/vue-clipboard2
import VueClipboard from 'vue-clipboard2'

// Custom css
import "./assets/css/main.css"

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true // add this line

Vue.use(VueAxios, axios)
Vue.use(VueClipboard)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// Declaro mixin para poder reutilizar función en múltiples componentes y realizar 1 sola declaración
Vue.mixin({
  methods: {
    // https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    capitalizeFirstLetter: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
})