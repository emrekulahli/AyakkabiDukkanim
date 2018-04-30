import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './Router'
import store from './stores/store'
import VueClip from 'vue-clip'
 
Vue.use(VueClip)
Vue.use(Vuetify)



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  
})
