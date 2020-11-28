import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import methods from './methods'

// BOOSTRAP
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// LEAFLET
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

// ALERTIFY
import VueAlertify from 'vue-alertify'

// CONFIGURACION

Vue.use(require('vue-moment'))
Vue.use(VueAlertify)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  methods,
  render: h => h(App)
}).$mount('#app')
