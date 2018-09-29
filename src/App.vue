<template>
<v-app>
  <app-main
    class='app-wrapper'
    v-if='!initializing'
  />
</v-app>
</template>

<script>
import './scss/vuetify/main.styl'
import SettingsStore from './js/SettingsStore.js'
import AppMain from './AppMain.vue'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import solid from '@fortawesome/fontawesome-free-solid'

// setup font awesome
fontawesome.library.add(brands, solid)

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
      .catch((error) => {
        console.log(error)
      })
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
