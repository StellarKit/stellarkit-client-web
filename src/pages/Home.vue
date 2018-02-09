<template>
<div>
  <div class='top-controls'>
    <div class='address-box'>
      <v-select :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source accout" autocomplete return-object max-height="600"></v-select>
      <v-select :items="accountsUI" item-text='name' v-model="selectedDest" clearable label="Destination accout" autocomplete return-object max-height="600"></v-select>
      <v-select :items="accountsUI" item-text='name' v-model="selectedSigner" clearable label="Add signer to source" autocomplete return-object max-height="600"></v-select>
      <v-text-field label="Amount for payments" type='number' v-model.trim="amountForPayments"></v-text-field>
    </div>

    <v-btn small @click="makeSelectedPayment()">Pay</v-btn>
    <v-btn small @click="payWithSigners()">Pay with Signers</v-btn>
    <v-btn small @click="infoForSelectedSource()">Info</v-btn>
    <v-btn small @click="addSignerForSelected()">Add Signer</v-btn>
    <v-btn small @click="removeSignerForSelected()">Remove Signer</v-btn>
    <v-btn small @click="mergeSelected()">Merge Selected</v-btn>
    <v-btn small @click="transactionsForSelectedSource()">Transactions</v-btn>
    <v-btn small @click="paymentsForSelectedSource()">Payments</v-btn>
    <v-btn small @click="operationsForSelectedSource()">Operations</v-btn>

    <v-tooltip open-delay='800' bottom>
      <v-btn slot='activator' small @click="trustToken()">Trust Token</v-btn>
      <span>Account must trust token before it can receive</span>
    </v-tooltip>

    <v-btn small @click="sendToken()">Send Token</v-btn>
    <v-btn small @click="setDomain()">Set Domain</v-btn>
    <v-btn small @click="setInflation()">Set Inflation Destination</v-btn>
    <v-btn small @click="testFederation()">Federation Lookup</v-btn>
  </div>

  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />

  <simple-dialog :ping='setDomainPing' :secretKey='sourceSecretKey' operation='domain' />
  <simple-dialog :ping='setInflationPing' :secretKey='sourceSecretKey' operation='inflation' />
  <simple-dialog :ping='lookupFederationPing' :secretKey='sourceSecretKey' operation='federation' />
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
import SimpleOperationDialog from '../components/SimpleOperationDialog.vue'
import Helper from '../js/helper.js'
import StellarUtils from '../js/StellarUtils.js'
import {
  StellarWallet
} from 'stellar-js-utils'
import StellarAccounts from '../js/StellarAccounts.js'

export default {
  mixins: [StellarCommonMixin],
  components: {
    'account-list': AccountList,
    'simple-dialog': SimpleOperationDialog
  },
  data() {
    return {
      lookupFederationPing: false,
      setDomainPing: false,
      setInflationPing: false,
      selectedSource: null,
      selectedDest: null,
      selectedSigner: null,
      sourceSecretKey: null,
      amountForPayments: 20
    }
  },
  mounted() {
    StellarUtils.updateBalances()
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
      if (sourceWallet && this.signerValid()) {
        StellarUtils.sendAsset(sourceWallet, this.selectedDest.publicKey, String(this.amountForPayments), null, null, [this.selectedSigner.secret])
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
        StellarUtils.removeMultiSig(sourceWallet, this.selectedSigner.secret, this.selectedSigner.publicKey)
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
        StellarUtils.sendAsset(sourceWallet, this.selectedDest.publicKey, String(this.amountForPayments), StellarAccounts.lamboTokenAsset())
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
        StellarUtils.sendAsset(sourceWallet, this.selectedDest.publicKey, String(this.amountForPayments))
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
.top-controls {
    padding: 8px 20px;
    button {
        margin: 4px 2px;
    }
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
