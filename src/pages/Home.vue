<template>
<div>
  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />
  <instructions-header>
    <div>1. Create accounts on the testnet</div>
    <div>2. Some buttons require setting source/destination accounts before clicking</div>
    <div>3. Create a token on the second tab first to use the token buttons</div>
  </instructions-header>
  <div class='top-controls'>
    <div class='address-box'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source account" autocomplete return-object max-height="600"></v-select>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedDest" clearable label="Destination account" autocomplete return-object max-height="600"></v-select>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedSigner" clearable label="Add signer to source" autocomplete return-object max-height="600"></v-select>
      <v-text-field hide-details label="Amount for payments" type='number' v-model.trim="amountForPayments"></v-text-field>
    </div>
    <div class='button-group'>
      <v-btn round small @click="makeSelectedPayment()">Pay</v-btn>
      <v-btn round small @click="infoForSelectedSource()">Info</v-btn>
      <v-btn round small @click="addSignerForSelected()">Add Signer</v-btn>
      <v-btn round small @click="payWithSigners()">Pay with Signers</v-btn>
      <v-btn round small @click="removeSignerForSelected()">Remove Signer</v-btn>

      <v-tooltip open-delay='800' bottom>
        <v-btn round small slot='activator' @click="mergeSelected()">Merge Accounts</v-btn>
        <span>Merges source into destination</span>
      </v-tooltip>

      <v-btn round small @click="transactionsForSelectedSource()">Transactions</v-btn>
      <v-btn round small @click="paymentsForSelectedSource()">Payments</v-btn>
      <v-btn round small @click="operationsForSelectedSource()">Operations</v-btn>

      <v-tooltip open-delay='800' bottom>
        <v-btn round small slot='activator' @click="trustToken()">Trust Token</v-btn>
        <span>Account must trust token before it can receive</span>
      </v-tooltip>

      <v-btn round small @click="sendToken()">Send Token</v-btn>
      <v-btn round small @click="setDomain()">Set Domain</v-btn>
      <v-btn round small @click="setInflation()">Set Inflation Destination</v-btn>
      <v-btn round small @click="testFederation()">Federation Lookup</v-btn>
      <v-btn round small @click="manageDataPing = !manageDataPing">Manage Data</v-btn>
      <v-btn round small @click="saveSecretDialogPing = !saveSecretDialogPing">Save/Print Keys</v-btn>
    </div>
  </div>

  <save-secret-dialog :ping='saveSecretDialogPing' />
  <manage-data-dialog :ping='manageDataPing' />
  <merge-dialog :ping='mergeDialogPing' />
  <simple-dialog :ping='setDomainPing' operation='domain' />
  <simple-dialog :ping='setInflationPing' operation='inflation' />
  <simple-dialog :ping='lookupFederationPing' operation='federation' />
  <trust-token-dialog :ping='trustDialogPing' />
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
import InstructionsHeader from '../components/InstructionsHeader.vue'
import SimpleOperationDialog from '../components/dialogs/SimpleOperationDialog.vue'
import MergeDialog from '../components/dialogs/MergeDialog.vue'
import ManageDataDialog from '../components/dialogs/ManageDataDialog.vue'
import TrustTokenDialog from '../components/dialogs/TrustTokenDialog.vue'
import Helper from '../js/helper.js'
import StellarUtils from '../js/StellarUtils.js'
import {
  StellarWallet,
  LedgerAPI
} from 'stellar-js-utils'
import StellarAccounts from '../js/StellarAccounts.js'
import SavePrintSecretDialog from '../components/dialogs/SavePrintSecretDialog.vue'

