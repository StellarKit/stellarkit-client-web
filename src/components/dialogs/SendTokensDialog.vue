<template>
<v-dialog lazy persistent v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>Send tokens to account</div>
        <div class='sub-header'>Account must have already set trust on the asset</div>
      </div>
      <div class='help-email'>
        <dialog-accounts ref='dialogAccounts' v-on:toast='displayToast' :showDest=true :showAmount=true :showFunding=true />
      </div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round small color='primary' slot="activator" @click="sendTokens()" :loading="loading">Send Tokens</v-btn>
          <span>Send the tokens</span>
        </v-tooltip>
      </div>

      <toast-component :absolute=true location='send-tokens-dialog' :bottom=false :top=true />
    </div>
  </div>
</v-dialog>
</template>

<script>
import Helper from '../../js/helper.js'
import {
  DialogTitleBar,
  StellarWallet
} from 'stellar-js-utils'
import StellarUtils from '../../js/StellarUtils.js'
import ToastComponent from '../ToastComponent.vue'
const StellarSdk = require('stellar-sdk')
import DialogAccountsView from './DialogAccountsView.vue'

export default {
  props: ['ping', 'project'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent,
    'dialog-accounts': DialogAccountsView
  },
  data() {
    return {
      visible: false,
      title: 'Send Tokens',
      loading: false
    }
  },
  watch: {
    ping: function() {
      this.visible = true

      if (this.dialogAccounts()) {
        this.dialogAccounts().resetState()
      }

      // autofocus hack
      this.$nextTick(() => {
        if (this.$refs.input) {
          this.$refs.input.focus()
        }
      })
    }
  },
  methods: {
    dialogAccounts() {
      return this.$refs.dialogAccounts
    },
    sendTokens() {
      const destWallet = this.dialogAccounts().destWallet()
      const amount = this.dialogAccounts().amount()
      const fundingWallet = this.dialogAccounts().fundingWallet()

      if (destWallet && this.project) {
        Helper.debugLog('Sending tokens...')

        const asset = new StellarSdk.Asset(this.project.symbol, this.project.issuer)

        StellarUtils.sendAsset(StellarWallet.secret(this.project.distributorSecret), fundingWallet, destWallet, String(amount), asset)
          .then((result) => {
            Helper.debugLog(result, 'Success')
            this.displayToast('Success')

            StellarUtils.updateBalances()

            return null
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')

            let message = error.message
            if (message === 'connection failed') {
              message = 'Ledger Nano not found'
            }

            this.displayToast(message, true)
          })
      }
    },
    displayToast(message, error = false) {
      Helper.toast(message, error, 'send-tokens-dialog')
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
    }
}
</style>
