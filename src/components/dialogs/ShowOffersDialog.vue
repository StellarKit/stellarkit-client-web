<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-email'>
        <dialog-accounts ref='dialogAccounts' v-on:enter-key-down='showOffers' :model="model" v-on:toast='displayToast' :showSource=true />
      </div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round small color='secondary' slot="activator" @click="deleteOffers()" :loading="loading">Delete Offers</v-btn>
          <span>Delete offers for the source account</span>
        </v-tooltip>
        <v-tooltip open-delay='200' bottom>
          <v-btn round small color='primary' slot="activator" @click="showOffers()" :loading="loading">Show Offers</v-btn>
          <span>Show offers for the source account</span>
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
      title: 'Show Offers',
      loading: false
    }
  },
  watch: {
    ping: function() {
      this.visible = true

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
    showOffers() {
      const sourceWallet = this.dialogAccounts().sourceWallet()

      if (sourceWallet) {
        Helper.debugLog('Offers...')

        sourceWallet.publicKey()
          .then((pubicKey) => {
            StellarUtils.server().offers('accounts', pubicKey)
              .call()
              .then((response) => {
                response.records.forEach((offer) => {
                  Helper.debugLog(offer)
                })

                Helper.debugLog('Offers done')

                this.visible = false

                return null
              })
          })
      }
    },
    deleteOffersFromArray(sourceWallet, offers) {
      return new Promise((resolve, reject) => {
        const offer = offers.pop()
        if (offer) {
          const buying = StellarUtils.assetFromObject(offer.buying)
          const selling = StellarUtils.assetFromObject(offer.selling)

          StellarUtils.manageOffer(sourceWallet, null, buying, selling, '0', offer.price_r, offer.id)
            .then((result) => {
              Helper.debugLog(result, 'Success')

              resolve(this.deleteOffersFromArray(sourceWallet, offers))
            })
            .catch((error) => {
              Helper.debugLog(error, 'Error')

              reject(error)
            })
        } else {
          resolve(true)
        }
      })
    },
    deleteOffers() {
      const sourceWallet = this.dialogAccounts().sourceWallet()

      if (sourceWallet) {
        Helper.debugLog('Deleting Offers...')
        sourceWallet.publicKey()
          .then((pubicKey) => {
            StellarUtils.server().offers('accounts', pubicKey)
              .call()
              .then((response) => {
                return this.deleteOffersFromArray(sourceWallet, response.records)
              })
              .then((result) => {
                Helper.debugLog('Deleted all offers', 'Success')
                StellarUtils.updateBalances()

                return result
              })
              .catch((error) => {
                Helper.debugLog(error, 'Error')
                return false
              })
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
