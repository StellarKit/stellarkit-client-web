<template>
<v-dialog lazy persistent v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>Create a wallet for a buyer. Adding a timelock is optional</div>
      </div>
      <div class='help-email'>
        <div class='balance-fields'>
          <v-text-field label='Token Balance' v-model.trim="tokenBalance" ref='input'></v-text-field>
          <v-text-field label='XLM Balance' v-model.number="xlmBalance" type='number' @keyup.enter="createAccount()"></v-text-field>
        </div>
        <v-text-field label='Account name' v-model.trim="accountName" @keyup.enter="createAccount()"></v-text-field>
        <div class='time-lock-fields'>
          <v-checkbox small label="Time lock this account" v-model="timeLockEnabled"></v-checkbox>

          <v-dialog v-model="modal" lazy full-width width="290px">
            <v-text-field :disabled='!timeLockEnabled' slot="activator" label="Time Lock Expiration Date" v-model="date" prepend-icon="event" readonly></v-text-field>
            <v-date-picker v-model="date" scrollable actions>
              <div slot-scope="{ save, cancel }">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                  <v-btn flat color="primary" @click="save">OK</v-btn>
                </v-card-actions>
              </div>
            </v-date-picker>

            </v-date-picker>
          </v-dialog>
        </div>
      </div>
      <div class='status-message'>{{statusMessage}}</div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round color='primary' slot="activator" @click="createAccount()" :loading="loading">Create Account</v-btn>
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
  StellarWallet,
  LedgerAPI
} from 'stellar-js-utils'
import StellarUtils from '../../js/StellarUtils.js'
import ToastComponent from '../ToastComponent.vue'
const StellarSdk = require('stellar-sdk')
const generateName = require('sillyname')

export default {
  props: ['ping', 'project'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent
  },
  data() {
    return {
      visible: false,
      title: 'Create Account',
      statusMessage: '',
      loading: false,
      tokenBalance: 10,
      xlmBalance: 2,
      timeLockEnabled: false,
      timeLockSeconds: 10,
      modal: false,
      date: null,
      accountName: null
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
  mounted() {
    this.accountName = generateName()
  },
  methods: {
    createAccount() {
      Helper.debugLog(this.project)
      this.loading = true

      const fundingWallet = StellarWallet.ledger(new LedgerAPI(), () => {
        this.statusMessage = 'Confirm transaction on Ledger Nano'
      })

      const asset = new StellarSdk.Asset(this.project.symbol, this.project.issuer)
      const issuerWallet = StellarWallet.secret(this.project.issuerSecret)

      StellarUtils.newAccountWithTokens(fundingWallet, issuerWallet, String(this.xlmBalance), asset, String(this.tokenBalance), this.accountName, this.project.symbol)
        .then((result) => {
          // result is {account: newAccount, keypair: keypair}
          Helper.debugLog(result.account)

          if (this.timeLockEnabled) {
            Helper.debugLog('adding funding account as signer...')

            return fundingWallet.publicKey()
              .then((fundingPublicKey) => {
                return StellarUtils.makeMultiSig(StellarWallet.secret(result.keypair.secret()), fundingPublicKey)
              })
          }

          return null
        })
        .then(() => {
          Helper.debugLog('Account is ready', 'Success')
          Helper.toast('Account is ready')

          return null
        })
        .catch((error) => {
          Helper.debugLog(error, 'Error')
          this.statusMessage = 'Error'
        })
        .finally(() => {
          this.loading = false
        })
    },
    displayErrorMessage(message) {
      Helper.toast(message, true, 'create-account-dialog')
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

            .balance-fields {
                display: flex;
                align-items: center;
                div.input-group {
                    flex: 1 0 200px;
                    margin-right: 16px;
                }
            }
        }

        .button-holder {
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;
        }

        .status-message {
            font-size: 0.8em;
        }

        .time-lock-fields {
            padding: 10px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            background: rgba(0,10,30,.03);
        }
    }
}
</style>
