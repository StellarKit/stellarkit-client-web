<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' v-on:back='mode = "start"' :showBack='showBack' />

    <div class='help-contents'>
      <div v-if='mode === "start"' class='start-box'>
        <v-tooltip open-delay='200' bottom>
          <v-btn color='primary' slot="activator" @click="buttonClick('add-account')" :loading="loading">Add Existing Account</v-btn>
          <span>Add existing account with a secret key</span>
        </v-tooltip>
        <v-tooltip open-delay='200' bottom>
          <v-btn color='primary' slot="activator" @click="buttonClick('create-account')" :loading="loading">Create New Account</v-btn>
          <span>Create a new account with a source account's secret key</span>
        </v-tooltip>
      </div>
      <div v-else>
        <div v-if='mode === "add"' class='choice-box'>
          <div class='note-text'>Paste in the secret key of an existing account.</div>

          <dialog-accounts ref='dialogAccountsAdd' v-on:toast='displayToast' :showSecret=true :showAccountName=true />

          <div class='button-holder'>
            <v-tooltip open-delay='200' bottom>
              <v-btn round color='primary' slot="activator" @click="addExistingAccount()" :loading="loading">Add Account</v-btn>
              <span>Add account with secret key</span>
            </v-tooltip>
          </div>
        </div>

        <div v-if='mode === "secret"' class='choice-box'>
          <div class='note-text'>Choose an account to fund the creating of a new account. <strong>Use either</strong> an account on Stellar Army, or paste in a secret key from another account. 1 XLM will be spent to fund the new account.</div>

          <dialog-accounts ref='dialogAccounts' v-on:toast='displayToast' :showFunding=true :showAccountName=true :showAmount=true />

          <div class='button-holder'>
            <v-tooltip open-delay='200' bottom>
              <v-btn round color='primary' slot="activator" @click="createAccount()" :loading="loading">Create Account</v-btn>
              <span>Add account with secret key</span>
            </v-tooltip>
          </div>
        </div>
      </div>

      <save-secret-dialog :ping='saveSecretDialogPing' :secret='newAccountSecret' />

      <toast-component :absolute=true location='create-account-dialog' :bottom=false :top=true />
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
import StellarAccounts from '../../js/StellarAccounts.js'
import ToastComponent from '../ToastComponent.vue'
const StellarSdk = require('stellar-sdk')
import StellarCommonMixin from '../StellarCommonMixin.js'
import SavePrintSecretDialog from './SavePrintSecretDialog.vue'
import DialogAccountsView from './DialogAccountsView.vue'

export default {
  mixins: [StellarCommonMixin],
  props: ['ping'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent,
    'save-secret-dialog': SavePrintSecretDialog,
    'dialog-accounts': DialogAccountsView
  },
  data() {
    return {
      visible: false,
      title: 'Add/Create Account',
      loading: false,
      showSecret: false,
      secretKey: '',
      mode: 'start',
      newAccountSecret: '',
      saveSecretDialogPing: false,
      xlmBalance: 1
    }
  },
  computed: {
    showBack: function() {
      return this.mode !== 'start'
    }
  },
  watch: {
    ping: function() {
      this.visible = true
      this.secretKey = ''
      this.mode = 'start'
      this.xlmBalance = 1

      if (this.dialogAccounts()) {
        this.dialogAccounts().resetState()
      }
      if (this.dialogAccountsAdd()) {
        this.dialogAccountsAdd().resetState()
      }
    }
  },
  methods: {
    dialogAccounts() {
      return this.$refs.dialogAccounts
    },
    dialogAccountsAdd() {
      return this.$refs.dialogAccountsAdd
    },
    buttonClick(id) {
      switch (id) {
        case 'add-account':
          this.mode = 'add'
          break
        case 'create-account':
          this.mode = 'secret'
          break
        case 'ledger-account':
          this.mode = 'ledger'
          break
        default:
          break
      }
    },
    addExistingAccount() {
      const accountName = this.dialogAccountsAdd().accountName()
      const secretKey = this.dialogAccountsAdd().secretKey()

      if (Helper.strOK(accountName) && Helper.strOK(secretKey)) {
        const keypair = StellarSdk.Keypair.fromSecret(secretKey)

        StellarAccounts.addAccount(keypair, accountName)

        this.displayToast('Account Added!')
        StellarUtils.updateBalances()
      }
    },
    createAccount() {
      const fundingWallet = this.dialogAccounts().fundingWallet()
      const accountName = this.dialogAccounts().accountName()

      if (fundingWallet) {
        this.loading = true

        // create issuer
        StellarUtils.newAccount(fundingWallet, String(this.xlmBalance), accountName)
          .then((accountInfo) => {
            this.accountCreated(accountInfo)
          })
          .catch((error) => {
            Helper.debugLog(error)
            this.displayToast('Failed to connect to Ledger Nano', true)
          })
      }
    },
    accountCreated(accountInfo) {
      this.displayToast('Account Created! Save the secret key!')
      StellarUtils.updateBalances()

      this.loading = false

      Helper.debugLog('New Account')
      Helper.debugLog(accountInfo.keypair.publicKey())
      Helper.debugLog(accountInfo.keypair.secret())

      setTimeout(() => {
        // update this before showing the dialog
        this.newAccountSecret = accountInfo.keypair.secret()
        this.saveSecretDialogPing = !this.saveSecretDialogPing
      }, 1000)
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

        .text-fields-area {
            margin: 0 30px;
        }

        .note-text {
            margin-bottom: 10px;
        }

        .start-box {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            button {
                min-width: 250px;
            }
        }

        .choice-box {
            width: 100%;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
