<template>
  <v-dialog v-model="visible" scrollable @keydown.esc="visible = false" max-width="600">
    <div class="main-container">
      <dialog-titlebar
        :title="title"
        v-on:close="visible = false"
        v-on:back="mode = 'start'"
        :showBack="showBack"
      />

      <div class="help-contents">
        <div v-if="mode === 'start'" class="start-box">
          <v-tooltip v-if="isTestnet()" open-delay="200" bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                v-on="on"
                @click="buttonClick('testnet-account')"
              >Free Testnet Account</v-btn>
            </template>
            <span>Add a free testnet account</span>
          </v-tooltip>
          <v-tooltip open-delay="200" bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                v-on="on"
                @click="buttonClick('add-account')"
              >Add Existing Account</v-btn>
            </template>
            <span>Add existing account with a secret key</span>
          </v-tooltip>
          <v-tooltip open-delay="200" bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                v-on="on"
                @click="buttonClick('create-account')"
              >Create New Account</v-btn>
            </template>
            <span>Create a new account with a source account's secret key</span>
          </v-tooltip>

          <v-tooltip open-delay="200" bottom>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on" @click="buttonClick('import')">Import Accounts...</v-btn>
            </template>
            <span>Import a .json file of account keys</span>
          </v-tooltip>
          <v-tooltip open-delay="200" bottom>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on" @click="buttonClick('export')">Export Accounts...</v-btn>
            </template>
            <span>Create a new account with a source account's secret key</span>
          </v-tooltip>
        </div>

        <div v-else>
          <div v-if="mode === 'add'" class="choice-box">
            <div class="note-text">Paste in the secret or public key of an existing account.</div>
            <dialog-accounts
              ref="dialogAccountsAdd"
              v-on:enter-key-down="addExistingAccount"
              v-on:toast="displayToast"
              :model="model"
              :showSecret="true"
              :showAccountName="true"
            />

            <div class="button-holder">
              <v-tooltip open-delay="200" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    rounded
                    color="primary"
                    v-on="on"
                    @click="addExistingAccount"
                    :loading="loading"
                  >Add Account</v-btn>
                </template>
                <span>Add account with key</span>
              </v-tooltip>
            </div>
          </div>

          <div v-if="mode === 'secret'" class="choice-box">
            <dialog-accounts
              ref="dialogAccounts"
              v-on:enter-key-down="createAccount"
              v-on:toast="displayToast"
              :model="model"
              :showFunding="true"
              :showTextValue="true"
              :showAccountName="true"
              :showAmount="true"
            />
            <div class="button-holder">
              <v-tooltip open-delay="200" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    rounded
                    color="primary"
                    v-on="on"
                    @click="createAccount"
                    :loading="loading"
                  >Create Account</v-btn>
                </template>
                <span>Add account with secret key</span>
              </v-tooltip>
            </div>
          </div>

          <div v-if="mode === 'testnet'" class="choice-box">
            <dialog-accounts
              ref="dialogAccounts"
              v-on:enter-key-down="createTestnetAccount"
              v-on:toast="displayToast"
              :model="model"
              :showAccountName="true"
            />
            <div class="button-holder">
              <v-tooltip open-delay="200" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    rounded
                    color="primary"
                    v-on="on"
                    @click="createTestnetAccount"
                    :loading="loading"
                  >Create Account</v-btn>
                </template>
                <span>Add account with secret key</span>
              </v-tooltip>
            </div>
          </div>
        </div>

        <save-secret-dialog :ping="saveSecretDialogPing" :publicKey="newAccountPublicKey" />
        <toast-component
          :absolute="true"
          location="create-account-dialog"
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
import StellarUtils from '../../js/StellarUtils.js'
import StellarAccounts from '../../js/StellarAccounts.js'
import ToastComponent from '../ToastComponent.vue'
const StellarSdk = require('stellar-sdk')
import StellarCommonMixin from '../StellarCommonMixin.js'
import SavePrintSecretDialog from './SavePrintSecretDialog.vue'
import ReusableStellarViews from '../ReusableStellarViews.vue'
const FileSaver = require('file-saver')
import $ from 'jquery'

