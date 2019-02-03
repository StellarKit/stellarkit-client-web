<template>
<v-dialog
  lazy
  v-model='visible'
  scrollable
  @keydown.esc="visible = false"
  max-width="600"
>
  <div class='main-container'>
    <dialog-titlebar
      :title=title
      v-on:close='visible = false'
    />

    <div class='help-contents'>
      <div class='help-email'>
        <dialog-accounts
          ref='dialogAccounts'
          v-on:enter-key-down='buyAsset'
          v-on:toast='displayToast'
          :model="model"
          :showBuyOffer=true
          :showFunding=true
          :showSigner=true
          :showSource=true
          :showBuyingAsset=true
          :showSellingAsset=true
        />
      </div>
      <div class='button-holder'>
        <v-tooltip
          open-delay='200'
          bottom
        >
          <v-btn
            round
            small
            color='primary'
            slot="activator"
            @click="buyAsset()"
            :loading="loading"
          >Buy Asset</v-btn>
          <span>Buy an asset</span>
        </v-tooltip>
      </div>

      <toast-component
        :absolute=true
        location='manage-offer-dialog'
        :bottom=false
        :top=true
      />
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
import ReusableStellarViews from '../ReusableStellarViews.vue'

export default {
  props: ['ping', 'model'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent,
    'dialog-accounts': ReusableStellarViews
  },
  data() {
    return {
      visible: false,
      title: 'Buy Asset',
      loading: false
    }
  },
  watch: {
    ping: function() {
      this.visible = true
    }
  },
  methods: {
    dialogAccounts() {
      return this.$refs.dialogAccounts
    },
    buyAsset() {
      const sourceWallet = this.dialogAccounts().sourceWallet()
      const signerWallet = this.dialogAccounts().signerWallet()
      const offer = this.dialogAccounts().buyOffer()
      const fundingWallet = this.dialogAccounts().fundingWallet()

      let additionalSigners = null
      if (signerWallet) {
        additionalSigners = [signerWallet]
      }

      Helper.debugLog('Buying asset...')

      if (offer) {
        const buyAsset = offer.buyingAsset
        const sellAsset = offer.sellingAsset

        this.loading = true

        StellarUtils.buyTokens(sourceWallet, sellAsset, buyAsset, String(offer.buySendMax), String(offer.buyAmount), fundingWallet, additionalSigners)
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
