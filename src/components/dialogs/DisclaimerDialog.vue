<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='asset-contents'>
      <div class='welcome-text'>
        We developed this site to make it simple to interact with the Stellar network. Have fun, but be safe and always test any operations on the test network first before using real XLM on the public network.
      </div>
      <div class='disclaimer'>
        <div class='welcome-title'>
          Disclaimer
        </div>
        <div class='welcome-text'>
          We are big fans of the Stellar network, but to avoid confusion we should mention that <strong>we are not affiliated with, or sponsored or endorsed by the </strong><a href='https://stellar.org' target='_blank'>Stellar Development Foundation</a>.
        </div>
        <div class='welcome-text'>
          If you would like to use the official Stellar network tools, try the <a href='https://www.stellar.org/laboratory/' target='_blank'>Stellar Laboratory</a> or the <a href='https://www.stellar.org/account-viewer' target='_blank'>Stellar Account Viewer</a>.
        </div>
      </div>

      <div class='button-holder'>
        <v-btn round color='primary' @click="visible = false">Close</v-btn>
      </div>
    </div>
  </div>
</v-dialog>
</template>

<script>
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
      title: 'Welcome to stellar.army'
    }
  },
  watch: {
    ping() {
      this.visible = true
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../scss/styles.scss';

.main-container {
    @include standard-dialog-contents();

    .asset-contents {
        @include inner-dialog-contents();
        .welcome-title {
            margin-bottom: 6px;
            text-align: center;
            font-weight: bold;
            text-transform: uppercase;
            color: rgba(0,0,0,.7);
        }
        .welcome-text {
            margin-bottom: 10px;
        }
        .disclaimer {
            font-size: 0.9em;
        }
    }
}
</style>