export default {
  mixins: [StellarCommonMixin],
  props: ['ping', 'model'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent,
    'save-secret-dialog': SavePrintSecretDialog,
    'dialog-accounts': ReusableStellarViews
  },
  data() {
    return {
      visible: false,
      title: 'Add/Create Account',
      loading: false,
      mode: 'start',
      newAccountPublicKey: '',
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
      this.model.amountLabel = 'Starting balance in XLM'
      this.mode = 'start'
    }
  },
  methods: {
    isTestnet() {
      return StellarUtils.isTestnet()
    },
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
        case 'testnet-account':
          this.mode = 'testnet'
          break
        case 'import':
          {
            const that = this
            const input$ = $('<input type="file">')
            const inputElement = input$[0]

            input$
              .on('change', () => {
                that.importAccounts(inputElement.files)
              })
              .click()
          }
          break
        case 'export':
          this.exportAccounts()
          break
        default:
          break
      }
    },
    exportAccounts() {
      const jsonObj = { accounts: [] }
      for (const acct of StellarAccounts.accounts()) {
        const acctInfo = {}
        acctInfo.name = acct.name
        acctInfo.secret = acct.secret
        acctInfo.publicKey = acct.publicKey
        jsonObj.accounts.push(acctInfo)
      }

      const jsonString = JSON.stringify(jsonObj, null, '  ')
      const blob = new Blob([jsonString], {
        type: 'text/plain;charset=utf-8'
      })
      FileSaver.saveAs(blob, 'accounts.json')
    },
    importAccounts(fileNames) {
      if (fileNames.length === 1) {
        const file = fileNames[0]

        const reader = new FileReader()
        reader.addEventListener('load', e => {
          const json = JSON.parse(e.target.result)

          for (const acct of json.accounts) {
            let keypair

            if (Helper.strOK(acct.secret)) {
              keypair = StellarSdk.Keypair.fromSecret(acct.secret)
            } else if (Helper.strOK(acct.publicKey)) {
              keypair = StellarSdk.Keypair.fromPublicKey(acct.publicKey)
            }

            StellarAccounts.addAccount(keypair, acct.name)
          }

          StellarUtils.updateBalances()
        })

        reader.readAsBinaryString(file)
      }
    },
    addExistingAccount() {
      const accountName = this.dialogAccountsAdd().accountName()
      const secretKey = this.dialogAccountsAdd().secretKey()
      const publicKey = this.dialogAccountsAdd().publicKey()

      if (Helper.strOK(accountName)) {
        let keypair = null

        if (Helper.strOK(secretKey)) {
          try {
            keypair = StellarSdk.Keypair.fromSecret(secretKey)
          } catch (error) {
            Helper.debugLog(error)
            Helper.toast('Key is invalid!', true)
          }
        }

        if (Helper.strOK(publicKey)) {
          try {
            keypair = StellarSdk.Keypair.fromPublicKey(publicKey)
          } catch (error) {
            Helper.debugLog(error)
            Helper.toast('Key is invalid!', true)
          }
        }

        if (keypair) {
          const acct = StellarAccounts.addAccount(keypair, accountName)

          if (acct) {
            this.displayToast('Account Added!')
            StellarUtils.updateBalances()
          } else {
            this.displayToast('Account already exists!', true)
          }
        }
      }
    },
    createTestnetAccount() {
      const accountName = this.dialogAccounts().accountName()

      this.loading = true

      StellarUtils.createTestAccount(accountName)
        .then(result => {
          Helper.debugLog(result)

          this.visible = false
        })
        .catch(error => {
          Helper.debugLog(error, 'Error')
        })
        .finally(() => {
          this.loading = false
        })
    },
    createAccount() {
      const fundingWallet = this.dialogAccounts().fundingWallet(true)
      const accountName = this.dialogAccounts().accountName()
      const amount = this.dialogAccounts().amount()

      // used when providing a vanity address to create
      const secretKey = this.dialogAccounts().textValue()

      if (fundingWallet) {
        this.loading = true

        // create issuer
        StellarUtils.newAccount(
          fundingWallet,
          String(amount),
          accountName,
          null,
          secretKey
        )
          .then(accountInfo => {
            this.accountCreated(accountInfo)
          })
          .catch(error => {
            Helper.debugLog(error)
            this.displayToast('Error', true)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    accountCreated(accountInfo) {
      this.displayToast('Account Created! Save the secret key!')
      StellarUtils.updateBalances()

      Helper.debugLog('New Account')
      Helper.debugLog(accountInfo.keypair.publicKey())
      Helper.debugLog(accountInfo.keypair.secret())

      setTimeout(() => {
        // update this before showing the dialog
        this.newAccountPublicKey = accountInfo.keypair.publicKey()
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
