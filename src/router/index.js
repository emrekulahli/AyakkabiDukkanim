import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Category from '../components/Category'
import Detail from '../components/Detail'
import Order from '../components/Order'
import Login from '../components/Admin/Login.vue'
import Dashboard from '../components/Admin/Dashboard.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/kategori/:gender',
            name: 'Category',
            component: Category,
            props: true
        },
        {
            path: '/detay/:id',
            name: 'Detail',
            component: Detail,
            props: true
        },
        {
            path: '/order',
            name: 'Order',
            component: Order,
            props: true
        },
        {
            path: '/admin/login',
            name: 'Login',
            component: Login,
            props: true
        },
        {
            path: '/admin/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            props: true
        }
    ]
})