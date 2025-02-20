import Vue from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from 'vue-router'
import VueColumnsResizable from 'vue-columns-resizable';
import Home from './components/Home'
import Employees from './components/Employees'
import View from './components/View'
import Login from './components/Login.vue'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueColumnsResizable);

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/employees',
    component: Employees
  },
  {
    path: '/view',
    component: View
  },
];
const router = new VueRouter
  ({
    mode: 'history',
    routes
  })

Vue.use(VueRouter);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
