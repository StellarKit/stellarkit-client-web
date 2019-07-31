<template>
  <v-dialog v-model="visible" scrollable @keydown.esc="visible = false" max-width="600">
    <div class="main-container">
      <dialog-titlebar :title="title" v-on:close="visible = false" />

      <div class="help-contents">
        <div class="help-text">
          <div>Send a payment to the destination account.</div>
        </div>

        <div class="help-email">
          <dialog-accounts
            ref="dialogAccounts"
            v-on:toast="displayToast"
            v-on:enter-key-down="sendAssets"
            :model="model"
            :showSource="true"
            :showFunding="true"
            :showDest="true"
            :showAmount="true"
            :showSigner="true"
            :showAsset="true"
          />
        </div>
        <div class="button-holder">
          <v-tooltip open-delay="200" bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                rounded
                color="primary"
                v-on="on"
                @click="sendAssets()"
                :loading="loading"
              >Send Payment</v-btn>
            </template>
            <span>Send the payment</span>
          </v-tooltip>
        </div>

        <toast-component
          :absolute="true"
          location="send-assets-dialog"
          :bottom="false"
          :top="true"
        />
      </div>
    </div>
  </v-dialog>
</template>

<script>
import Helper from '../../js/helper.js'
import { DialogTitleBar } from 'stellarkit-js-ui'
import { StellarWallet } from 'stellarkit-js-utils'
import StellarUtils from '../../js/StellarUtils.js'
import ToastComponent from '../ToastComponent.vue'
import ReusableStellarViews from '../ReusableStellarViews.vue'
import SerialTransactions from '../../js/SerialTransactions.js'

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
      title: 'Send XLM',
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
    batchedDestWallets(batchSize, publicKeys) {
      const result = []
      let batch = []

      for (const publicKey of publicKeys) {
        const destWallet = StellarWallet.public(publicKey)

        batch.push(destWallet)

        if (batch.length >= batchSize) {
          result.push(batch)
          batch = []
        }
      }

      if (batch.length > 0) {
        result.push(batch)
      }

      return result
    },
    sendAssets() {
      const sourceWallet = this.dialogAccounts().sourceWallet()
      const amount = this.dialogAccounts().amount()
      const asset = this.dialogAccounts().asset()
      const signerWallet = this.dialogAccounts().signerWallet()
      const fundingWallet = this.dialogAccounts().fundingWallet()

      if (sourceWallet && amount > 0 && asset) {
        let additionalSigners = null
        if (signerWallet) {
          additionalSigners = [signerWallet]
        }

        const destPublicKeys = this.dialogAccounts().destPublicKeys()
        const destKeysAndMemos = this.dialogAccounts().destKeysAndMemos()

        if (destPublicKeys.length > 0) {
          let nextPromise = Promise.resolve()
          this.loading = true

          const batchSize = this.dialogAccounts().destPaymentsBatchSize()

          const destWalletBatches = this.batchedDestWallets(
            batchSize,
            destPublicKeys
          )

          for (const destWallets of destWalletBatches) {
            nextPromise = nextPromise.then(() => {
              return StellarUtils.sendAssetBatch(
                sourceWallet,
                fundingWallet,
                destWallets,
                String(amount),
                asset,
                null,
                additionalSigners
              )
                .then(result => {
                  Helper.debugLog('success: ' + JSON.stringify(destWallets))
                  return null
                })
                .catch(error => {
                  Helper.debugLog(
                    'failed: ' + JSON.stringify(destWallets),
                    'Error'
                  )
                  Helper.debugLog(error)
                })
            })
          }

          nextPromise.then(() => {
            this.displayToast('Done')
            StellarUtils.updateBalances()
            this.loading = false
          })
        } else if (destKeysAndMemos.length > 0) {
          const serial = new SerialTransactions(error => {
            this.loading = false
            StellarUtils.updateBalances()

            if (error) {
              this.displayToast('Error: ' + error, true)
              Helper.debugLog(error)
            } else {
              this.displayToast('Success!')
            }
          })

          for (const x of destKeysAndMemos) {
            // got to trim this stuff, will have spaces
            const publicKey = x.key.trim()
            const memo = x.memo.trim()

            const destWallet = StellarWallet.public(publicKey)

            serial.sendAsset(
              sourceWallet,
              fundingWallet,
              destWallet,
              String(amount),
              asset,
              memo,
              additionalSigners
            )
          }
          serial.go()
          this.loading = true
        } else {
          const destWallet = this.dialogAccounts().destWallet()

          if (destWallet) {
            Helper.debugLog('Sending...')
            this.loading = true

            return StellarUtils.sendAsset(
              sourceWallet,
              fundingWallet,
              destWallet,
              String(amount),
              asset,
              null,
              additionalSigners
            )
              .then(result => {
                Helper.debugLog(result)

                StellarUtils.updateBalances()
                this.loading = false
                this.displayToast('Success!')

                return null
              })
              .catch(error => {
                Helper.debugLog(error)
                this.loading = false
                this.displayToast('Error!', true)
              })
          }
        }
      }
    },
    displayToast(message, error = false) {
      Helper.toast(message, error, 'send-assets-dialog')
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
