import Vue from 'vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import BuyToken from './pages/BuyToken.vue'
import AllowTrust from './pages/AllowTrust.vue'
import LockedTokens from './pages/LockedTokens.vue'
import ICOManager from './pages/ICOManager.vue'
import Experiments from './pages/experiments/Experiments.vue'
import HistoryViewer from './pages/HistoryViewer.vue'
import Trades from './pages/Trades.vue'
import $ from 'jquery'
import HelperImplementation from './js/HelperImplementation.js'
import { LedgerAPITransport } from 'stellarkit-js-utils'

import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  base: __dirname,
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home'
    },
    {
      path: '/buytoken',
      component: BuyToken,
      name: 'Buy Token'
    },
    {
      path: '/trades',
      component: Trades,
      name: 'Live Stream'
    },
    {
      path: '/ico',
      component: ICOManager,
      name: 'ICO Manager'
    },
    {
      path: '/trust',
      component: AllowTrust,
      name: 'Allow Trust'
    },
    {
      path: '/locked',
      component: LockedTokens,
      name: 'Locked Tokens'
    },
    {
      path: '/history',
      component: HistoryViewer,
      name: 'History Viewer'
    },
    {
      path: '/experiments',
      component: Experiments,
      name: 'Experiments'
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

const start = () => {
  if ($('#app').length > 0) {
    new Vue({
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
}

export { start, HelperImplementation, LedgerAPITransport }
