import { createRouter, createWebHistory } from 'vue-router';
import Typicode from '../components/typicode.vue';
import AccordionComponent from '../components/AccordionComponent.vue';
import AmazingCalculator from '../components/AmazingCalculator.vue';
import DadJokes from '../components/DadJokes.vue';
import FormValidation from '../components/FormValidation.vue';
import GithubUsersSearch from '../components/GithubUsersSearch.vue';
import PasswordGenerator from '../components/PasswordGenerator.vue';
import ProgressSteps from '../components/ProgressSteps.vue';
import RandomQuoteGenerator from '../components/RandomQuoteGenerator.vue';
import TodoList from '../components/TodoList.vue';
import WikiComponent from '../components/WikiComponent.vue';
import Home from '../components/Home.vue';

const routes = [
  {
    path: '/WikiComponent',
    name: 'WikiComponent',
    component: WikiComponent,
  },
  {
    path: '/TodoList',
    name: 'TodoList',
    component: TodoList,
  },
  {
    path: '/RandomQuoteGenerator',
    name: 'RandomQuoteGenerator',
    component: RandomQuoteGenerator,
  },
  {
    path: '/ProgressSteps',
    name: 'ProgressSteps',
    component: ProgressSteps,
  },
  {
    path: '/PasswordGenerator',
    name: 'PasswordGenerator',
    component: PasswordGenerator,
  },
  {
    path: '/GithubUsersSearch',
    name: 'GithubUsersSearch',
    component: GithubUsersSearch,
  },
  {
    path: '/FormValidation',
    name: 'FormValidation',
    component: FormValidation,
  },
  {
    path: '/DadJokes',
    name: 'DadJokes',
    component: DadJokes,
  },
  {
    path: '/AmazingCalculator',
    name: 'AmazingCalculator',
    component: AmazingCalculator,
  },
  {
    path: '/AccordionComponent',
    name: 'AccordionComponent',
    component: AccordionComponent,
  },
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
