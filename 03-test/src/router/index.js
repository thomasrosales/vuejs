import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Center from '../views/Center.vue'
import CenterNew from '../views/CenterNew.vue'
import Appointment from '../views/Appointment.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/centers',
    name: 'Centros',
    component: Center
  },
  {
    path: '/centers/new',
    name: 'Centro',
    component: CenterNew
  },
  {
    path: '/centers/:id/appointment',
    name: 'Turno',
    component: Appointment
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
