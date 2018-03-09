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
        <v-tooltip open-delay='200' bottom>
          <v-btn color='primary' slot="activator" @click="buttonClick('ledger-account')" :loading="loading">Create New Account with Ledger</v-btn>
          <span>Create a new account using a Ledger Nano</span>
        </v-tooltip>
      </div>
      <div v-else>
        <div v-if='mode === "add"' class='choice-box'>
          <div class='note-text'>Paste in the secret key of an existing account.</div>

          <v-text-field spellcheck="false" autofocus label="Secret key" :counter="56" v-model.trim="secretKey" @keyup.enter="addExistingAccount()" hint="Starts with an 'S'" :append-icon="showSecret ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (showSecret = !showSecret)"
            :type="showSecret ? 'text' : 'password'"></v-text-field>
          <v-text-field spellcheck="false" label="Account name" v-model.trim="name" @keyup.enter="addExistingAccount()" hint="A unique name helps you keep track of multiple accounts"> </v-text-field>

          <v-tooltip open-delay='200' bottom>
            <v-btn round color='primary' slot="activator" @click="addExistingAccount()" :loading="loading">Add Account</v-btn>
            <span>Add account with secret key</span>
          </v-tooltip>
        </div>

        <div v-if='mode === "secret"' class='choice-box'>
          <div class='note-text'>Choose an account to fund the creating of a new account. <strong>Use either</strong> an account on Stellar Army, or paste in a secret key from another account. 1 XLM will be spent to fund the new account.</div>
          <v-select :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Funding account" autocomplete return-object max-height="600"></v-select>
          <div>or, enter secret key</div>
          <v-text-field spellcheck="false" label="Funding account's secret key" :counter="56" v-model.trim="secretKey" @keyup.enter="createAccount()" hint="Starts with an 'S'" :append-icon="showSecret ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (showSecret = !showSecret)"
            :type="showSecret ? 'text' : 'password'"></v-text-field>

          <v-text-field spellcheck="false" label="Account name" v-model.trim="name" @keyup.enter="createAccount()" hint="Name helps you keep track of multiple accounts."> </v-text-field>

          <v-tooltip open-delay='200' bottom>
            <v-btn round color='primary' slot="activator" @click="createAccount()" :loading="loading">Create Account</v-btn>
            <span>Add account with secret key</span>
          </v-tooltip>
        </div>

        <div v-if='mode === "ledger"' class='choice-box'>
          <div class='note-text'>Have your Ledger plugged in with the Stellar app running. 1 XLM will be spent to fund the new account.</div>

          <v-text-field spellcheck="false" autofocus label="Account name" v-model.trim="name" @keyup.enter="createAccountWithLedger()" hint="Name helps you keep track of multiple accounts."> </v-text-field>

          <v-tooltip open-delay='200' bottom>
            <v-btn round color='primary' slot="activator" @click="createAccountWithLedger()" :loading="loading">Create Account</v-btn>
            <span>Create a new account with your Ledger Nano.</span>
          </v-tooltip>
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
  DialogTitleBar,
  StellarWallet,
  LedgerAPI
} from 'stellar-js-utils'
import StellarUtils from '../../js/StellarUtils.js'
import StellarAccounts from '../../js/StellarAccounts.js'
import ToastComponent from '../ToastComponent.vue'
const StellarSdk = require('stellar-sdk')
const generateName = require('sillyname')
import StellarCommonMixin from '../StellarCommonMixin.js'
import SavePrintSecretDialog from './SavePrintSecretDialog.vue'

export default {
  mixins: [StellarCommonMixin],
  props: ['ping'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent,
    'save-secret-dialog': SavePrintSecretDialog
  },
  data() {
    return {
      visible: false,
      title: 'Add/Create Account',
      loading: false,
      showSecret: false,
      secretKey: '',
      name: generateName(),
      isMainnet: false,
      mode: 'start',
      selectedSource: null,
      newAccountSecret: '',
      saveSecretDialogPing: false
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
      this.name = generateName()
      this.mode = 'start'
      this.isMainnet = !StellarUtils.isTestnet()
    }
  },
  mounted() {
    this.isMainnet = !StellarUtils.isTestnet()
  },
  methods: {
    sourceValid() {
      const result = this.selectedSource ? this.selectedSource.publicKey : null

      if (Helper.strOK(result)) {
        return true
      }

      Helper.debugLog('please select a source account', 'Error')
      return false
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
      if (!Helper.strOK(this.secretKey)) {
        this.displayToast('Select an account or enter a secret key', true)
      } else {
        const keypair = StellarSdk.Keypair.fromSecret(this.secretKey)

        StellarAccounts.addAccount(keypair, this.name)

        this.displayToast('Account Added!')
        StellarUtils.updateBalances()
      }
    },
    createAccountWithLedger() {
      const fundingWallet = StellarWallet.ledger(new LedgerAPI(), () => {
        this.displayToast('Confirm transaction on Ledger Nano')
      })

      this.loading = true

      StellarUtils.newAccount(fundingWallet, '1')
        .then((accountInfo) => {
          this.accountCreated(accountInfo)
        })
    },
    createAccount() {
      let secret = this.secretKey
      if (!Helper.strOK(secret)) {
        if (this.sourceValid()) {
          secret = this.selectedSource.secret
        }
      }
      if (!Helper.strOK(secret)) {
        this.displayToast('Select an account or enter a secret key', true)
      } else {
        const fundingWallet = StellarWallet.secret(secret)

        this.loading = true

        // create issuer
        StellarUtils.newAccount(fundingWallet, '1')
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
      this.name = ''
      this.selectedSource = null

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
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
}
</style>
