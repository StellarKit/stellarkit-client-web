<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="400">
  <div class='main-container'>
    <div>Don't loose these keys! Print or save them to a secure USB or hard disk</div>
    <div class='buttons-area'>
      <v-tooltip open-delay='200' bottom>
        <v-btn color='primary' slot="activator" @click="buttonClick('add-account')">Save Keys...</v-btn>
        <span>Add existing account with a secret key</span>
      </v-tooltip>
      <v-tooltip open-delay='200' bottom>
        <v-btn color='primary' slot="activator" @click="buttonClick('create-account')">Print Keys...</v-btn>
        <span>Create a new account with a source account's secret key</span>
      </v-tooltip>
    </div>

    <toast-component :absolute=true location='save-keys-dialog' :bottom=false :top=true />
  </div>
</v-dialog>
</template>

<script>
import Helper from '../../js/helper.js'
import {
  DialogTitleBar
} from 'stellar-js-utils'
import ToastComponent from '../ToastComponent.vue'
import StellarUtils from '../../js/StellarUtils.js'

export default {
  props: ['ping'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent
  },
  data() {
    return {
      visible: false,
      isMainnet: false
    }
  },
  watch: {
    ping: function() {
      this.visible = true
      this.isMainnet = !StellarUtils.isTestnet()
    }
  },
  mounted() {
    this.isMainnet = !StellarUtils.isTestnet()
  },
  methods: {
    displayToast(message, error = false) {
      Helper.toast(message, error, 'save-keys-dialog')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../scss/styles.scss';

.main-container {
    @include standard-dialog-contents();

    .help-contents {
        @include inner-dialog-contents();

        .buttons-area {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
        }
    }
}
</style>
