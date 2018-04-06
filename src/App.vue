<template>
<v-app>
  <div class='app-wrapper' v-if='!initializing'>
    <navivation-drawer :ping='showNavigation' />
    <div class='main-container'>
      <header-bar v-on:show-drawer='showDrawer' v-on:show-github='showGitHub' :tabs='tabs' :networkIndicator='false' homeTitle='StellarArmy' />
      <network-menu />
      <div class='app-content'>
        <div class='router-container '>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
        <console />
      </div>
    </div>

    <toast-component />
  </div>
</v-app>
</template>

<script>
import './scss/vuetify/main.styl'
import NavigationDrawer from './components/NavigationDrawer.vue'
import HeaderBar from './components/HeaderBar.vue'
import TabsManager from './js/TabsManager.js'
import ConsoleComponent from './components/ConsoleComponent.vue'
import NetworkBar from './components/NetworkBar.vue'
import Helper from './js/helper.js'
import Storage from './js/storage.js'
import ToastComponent from './components/ToastComponent.vue'

export default {
  components: {
    'navivation-drawer': NavigationDrawer,
    'network-menu': NetworkBar,
    'toast-component': ToastComponent,
    'console': ConsoleComponent,
    'header-bar': HeaderBar
  },
  data() {
    return {
      showNavigation: false,
      initializing: true,
      tabs: []
    }
  },
  created() {
    Storage.init()
      .then(() => {
        this.initializing = false
      })
      .catch((error) => {
        console.log(error)
      })
  },
  mounted() {
    this.tabs = TabsManager.getTabs()
  },
  methods: {
    showGitHub() {
      Helper.openBrowser('https://github.com/StellarKit/stellarkit-client-web')
    },
    showDrawer() {
      this.showNavigation = !this.showNavigation
    },
    pageTitle() {
      return this.$router.currentRoute.name
    }
  }
}
</script>

<style lang='scss'>
// gets rid of scrollbars on desktop
body,
html {
    overflow: hidden;
    height: 100%;
    width: 100%;
}

#app {
    height: 100%;
}
</style>

<style  lang='scss' scoped>
.app-wrapper {
    display: flex;
    flex: 1;
}

.main-container {
    display: flex;
    flex: 1;
    flex-direction: column;

    .app-content {
        display: flex;
        width: 100%;
        flex: 1;

        flex-direction: column;

        .router-container {
            width: 100%;
            overflow-y: auto;
        }
    }
}
</style>
