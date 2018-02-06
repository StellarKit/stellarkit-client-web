import Vue from 'vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import BuyToken from './pages/BuyToken.vue'
import AllowTrust from './pages/AllowTrust.vue'
import LockedTokens from './pages/LockedTokens.vue'
import CreateToken from './pages/CreateToken.vue'
import Trades from './pages/Trades.vue'
import $ from 'jquery'

import Vuetify from 'vuetify'
Vue.use(Vuetify)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  base: __dirname,
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
      path: '/',
      component: Home,
      name: 'Home'
    }, {
      path: '/buytoken',
      component: BuyToken,
      name: 'Buy Token'
    }, {
      path: '/trades',
      component: Trades,
      name: 'Trades'
    }, {
      path: '/token',
      component: CreateToken,
      name: 'Create Token'
    }, {
      path: '/trust',
      component: AllowTrust,
      name: 'Allow Trust'
    }, {
      path: '/locked',
      component: LockedTokens,
      name: 'Locked Tokens'
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

const start = () => {
  if ($('#app').length > 0) {
    new Vue(Vue.util.extend({
      el: '#app',
      router
    }, App))
  }
}

export {
  start
}
