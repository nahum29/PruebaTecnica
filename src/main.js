import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import UserListView from './views/UserListView.vue';
import UserDetailsView from './views/UserDetailsView.vue';
import BootstrapVue3 from 'bootstrap-vue-3';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

const routes = [
  { path: '/', component: UserListView },
  { path: '/user/:id', component: UserDetailsView, props: true },
  { path: '/:pathMatch(.*)*', component: { template: '<h1>Página no encontrada</h1>' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.use(BootstrapVue3);
app.mount('#app');
