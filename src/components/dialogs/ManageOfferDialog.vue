<template>
<v-dialog lazy persistent v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>Post an offer</div>
        <div class='sub-header'>Post an offer to sell your token</div>
      </div>
      <div class='help-email'>
        <strong>Price:</strong>
        <v-text-field label="Buy XLM" type='number' v-model.number="offerPriceN" ref='input'></v-text-field>
        <v-text-field :label="sellLabel" type='number' v-model.number="offerPriceD"></v-text-field>
        <v-text-field label="Amount to sell" type='number' v-model.number="offerAmount" @keyup.enter="manageOffer()"></v-text-field>
      </div>
      <div class='status-message'>{{statusMessage}}</div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round color='primary' slot="activator" @click="manageOffer()" :loading="loading">Post Offer</v-btn>
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
      title: 'Manage Offer',
      statusMessage: '',
      loading: false,
      offerPriceN: 10,
      offerPriceD: 1,
      offerAmount: 2500
    }
  },
  watch: {
    ping: function () {
      this.visible = true
      this.domain = ''
      this.statusMessage = ''

      // autofocus hack
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  },
  methods: {
    manageOffer() {
      Helper.debugLog('Managing Offer...')

      const fundingWallet = StellarWallet.ledger(new LedgerAPI(), () => {
        this.statusMessage = 'Confirm transaction on Ledger Nano'
        this.displayToast(this.statusMessage)
      })

      if (this.project) {
        const price = {
          n: this.offerPriceN,
          d: this.offerPriceD
        }

        const asset = new StellarSdk.Asset(this.project.symbol, this.project.issuer)

        StellarUtils.manageOffer(StellarWallet.secret(this.project.distributorSecret), fundingWallet, StellarUtils.lumins(), asset, String(this.offerAmount), price)
          .then((result) => {
            Helper.debugLog(result, 'Success')
            this.displayToast('Success')

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
        // for the toast absolute
        position: relative;
        overflow: hidden;

        padding: 20px;
        font-size: 1.2em;

        flex: 1 1 auto;

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

        .button-holder {
            display: flex;
            justify-content: flex-end;
        }

        .status-message {
            font-size: 0.8em;
        }
    }
}
</style>
