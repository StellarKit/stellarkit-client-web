<template>
<v-dialog lazy persistent v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>Give your asset a symbol and create the tokens. Symbol can be 1-12 characters long</div>
      </div>
      <div class='help-email'>
        <v-text-field hide-details label='Symbol' v-model.trim="symbol" @keyup.enter="createToken()" ref='input'></v-text-field>
        <dialog-accounts ref='dialogAccounts' v-on:enter-key-down='createToken' v-on:toast='displayToast' :showAmount=true :showFunding=true />
      </div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round small color='primary' slot="activator" @click="createToken()" :loading="loading">Create Token</v-btn>
          <span>Create Token</span>
        </v-tooltip>
      </div>

      <toast-component :absolute=true location='create-token-dialog' :bottom=false :top=true />
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
import AssetManager from '../../js/AssetManager.js'
import ToastComponent from '../ToastComponent.vue'
const StellarSdk = require('stellar-sdk')
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
      title: 'Create Token',
      symbol: '',
      loading: false
    }
  },
  watch: {
    ping: function() {
      this.visible = true
      this.symbol = ''

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
    createToken() {
      let issuerKeypair = null
      let asset = null

      const amount = this.dialogAccounts().amount()
      const fundingWallet = this.dialogAccounts().fundingWallet(true)

      if (amount < 1) {
        this.displayToast('Create token amount must be greater than 0', true)
        return
      }
      if (!Helper.strOK(this.symbol)) {
        this.displayToast('Type in a symbol name', true)
        return
      }

      if (fundingWallet) {
        this.loading = true

        // create issuer
        StellarUtils.newAccount(fundingWallet, '1.5', 'Issuer: ' + this.symbol, this.symbol)
          .then((accountInfo) => {
            issuerKeypair = accountInfo.keypair
            const issuerWallet = StellarWallet.secret(issuerKeypair.secret())
            asset = new StellarSdk.Asset(this.symbol, issuerKeypair.publicKey())

            // create distributor from issuer
            return StellarUtils.newAccountWithTokens(fundingWallet, issuerWallet, '3', asset, String(amount), 'Distributor: ' + this.symbol, this.symbol)
          })
          .then((accountInfo) => {
            // return results and close
            this.$emit('token-created', issuerKeypair, accountInfo.keypair, asset)
            this.visible = false

            this.displayToast('Success!')

            AssetManager.addAsset({
              symbol: asset.getCode(),
              issuer: asset.getIssuer()
            })

            return null
          })
          .catch((error) => {
            this.displayToast('Error: ' + error.message, true)
            Helper.debugLog(error)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    displayToast(message, error = false) {
      Helper.toast(message, error, 'create-token-dialog')
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
