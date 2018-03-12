import Vue from 'vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import BuyToken from './pages/BuyToken.vue'
import AllowTrust from './pages/AllowTrust.vue'
import LockedTokens from './pages/LockedTokens.vue'
import CreateToken from './pages/CreateToken.vue'
import ICOManager from './pages/ICOManager.vue'
import LedgerNano from './pages/unused/LedgerNano.vue'
import HistoryViewer from './pages/HistoryViewer.vue'
import Trades from './pages/Trades.vue'
import $ from 'jquery'
import HelperImplementation from './js/HelperImplementation.js'
import {
  LedgerAPITransport
} from 'stellar-js-utils'

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
      name: 'Live Stream'
    }, {
      path: '/token',
      component: CreateToken,
      name: 'Create Token Tutorial'
    }, {
      path: '/ico',
      component: ICOManager,
      name: 'ICO Manager'
    }, {
      path: '/trust',
      component: AllowTrust,
      name: 'Allow Trust'
    }, {
      path: '/locked',
      component: LockedTokens,
      name: 'Locked Tokens'
    }, {
      path: '/ledger',
      component: LedgerNano,
      name: 'Ledger Nano'
    }, {
      path: '/history',
      component: HistoryViewer,
      name: 'History Viewer'
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
  start,
  HelperImplementation,
  LedgerAPITransport
}