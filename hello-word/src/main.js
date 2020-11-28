import { createApp } from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'


const app = createApp(App)

app.use(BootstrapVue)
app.use(BootstrapVueIcons)
app.config.productionTip = false

app.mount('#app')


// 

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue.use(BootstrapVue)
// Vue.use(BootstrapVueIcons)