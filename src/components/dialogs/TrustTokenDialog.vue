<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>You need to trust an asset before you can accept it.</div>
        <div class='sub-header'>You'll need the assets symbol and issuing account address. This can be found normally at the https://tokens-home-page/.well-known/stellar.toml</div>
      </div>

      <div class='help-email'>
        <dialog-accounts ref='dialogAccounts' v-on:toast='displayToast' :showSource=true :showFunding=true />

        <v-text-field hide-details label='Symbol' v-model.trim="symbol" @keyup.enter="trustToken()" ref='input'></v-text-field>
        <v-text-field hide-details label='Issuer Address' v-model.trim="address" @keyup.enter="trustToken()"></v-text-field>
        <v-text-field persistent-hint label='Trust Limit' v-model.number="trustLimit" @keyup.enter="trustToken()" hint="Set Trust Limit to zero to remove the trust line"></v-text-field>
      </div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round color='primary' slot="activator" @click="trustToken()" :loading="loading">Set Trust</v-btn>
          <span>Change's the trust link to the issuer's account</span>
        </v-tooltip>
      </div>

      <toast-component :absolute=true location='trust-token-dialog' :bottom=false :top=true />
    </div>
  </div>
</v-dialog>
</template>

<script>
import Helper from '../../js/helper.js'
import {
  DialogTitleBar
} from 'stellar-js-utils'
import StellarUtils from '../../js/StellarUtils.js'
import ToastComponent from '../ToastComponent.vue'
const StellarSdk = require('stellar-sdk')
import StellarAccounts from '../../js/StellarAccounts.js'
import DialogAccountsView from './DialogAccountsView.vue'

export default {
  props: ['ping'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent,
    'dialog-accounts': DialogAccountsView
  },
  data() {
    return {
      visible: false,
      title: 'Trust Token',
      symbol: '',
      address: '',
      trustLimit: 100000,
      loading: false
    }
  },
  watch: {
    ping: function() {
      this.visible = true
      this.domain = ''

      // default to our example token
      this.symbol = ''
      this.address = ''

      const asset = StellarAccounts.lamboTokenAsset()
      if (asset) {
        this.symbol = asset.getCode()
        this.address = asset.getIssuer()
      }

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
    trustToken() {
      if (Helper.strOK(this.symbol) && Helper.strOK(this.address)) {
        const sourceWallet = this.dialogAccounts().sourceWallet()
        const fundingWallet = this.dialogAccounts().fundingWallet()

        if (sourceWallet) {
          Helper.debugLog('Setting trust...')
          this.loading = true

          const asset = new StellarSdk.Asset(this.symbol, this.address)

          StellarUtils.changeTrust(sourceWallet, fundingWallet, asset, String(this.trustLimit))
            .then((result) => {
              Helper.debugLog(result)
              this.loading = false

              StellarUtils.updateBalances()

              this.displayToast('Success!')
            })
            .catch((error) => {
              Helper.debugLog(error, 'Error')
              this.loading = false
              this.displayToast('Error!', true)
            })
        }
      } else {
        this.displayToast('Type in a symbol and issuer key!', true)
      }
    },
    displayToast(message, error = false) {
      Helper.toast(message, error, 'trust-token-dialog')
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
            margin: 0 30px 16px;
        }
    }
}
</style>
