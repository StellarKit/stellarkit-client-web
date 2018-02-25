<template>
<v-dialog lazy persistent v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>Send tokens to account</div>
        <div class='sub-header'>Account must have already set trust on your asset</div>
      </div>
      <div class='help-email'>
        <v-text-field label="Destination public key" v-model="publicKey" ref='input'></v-text-field>
        <v-text-field label="Amount to sell" type='number' v-model.number="amount" @keyup.enter="sendTokens()"></v-text-field>
      </div>
      <div class='status-message'>{{statusMessage}}</div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round small color='primary' slot="activator" @click="sendTokens()" :loading="loading">Send Tokens</v-btn>
          <span>Post an offer to Stellar</span>
        </v-tooltip>
      </div>

      <toast-component :absolute=true location='manage-offer-dialog' :bottom=false :top=true />
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
  computed: {
    sellLabel: function () {
      if (this.project) {
        return 'Sell ' + this.project.symbol
      }
      return 'Sell Token'
    }
  },
  data() {
    return {
      visible: false,
      title: 'Send Tokens',
      statusMessage: '',
      loading: false,
      publicKey: 10,
      amount: 10
    }
  },
  watch: {
    ping: function () {
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
        Helper.debugLog('Destination key is empty')
      } else {
        Helper.debugLog('Managing Offer...')

        const fundingWallet = StellarWallet.ledger(new LedgerAPI(), () => {
          this.statusMessage = 'Confirm transaction on Ledger Nano'
          this.displayToast(this.statusMessage)
        })

        if (this.project) {
          const asset = new StellarSdk.Asset(this.project.symbol, this.project.issuer)

          StellarUtils.sendAsset(StellarWallet.secret(this.project.distributorSecret), fundingWallet, this.publicKey, String(this.amount), asset)
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
      }
    },
    displayToast(message, error = false) {
      Helper.toast(message, error, 'manage-offer-dialog')
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
