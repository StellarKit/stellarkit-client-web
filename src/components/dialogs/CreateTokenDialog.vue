<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>Give your asset a symbol and create the tokens.</div>
      </div>
      <div class='help-email'>
        <dialog-accounts ref='dialogAccounts' v-on:enter-key-down='createToken' :model="model" v-on:toast='displayToast' :showSymbol=true :showAmount=true :showFunding=true :showTextValue=true :showAuthFlags=true />
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
      title: 'Create Token',
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
    createToken() {
      const amount = this.dialogAccounts().amount()
      const fundingWallet = this.dialogAccounts().fundingWallet(true)
      const symbol = this.dialogAccounts().symbol(true)

      if (Helper.strOK(symbol)) {
        if (amount < 1) {
          this.displayToast('Create token amount must be greater than 0', true)
          return
        }

        if (fundingWallet) {
          this.loading = true

          let issuerKeypair = null
          let distributorKeypair = null
          let asset = null
          let issuerWallet = null
          let distributorWallet = null
          const homeDomain = this.dialogAccounts().textValue()
          const authFlags = this.dialogAccounts().authFlags()
          const trustBtcEth = this.dialogAccounts().trustBtcEth()

          // create issuer
          StellarUtils.newAccount(fundingWallet, '1.5', 'Issuer: ' + symbol, symbol)
            .then((accountInfo) => {
              issuerKeypair = accountInfo.keypair
              issuerWallet = StellarWallet.secret(issuerKeypair.secret())
              asset = new StellarSdk.Asset(symbol, issuerKeypair.publicKey())

              return StellarUtils.newAccountWithTokens(fundingWallet, issuerWallet, '3', asset, String(amount), 'Distributor: ' + symbol, symbol)
            })
            .then((accountInfo) => {
              distributorKeypair = accountInfo.keypair
              distributorWallet = StellarWallet.secret(distributorKeypair.secret())

              // optional
              if (Helper.strOK(homeDomain)) {
                return StellarUtils.setDomain(issuerWallet, homeDomain, fundingWallet)
              }

              return null
            })
            .then(() => {
              // optional
              if (trustBtcEth) {
                return issuerWallet.publicKey()
                  .then((publicKey) => {
                    const ethAsset = new StellarSdk.Asset('ETH', publicKey)
                    const btcAsset = new StellarSdk.Asset('BTC', publicKey)

                    return StellarUtils.changeTrust(distributorWallet, null, ethAsset, '100000000')
                      .then(() => {
                        AssetManager.addAsset({
                          symbol: ethAsset.getCode(),
                          issuer: ethAsset.getIssuer()
                        })

                        return StellarUtils.changeTrust(distributorWallet, null, btcAsset, '100000000')
                          .then(() => {
                            AssetManager.addAsset({
                              symbol: btcAsset.getCode(),
                              issuer: btcAsset.getIssuer()
                            })
                          })
                      })
                  })
              }

              return null
            })
            .then(() => {
              if (authFlags !== 0) {
                return StellarUtils.setFlags(issuerWallet, authFlags)
              }

              return null
            })
            .then(() => {
              // return results and close
              this.$emit('token-created', issuerKeypair, distributorKeypair, asset)
              this.visible = false

              this.displayToast('Success!')
              Helper.displayLog('Create token successful')

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
