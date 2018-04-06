<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='asset-contents'>
      <div>
        Welcome to stellar.army!
      </div>
      <div>
        We are big fans of the Stellar network, but to avoid confusion we should mention that <strong>we are not affiliated with, or sponsored or endorsed by, the <a href='https://stellar.org'>Stellar Development Foundation</a></strong>.
      </div>
      <div>
        If you want to use the official Stellar network tools, try the <a href='https://www.stellar.org/laboratory/'>Stellar Laboratory</a> or the <a href='https://www.stellar.org/account-viewer'>Stellar Account Viewer</a>
      </div>

      <div class='button-holder'>
        <v-btn round color='primary' @click="visible = false">Close</v-btn>
      </div>
    </div>
  </div>
</v-dialog>
</template>

<script>
import Helper from '../../js/helper.js'
import {
  DialogTitleBar
} from 'stellar-js-utils'

export default {
  props: ['ping'],
  components: {
    'dialog-titlebar': DialogTitleBar
  },
  data() {
    return {
      visible: false,
      title: 'Disclaimer'
    }
  },
  watch: {
    ping() {
      this.visible = true
    }
  },
  mounted() {
    this.assets = AssetManager.assets()

    Helper.vue().$on('assets-updated', () => {
      this.assets = AssetManager.assets()
    })
  }
}
</script>

<style lang='scss' scoped>
@import '../../scss/styles.scss';

.main-container {
    @include standard-dialog-contents();

    .asset-contents {
        @include inner-dialog-contents();
    }
}
</style>
