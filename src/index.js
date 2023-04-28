//  this file not mapped
import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home'
import Employees from './components/Employees'
import View from './components/View'
Vue.use(VueRouter);
export default new Router({

    routes: [

        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/',
            name: 'view',
            component: View
        },
        {
            path: '/',
            name: 'employees',
            component: Employees
        },
    ]
})