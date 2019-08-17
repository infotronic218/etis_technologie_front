import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/app/Home.vue'
import Application from './components/app/Application.vue'
import Services from './components/app/Services.vue'
import Contact from './components/app/Contact.vue'
import Posts from './components/app/Posts.vue'
import Post from './components/app/Post.vue'
import Error from './components/app/Error.vue'
import Settings from './components/admin/Settings.vue'
import postsSetting from './components/admin/Posts.vue'
import account from './components/admin/Account.vue'
import Register from './components/admin/Register.vue'
import categoriesSetting from './components/admin/Categories.vue'
import Media from './components/admin/Media.vue'
import { Store } from 'vuex';
Vue.use(Router)

const routes = [{
        path: '/',
        component: Application,
        children: [{
                path: '',
                component: Home,
            },
            {
                path: 'services',
                component: Services
            },
            {
                path: 'blog',
                component: Posts
            },
            {
                path: 'blog/:slug',
                component: Post,
                props: true
            },
            {
                path: 'blog/category/:categoryId',
                component: Posts,
                props: true
            },
            {
                path: 'register',
                component: Register,
            },
            {
                path: 'contact',
                component: Contact,
            },


        ]

    },
    {
        path: '/posts',
        component: Posts,
    },
    {
        path: '/settings',
        component: Settings,
        meta: {
            requiresAuth: true
        },
        children: [{
                path: 'posts',
                component: postsSetting,
            },
            {
                path: 'categories',
                component: categoriesSetting
            },
            {
                path: 'media',
                component: Media
            }
        ]
    }, {
        path: '/account',
        component: account,
    },
    {
        path: '/*',
        component: Error,
    }
]

const router = new Router({
    routes: routes,
    mode: 'history',
});


router.beforeEach((to, from, next) => {
    let routerAutoCheck = window.Store.state.userIsAuthorized;
    var expiration = window.Store.state.expiration;
    if (expiration) {
        var now = new Date().getTime()
        var generete = Date.parse(expiration)
        var dif = ((generete - now) > 0) ? true : false
        if (!dif && routerAutoCheck) {
            routerAutoCheck = dif;
            window.Store.commit('setUserIsAuthenticated', false)

        }
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (routerAutoCheck) {
            //USER IS Authenticated
            // 
            window.Store.commit('setUserIsAuthenticated', true)
            next()

        } else {
            router.push('/')
            window.Store.commit('setUserIsAuthenticated', false)
            $('#loginForm').modal('show')
        }

    } else {
        next()
    }
})

export default router