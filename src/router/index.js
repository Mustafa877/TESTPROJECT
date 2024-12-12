import { createRouter, createWebHistory } from 'vue-router';
import Typicode from '../components/typicode.vue';
import Home from '../components/Home.vue';

const routes = [
  {
    path: '/typicode',
    name: 'Typicode',
    component: Typicode,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
