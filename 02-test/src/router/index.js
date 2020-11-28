import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Dogs from '../views/Dogs.vue';
import Cats from '../views/Cats.vue';
import Pet from '../views/Pet.vue';

Vue.use(VueRouter);

// PAGINAS DE NUESTRA APLICACIONES VIEWS

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/dogs',
    name: 'Dogs',
    component: Dogs,
  },
  {
    path: '/cats',
    name: 'Cats',
    component: Cats,
  },
  {
    path: '/pet/:id',
    name: 'Pet',
    component: Pet,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