export default {
  mixins: [StellarCommonMixin],
  components: {
    'account-list': AccountList,
    'simple-dialog': SimpleOperationDialog,
    'manage-data-dialog': ManageDataDialog,
    'instructions-header': InstructionsHeader,
    'save-secret-dialog': SavePrintSecretDialog,
    'trust-token-dialog': TrustTokenDialog,
    'merge-dialog': MergeDialog
  },
  data() {
    return {
      lookupFederationPing: false,
      setDomainPing: false,
      setInflationPing: false,
      manageDataPing: false,
      saveSecretDialogPing: false,
      mergeDialogPing: false,
      trustDialogPing: false,
      selectedSource: null,
      selectedDest: null,
      selectedSigner: null,
      amountForPayments: 20,
      ledgerAPI: null
    }
  },
  mounted() {
    StellarUtils.updateBalances()

    this.ledgerAPI = new LedgerAPI()
  },
  methods: {
    sourceWallet() {
      if (this.sourceValid()) {
        return StellarWallet.secret(this.selectedSource.secret)
      }
      return null
    },
    testFederation() {
      this.lookupFederationPing = !this.lookupFederationPing
    },
    sourceValid() {
      const result = this.selectedSource ? this.selectedSource.publicKey : null

      if (Helper.strlen(result) > 0) {
        return true
      }
      Helper.debugLog('please select a source account', 'Error')

      return false
    },
    destValid() {
      const result = this.selectedDest ? this.selectedDest.publicKey : null

      if (Helper.strlen(result) > 0) {
        return true
      }
      Helper.debugLog('please select a dest account', 'Error')

      return false
    },
    signerValid() {
      const result = this.selectedSigner ? this.selectedSigner.publicKey : null

      if (Helper.strlen(result) > 0) {
        return true
      }
      Helper.debugLog('please select a signer account', 'Error')

      return false
    },
    setDomain() {
      this.setDomainPing = !this.setDomainPing
    },
    setInflation() {
      this.setInflationPing = !this.setInflationPing
    },
    mergeSelected() {
      this.mergeDialogPing = !this.mergeDialogPing
    },
    payWithSigners() {
      Helper.debugLog('path with signers...')

      const sourceWallet = this.sourceWallet()
      if (sourceWallet) {
        if (this.signerValid()) {
          const signerWallet = StellarWallet.secret(this.selectedSigner.secret)

          StellarUtils.sendAsset(sourceWallet, null, this.selectedDest.publicKey, String(this.amountForPayments), null, null, [signerWallet])
            .then((response) => {
              StellarUtils.updateBalances()

              Helper.debugLog(response, 'Success')
              return null
            })
            .catch((error) => {
              Helper.debugLog(error, 'Error')
            })
        }
      }
    },
    addSignerForSelected() {
      Helper.debugLog('add signer...')

      const sourceWallet = this.sourceWallet()
      if (sourceWallet && this.signerValid()) {
        StellarUtils.makeMultiSig(sourceWallet, this.selectedSigner.publicKey)
          .then((result) => {
            Helper.debugLog(result, 'Success')
            return null
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      }
    },
    removeSignerForSelected() {
      Helper.debugLog('remove signer...')

      const sourceWallet = this.sourceWallet()
      if (sourceWallet && this.signerValid()) {
        StellarUtils.removeMultiSig(sourceWallet, StellarWallet.secret(this.selectedSigner.secret))
          .then((result) => {
            Helper.debugLog(result, 'Success')
            return null
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      }
    },
    operationsForSelectedSource() {
      if (this.sourceValid()) {
        StellarUtils.server().operations()
          .forAccount(this.selectedSource.publicKey)
          .call()
          .then((response) => {
            Helper.debugLog(response)
          })
      }
    },
    paymentsForSelectedSource() {
      if (this.sourceValid()) {
        StellarUtils.server().payments()
          .forAccount(this.selectedSource.publicKey)
          .call()
          .then((response) => {
            Helper.debugLog(response)
            return null
          })
      }
    },
    transactionsForSelectedSource() {
      if (this.sourceValid()) {
        StellarUtils.server().transactions()
          .forAccount(this.selectedSource.publicKey)
          .stream({
            onmessage: (txResponse) => {
              Helper.debugLog(txResponse)
            },
            onerror: (error) => {
              Helper.debugLog(error)
            }
          })
      }
    },
    infoForSelectedSource() {
      if (this.sourceValid()) {
        this.infoForPublicKey(this.selectedSource.publicKey)
      }
    },
    trustToken() {
      this.trustDialogPing = !this.trustDialogPing
    },
    sendToken() {
      Helper.debugLog('sending tokens ' + this.amountForPayments + '...')

      const sourceWallet = this.sourceWallet()
      if (sourceWallet && this.destValid()) {
        StellarUtils.sendAsset(sourceWallet, null, this.selectedDest.publicKey, String(this.amountForPayments), StellarAccounts.lamboTokenAsset())
          .then((response) => {
            StellarUtils.updateBalances()

            Helper.debugLog(response, 'Success')
            return null
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      }
    },
    makeSelectedPayment() {
      Helper.debugLog('paying ' + this.amountForPayments + '...')

      const sourceWallet = this.sourceWallet()
      if (sourceWallet && this.destValid()) {
        StellarUtils.sendAsset(sourceWallet, null, this.selectedDest.publicKey, String(this.amountForPayments))
          .then((response) => {
            StellarUtils.updateBalances()

            Helper.debugLog(response, 'Success')
            return null
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../scss/styles.scss';

.top-controls {
    padding: 10px 20px;
}

.address-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 16px;
    div.input-group {
        flex: 1 0 200px;
        margin-right: 16px;
    }
}
</style>
