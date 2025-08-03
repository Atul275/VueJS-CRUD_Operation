import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import VueColumnsResizable from 'vue-columns-resizable';

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import Home from './components/Home'
import Employees from './components/Employees'
import View from './components/View'
import Login from './components/Login'
import Success from '@/components/Success';
import Error from '@/components/Error';
import Register from './components/Register'
import Logout from './components/Logout.vue';

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueColumnsResizable);

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '/success/:username',
    name: 'Success',
    component: Success,
  },
  {
    path: '/error/:errorMsg',
    name: 'Error',
    component: Error,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
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
