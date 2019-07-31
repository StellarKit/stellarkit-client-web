<template>
  <v-app>
    <app-main class="app-wrapper" v-if="!initializing" />
  </v-app>
</template>

<script>
import SettingsStore from './js/SettingsStore.js'
import AppMain from './AppMain.vue'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library, dom } from '@fortawesome/fontawesome-svg-core'

// setup font awesome
library.add(fab, fas)

// Kicks off the process of finding <i> tags and replacing with <svg>
dom.watch()

export default {
  components: {
    'app-main': AppMain
  },
  data() {
    return {
      initializing: true
    }
  },
  created() {
    SettingsStore.setup()
      .then(() => {
        this.initializing = false
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
@import url('https://fonts.googleapis.com/css?family=Orbitron:300,400,500,700');

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
