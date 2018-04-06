<template>
<v-app>
  <app-main class='app-wrapper' v-if='!initializing' />
</v-app>
</template>

<script>
import './scss/vuetify/main.styl'
import Storage from './js/storage.js'
import AppMain from './AppMain.vue'

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
    Storage.init()
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
