<template>
<v-dialog lazy persistent v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>Post an offer to sell your token</div>
      </div>
      <div class='help-email'>
        <v-text-field hide-details label="Buy XLM" type='number' v-model.number="offerPriceN" ref='input'></v-text-field>
        <v-text-field hide-details :label="sellLabel" type='number' v-model.number="offerPriceD"></v-text-field>
        <v-text-field hide-details label="Amount to sell" type='number' v-model.number="offerAmount" @keyup.enter="manageOffer()"></v-text-field>
        <dialog-accounts ref='dialogAccounts' v-on:toast='displayToast' :showFunding=true />
      </div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round small color='primary' slot="activator" @click="manageOffer()" :loading="loading">Post Offer</v-btn>
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
  computed: {
    sellLabel: function() {
      if (this.project) {
        return 'Sell ' + this.project.symbol
      }
      return 'Sell Token'
    }
  },
  data() {
    return {
      visible: false,
      title: 'Manage Offer',
      loading: false,
      offerPriceN: 10,
      offerPriceD: 1,
      offerAmount: 2500
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
    manageOffer() {
      let fundingWallet = this.dialogAccounts().fundingWallet()
      const distributorWallet = StellarWallet.secret(this.project.distributorSecret)

      // funding wallet is optional, but make sure it's not equal to the distributor
      if (fundingWallet && fundingWallet.equalTo(distributorWallet)) {
        fundingWallet = null
      }

      Helper.debugLog('Managing Offer...')

      if (this.project) {
        const price = {
          n: this.offerPriceN,
          d: this.offerPriceD
        }

        const asset = new StellarSdk.Asset(this.project.symbol, this.project.issuer)
        this.loading = true

        StellarUtils.manageOffer(distributorWallet, fundingWallet, StellarUtils.lumins(), asset, String(this.offerAmount), price)
          .then((result) => {
            Helper.debugLog(result, 'Success')
            this.displayToast('Success')
            this.loading = false

            StellarUtils.updateBalances()
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
            this.loading = false

            let message = error.message
            if (message === 'connection failed') {
              message = 'Ledger Nano not found'
            }

            this.displayToast(message, true)
          })
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
