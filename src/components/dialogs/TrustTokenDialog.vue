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
        <div>
          <v-checkbox hide-details label='Use Ledger Nano for source account' v-model="useLedger"></v-checkbox>
        </div>
        <div v-if='!useLedger' class='address-box'>
          <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source account" autocomplete return-object max-height="600"></v-select>
        </div>

        <v-text-field hide-details label='Symbol' v-model.trim="symbol" @keyup.enter="trustToken()" ref='input'></v-text-field>
        <v-text-field hide-details label='Issuer Address' v-model.trim="address" @keyup.enter="trustToken()"></v-text-field>
        <v-text-field hide-details label='Trust Limit' v-model.number="trustLimit" @keyup.enter="trustToken()"></v-text-field>
        <div>Set Trust Limit to zero to remove the trust line</div>
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
  DialogTitleBar,
  StellarWallet,
  LedgerAPI
} from 'stellar-js-utils'
import StellarCommonMixin from '../StellarCommonMixin.js'
import StellarUtils from '../../js/StellarUtils.js'
import ToastComponent from '../ToastComponent.vue'
const StellarSdk = require('stellar-sdk')
import StellarAccounts from '../../js/StellarAccounts.js'

export default {
  props: ['ping'],
  mixins: [StellarCommonMixin],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent
  },
  data() {
    return {
      visible: false,
      title: 'Trust Token',
      selectedSource: null,
      symbol: '',
      address: '',
      useLedger: true,
      trustLimit: 100000,
      loading: false
    }
  },
  watch: {
    ping: function() {
      this.visible = true
      this.domain = ''
      this.useLedger = true

      // default to our example token
      this.symbol = ''
      this.address = ''

      const asset = StellarAccounts.lamboTokenAsset()
      if (asset) {
        this.symbol = asset.getCode()
        this.address = asset.getIssuer()
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
    trustToken() {
      // value can be empty to erase both key and value
      if (Helper.strOK(this.symbol) && Helper.strOK(this.address)) {
        let sourceWallet = null

        if (this.useLedger) {
          sourceWallet = StellarWallet.ledger(new LedgerAPI(), () => {
            this.displayToast(this.statusMessage)
          })
        } else {
          sourceWallet = this.sourceWallet()
        }

        if (sourceWallet) {
          Helper.debugLog('Setting trust...')
          this.loading = true

          const asset = new StellarSdk.Asset(this.symbol, this.address)

          StellarUtils.changeTrust(sourceWallet, asset, String(this.trustLimit))
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
    sourceWallet() {
      if (this.sourceValid()) {
        return StellarWallet.secret(this.selectedSource.secret)
      }
      return null
    },
    sourceValid() {
      const result = this.selectedSource ? this.selectedSource.publicKey : null

      if (Helper.strlen(result) > 0) {
        return true
      }

      this.displayToast('Please select a source account', true)

      Helper.debugLog('Please select a source account', 'Error')
      return false
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

        .status-message {
            font-size: 0.8em;
        }
    }
}
</style>
