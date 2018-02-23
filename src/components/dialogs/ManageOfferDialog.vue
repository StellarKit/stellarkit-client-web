<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>Post an offer</div>
        <div class='sub-header'>Post an offer to sell your token</div>
      </div>
      <div class='help-email'>
        <strong>Price:</strong>
        <v-text-field label="Buy XLM" type='number' v-model="offerPriceN" ref='input'></v-text-field>
        <v-text-field label="Sell LMB" type='number' v-model="offerPriceD"></v-text-field>
        <v-text-field label="Amount to sell" type='number' v-model="offerAmount"></v-text-field>
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
  StellarWallet
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

      const project = this.currentProject()
      if (project) {
        // parseInt shouldn't be necessary, but if you edit the textfields, it changes to a string
        const price = {
          n: parseInt(this.offerPriceN),
          d: parseInt(this.offerPriceD)
        }

        const asset = new StellarSdk.Asset(project.symbol, project.distributor)

        StellarUtils.manageOffer(StellarWallet.secret(this.distributorAcct.secret), StellarUtils.lumins(), asset, String(this.offerAmount), price)
          .then((result) => {
            Helper.debugLog(result, 'Success')
            return null
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      }
    },
    displayErrorMessage(message) {
      Helper.toast(message, true, 'manage-offer-dialog')
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
