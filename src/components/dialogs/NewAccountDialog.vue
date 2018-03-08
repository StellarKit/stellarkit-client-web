<template>
<v-dialog lazy persistent v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>Add an account</div>
        <div class='sub-header'>Paste in a secret key, or create new account on testnet</div>
      </div>
      <div class='help-email'>
        <v-text-field label="Destination public key" v-model="publicKey" ref='input'></v-text-field>
        <v-text-field label="Amount to sell" type='number' v-model.number="amount" @keyup.enter="sendTokens()"></v-text-field>
      </div>
      <div class='status-message'>{{statusMessage}}</div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round small color='primary' slot="activator" @click="sendTokens()" :loading="loading">Add Account</v-btn>
          <span>Add account</span>
        </v-tooltip>
      </div>

      <toast-component :absolute=true location='create-account-dialog' :bottom=false :top=true />
    </div>
  </div>
</v-dialog>
</template>

<script>
import Helper from '../../js/helper.js'
import {
  DialogTitleBar,
  StellarWallet,
  LedgerAPI
} from 'stellar-js-utils'
import StellarUtils from '../../js/StellarUtils.js'
import ToastComponent from '../ToastComponent.vue'
const StellarSdk = require('stellar-sdk')

export default {
  props: ['ping', 'project'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent
  },
  data() {
    return {
      visible: false,
      title: 'Create Account',
      statusMessage: '',
      loading: false,
      publicKey: 10,
      amount: 10
    }
  },
  watch: {
    ping: function() {
      this.visible = true
      this.publicKey = ''
      this.statusMessage = ''

      // autofocus hack
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  },
  methods: {
    sendTokens() {
      if (!Helper.strOK(this.publicKey)) {
        this.displayToast('Secret key is empty')
      } else {
        // ddd
      }
    },
    displayToast(message, error = false) {
      Helper.toast(message, error, 'create-account-dialog')
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

        .help-text {
            div {
                margin-bottom: 10px;
            }
            margin-bottom: 20px;

            .sub-header {
                font-size: 0.8em;
            }
        }

        .help-email {
            margin: 0 30px;
        }

        .status-message {
            font-size: 0.8em;
        }
    }
}
</style>
