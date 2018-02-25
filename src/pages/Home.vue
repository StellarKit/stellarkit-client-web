<template>
<div>
  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />
  <instructions-header>
    <div>Content coming soon...</div>
  </instructions-header>
  <div class='top-controls'>
    <div class='address-box'>
      <v-select :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source accout" autocomplete return-object max-height="600"></v-select>
      <v-select :items="accountsUI" item-text='name' v-model="selectedDest" clearable label="Destination accout" autocomplete return-object max-height="600"></v-select>
      <v-select :items="accountsUI" item-text='name' v-model="selectedSigner" clearable label="Add signer to source" autocomplete return-object max-height="600"></v-select>
      <v-text-field label="Amount for payments" type='number' v-model.trim="amountForPayments"></v-text-field>
    </div>
    <div class='button-group'>
      <v-btn round small @click="makeSelectedPayment()">Pay</v-btn>
      <v-btn round small @click="infoForSelectedSource()">Info</v-btn>
      <v-btn round small @click="addSignerForSelected()">Add Signer</v-btn>
      <v-btn round small @click="payWithSigners()">Pay with Signers</v-btn>
      <v-btn round small @click="removeSignerForSelected()">Remove Signer</v-btn>
      <v-btn round small @click="mergeSelected()">Merge Selected</v-btn>
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
    </div>
  </div>

  <manage-data-dialog :ping='manageDataPing' />
  <simple-dialog :ping='setDomainPing' :secretKey='sourceSecretKey' operation='domain' />
  <simple-dialog :ping='setInflationPing' :secretKey='sourceSecretKey' operation='inflation' />
  <simple-dialog :ping='lookupFederationPing' :secretKey='sourceSecretKey' operation='federation' />
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
import InstructionsHeader from '../components/InstructionsHeader.vue'
import SimpleOperationDialog from '../components/dialogs/SimpleOperationDialog.vue'
import ManageDataDialog from '../components/dialogs/ManageDataDialog.vue'
import Helper from '../js/helper.js'
import StellarUtils from '../js/StellarUtils.js'
import {
  StellarWallet,
  LedgerAPI
} from 'stellar-js-utils'
import StellarAccounts from '../js/StellarAccounts.js'

export default {
  mixins: [StellarCommonMixin],
  components: {
    'account-list': AccountList,
    'simple-dialog': SimpleOperationDialog,
    'manage-data-dialog': ManageDataDialog,
    'instructions-header': InstructionsHeader
  },
  data() {
    return {
      lookupFederationPing: false,
      setDomainPing: false,
      setInflationPing: false,
      manageDataPing: false,
      selectedSource: null,
      selectedDest: null,
      selectedSigner: null,
      sourceSecretKey: null,
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
      // set variable to bind to dialogs props
      if (this.sourceValid()) {
        this.sourceSecretKey = this.selectedSource.secret

        this.setDomainPing = !this.setDomainPing
      }
    },
    setInflation() {
      // set variable to bind to dialogs props
      if (this.sourceValid()) {
        this.sourceSecretKey = this.selectedSource.secret

        this.setInflationPing = !this.setInflationPing
      }
    },
    mergeSelected() {
      Helper.debugLog('merging')

      const sourceWallet = this.sourceWallet()
      if (sourceWallet) {
        StellarUtils.mergeAccount(sourceWallet, this.selectedDest.publicKey)
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
    payWithSigners() {
      Helper.debugLog('path with signers...')

      const sourceWallet = this.sourceWallet()
      if (sourceWallet) {
        let signerWallet = null

        if (this.selectedSource.signWithLedger) {
          signerWallet = StellarWallet.ledger(this.ledgerAPI, () => {
            Helper.toast('Confirm on Ledger nano')
          })
        }

        if (!signerWallet && this.signerValid()) {
          signerWallet = StellarWallet.secret(this.selectedSigner.secret)
        }

        if (signerWallet) {
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
      Helper.debugLog('Setting token trust...')

      const sourceWallet = this.sourceWallet()
      if (sourceWallet) {
        // buyer must trust the distributor
        StellarUtils.changeTrust(sourceWallet, StellarAccounts.lamboTokenAsset(), String(10000))
          .then((result) => {
            Helper.debugLog(result)

            StellarUtils.updateBalances()

            return null
          })
          .catch((error) => {
            Helper.debugLog(error)
          })
      }
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
    div.input-group {
        flex: 1 0 200px;
        margin-right: 16px;
    }
}
</style>
