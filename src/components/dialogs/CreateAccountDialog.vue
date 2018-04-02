<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>Create a wallet for a user.</div>
      </div>
      <div class='help-email'>
        <div class='balance-fields'>
          <v-text-field hide-details label='Token Balance' v-model.trim="tokenBalance" @keyup.enter="createAccount()" ref='input'></v-text-field>
          <v-text-field hide-details label='XLM Balance' v-model.number="xlmBalance" type='number' @keyup.enter="createAccount()"></v-text-field>
        </div>
        <dialog-accounts ref='dialogAccounts' v-on:enter-key-down='createAccount' :model="model" v-on:toast='displayToast' :showFunding=true :showAccountName=true :showTimeLock=true />
      </div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round small color='primary' slot="activator" @click="createAccount()" :loading="loading">Create Account</v-btn>
          <span>Create Token</span>
        </v-tooltip>
      </div>

      <toast-component :absolute=true location='create-account-dialog' :bottom=false :top=true />
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
import ReusableStellarViews from '../ReusableStellarViews.vue'

export default {
  props: ['ping', 'model', 'project'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent,
    'dialog-accounts': ReusableStellarViews
  },
  data() {
    return {
      visible: false,
      title: 'Create Account',
      loading: false,
      tokenBalance: 10,
      xlmBalance: 2,
      unlockTransaction: null
    }
  },
  watch: {
    ping: function() {
      this.visible = true

      // autofocus hack
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  },
  methods: {
    dialogAccounts() {
      return this.$refs.dialogAccounts
    },
    createAccount() {
      const fundingWallet = this.dialogAccounts().fundingWallet(true)
      const accountName = this.accountName()
      const timeLockDate = this.dialogAccounts().timeLock()

      if (fundingWallet) {
        this.loading = true

        const asset = new StellarSdk.Asset(this.project.symbol, this.project.issuer)
        const distributorWallet = StellarWallet.secret(this.project.distributorSecret)

        StellarUtils.newAccountWithTokens(fundingWallet, distributorWallet, String(this.xlmBalance), asset, String(this.tokenBalance), accountName, this.project.symbol)
          .then((result) => {
            // result is {account: newAccount, keypair: keypair}
            Helper.debugLog(result.account)

            if (timeLockDate) {
              Helper.debugLog('adding funding account as signer...')
              const newWallet = StellarWallet.secret(result.keypair.secret())

              StellarUtils.makeMultiSig(newWallet, fundingWallet)
                .then(() => {
                  return this.createUnlockTransaction(newWallet, fundingWallet)
                })
            }

            return null
          })
          .then(() => {
            Helper.debugLog('Account is ready', 'Success')
            this.displayToast('Success!')

            return null
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
            this.displayToast('Error!', true)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    timeFromNow(secondsAhead = 0) {
      return secondsAhead + Math.round((new Date()).getTime() / 1000)
    },
    createUnlockTransaction(newAccountWallet, fundingWallet) {
      // for debugging
      const seconds = 10
      let minTime = this.timeFromNow(seconds)

      if (this.date) {
        minTime = this.date.getSeconds()
      }

      const transactionOpts = {
        timebounds: {
          minTime: String(minTime),
          maxTime: '0' // crashes without this
        }
      }

      // using source account instead of distributor, sequence numbers would be different in the future
      return StellarUtils.removeMultiSigTransaction(newAccountWallet, fundingWallet, transactionOpts)
        .then((transaction) => {
          this.unlockTransaction = transaction.toEnvelope().toXDR('base64')
          Helper.debugLog(this.unlockTransaction, 'Save this transaction to submit later')

          Helper.toast('Transaction output to console.  Save this!')

          return transaction
        })
        .catch((error) => {
          Helper.debugLog(error, 'Error')
        })
    },
    displayToast(message, error = false) {
      Helper.toast(message, error, 'create-account-dialog')
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

            .balance-fields {
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                div.input-group {
                    flex: 1 0 200px;
                    margin-right: 16px;
                }
            }
        }
    }
}
</style>
