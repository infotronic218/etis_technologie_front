import Vue from 'vue'
import Axios from 'axios'
import vueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import Store from './store'
import Init from './fb-sw'
window.Store = Store
window.router = router


import jQuery from 'jquery'
window.$ = window.jQuery = jQuery
import 'popper.js'
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import bootbox from 'bootbox'

window.bootbox = bootbox
import './registerServiceWorker'
import LoadScript from 'vue-plugin-load-script';
Axios.defaults.baseURL = 'https://etis-technologies.herokuapp.com/'
    //Axios.defaults.baseURL = 'http://localhost:8080/'
Vue.use(vueMeta)
Vue.use(LoadScript)


Vue.config.productionTip = false
Init()
new Vue({
    router: router,
    store: Store,
    render: h => h(App),
}).$mount('#app')