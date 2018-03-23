<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-email'>
        <dialog-accounts ref='dialogAccounts' v-on:enter-key-down='manageOffer' v-on:toast='displayToast' :showManageOffer=true :showFunding=true :showSource=true :showBuyingAsset=true :showSellingAsset=true />
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
  DialogTitleBar
} from 'stellar-js-utils'
import StellarUtils from '../../js/StellarUtils.js'
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
      title: 'Manage Offer',
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
    manageOffer() {
      let fundingWallet = this.dialogAccounts().fundingWallet()
      const distributorWallet = this.dialogAccounts().sourceWallet()
      const offer = this.dialogAccounts().manageOffer()

      // funding wallet is optional, but make sure it's not equal to the distributor
      if (fundingWallet && fundingWallet.equalTo(distributorWallet)) {
        fundingWallet = null
      }

      Helper.debugLog('Managing Offer...')

      if (offer) {
        const price = {
          n: offer.buyUnit,
          d: offer.sellUnit
        }

        const buyAsset = new StellarSdk.Asset(offer.buyingAssetCode, offer.buyingAssetIssuer)
        const sellAsset = new StellarSdk.Asset(offer.sellingAssetCode, offer.sellingAssetIssuer)

        this.loading = true

        StellarUtils.manageOffer(distributorWallet, fundingWallet, buyAsset, sellAsset, String(offer.sellingAmount), price)
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

        .help-email {
            margin: 0 30px;
        }

        .status-message {
            font-size: 0.8em;
        }
    }
}
</style>
