import Vue from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from 'vue-router'

import Home from './components/Home'
import Employees from './components/Employees'
import View from './components/View'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

const routes = [{
  path: '/',
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
