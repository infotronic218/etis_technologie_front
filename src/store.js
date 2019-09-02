import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        authorization: localStorage.getItem("token"),
        userIsAuthorized: localStorage.getItem("auth"),
        expiration: localStorage.getItem('expiration'),
        loader: {
            loaded: false,
            message: 'Loading ... '
        }
    },
    mutations: {
        setUserIsAuthenticated(state, replacement) {
            state.userIsAuthorized = replacement
        },
        setAuthorization(state, data) {

            state.authorization = data.authorization
            state.expiration = data.expiration

            if (state.authorization && state.expiration) {
                state.userIsAuthorized = true
                localStorage.setItem("token", state.authorization)
                localStorage.setItem("expiration", state.expiration)
                localStorage.setItem("auth", true)
            }
        },
        logout() {
            this.state.userIsAuthorized = false
            localStorage.removeItem('auth')
            localStorage.removeItem("token")
            localStorage.removeItem('expiration')
            this.state.authorization = null
            window.router.push('/')

        },
        loaderLoaded(state, payload) {
            state.loader.loaded = payload
        },
        loaderMessage(state, payload) {
            state.message.loaded = payload
        }
    },
    actions: {

    },


})
export default store