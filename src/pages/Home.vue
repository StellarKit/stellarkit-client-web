<template>
<div>
  <div class='top-controls'>
    <div class='address-box'>
      <v-select :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source accout" autocomplete return-object max-height="600"></v-select>
      <v-select :items="accountsUI" item-text='name' v-model="selectedDest" clearable label="Destination accout" autocomplete return-object max-height="600"></v-select>
      <v-btn small @click='swapSourceDest()'>Swap</v-btn>
    </div>

    <v-select :items="accountsUI" item-text='name' v-model="selectedSigner" clearable label="Add signer to source" autocomplete return-object max-height="600"></v-select>
    <v-btn small @click="makeSelectedPayment()">Pay</v-btn>
    <v-btn small @click="payWithSigners()">Pay with Signers</v-btn>
    <v-btn small @click="infoForSelectedSource()">Info</v-btn>
    <v-btn small @click="transactionsForSelectedSource()">Transactions</v-btn>
    <v-btn small @click="paymentsForSelectedSource()">Payments</v-btn>
    <v-btn small @click="operationsForSelectedSource()">Operations</v-btn>
    <v-btn small @click="addSignerForSelected()">Add Signer</v-btn>
    <v-btn small @click="removeSignerForSelected()">Remove Signer</v-btn>
    <v-btn small @click="mergeSelected()">Merge Selected</v-btn>
    <v-btn small @click="testFederation()">Federation Lookup</v-btn>
    <v-btn small @click="setDomain()">Set Domain</v-btn>
    <v-btn small @click="setAuthRequiredFlag()">Set AuthRequiredFlag</v-btn>
    <v-btn small @click="setAuthRevocableFlag()">Set AuthRevocableFlag</v-btn>
    <v-btn small @click="clearFlags()">Clear Flags</v-btn>
  </div>

  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />

  <federation-lookup-dialog :ping='enterStringPing' />
  <set-domain-dialog :ping='setDomainPing' :secretKey='sourceSecretKey' />
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
import FederationLookupDialog from '../components/FederationLookupDialog.vue'
import SetDomainDialog from '../components/SetDomainDialog.vue'
import Helper from '../js/helper.js'
const StellarSdk = require('stellar-sdk')
import StellarUtils from '../js/StellarUtils.js'
import {
  StellarWallet
} from 'stellar-js-utils'

export default {
  mixins: [StellarCommonMixin],
  components: {
    'account-list': AccountList,
    'federation-lookup-dialog': FederationLookupDialog,
    'set-domain-dialog': SetDomainDialog
  },
  data() {
    return {
      enterStringPing: false,
      setDomainPing: false,
      selectedSource: null,
      selectedDest: null,
      selectedSigner: null,
      sourceSecretKey: null
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
      this.enterStringPing = !this.enterStringPing
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
    setAuthRequiredFlag() {
      Helper.debugLog('setAuthRequiredFlag...')

      const sourceWallet = this.sourceWallet()
      if (sourceWallet) {
        StellarUtils.setFlags(sourceWallet, StellarSdk.AuthRequiredFlag)
          .then((response) => {
            Helper.debugLog(response, 'Success')
            return null
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      }
    },
    setAuthRevocableFlag() {
      Helper.debugLog('setAuthRevocableFlag...')

      const sourceWallet = this.sourceWallet()
      if (sourceWallet) {
        StellarUtils.setFlags(sourceWallet, StellarSdk.AuthRevocableFlag)
          .then((response) => {
            Helper.debugLog(response, 'Success')
            return null
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      }
    },
    clearFlags() {
      Helper.debugLog('clearing flags...')

      const sourceWallet = this.sourceWallet()
      if (sourceWallet) {
        StellarUtils.clearFlags(sourceWallet, StellarSdk.AuthRequiredFlag | StellarSdk.AuthRevocableFlag)
          .then((response) => {
            Helper.debugLog(response, 'Success')
            return null
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      }
    },
    swapSourceDest() {
      const tmp = this.selectedSource
      this.selectedSource = this.selectedDest
      this.selectedDest = tmp
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
        StellarUtils.sendAsset(sourceWallet, this.selectedDest.publicKey, '122', null, null, [this.selectedSigner.secret])
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
              if (txResponse.envelope_xdr) {
                txResponse.envelope_xdr = StellarSdk.xdr.TransactionEnvelope.fromXDR(txResponse.envelope_xdr, 'base64')
              }
              if (txResponse.result_xdr) {
                txResponse.result_xdr = StellarSdk.xdr.TransactionResult.fromXDR(txResponse.result_xdr, 'base64')
              }
              if (txResponse.result_meta_xdr) {
                txResponse.result_meta_xdr = StellarSdk.xdr.TransactionMeta.fromXDR(txResponse.result_meta_xdr, 'base64')
              }

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
    makeSelectedPayment() {
      Helper.debugLog('paying')

      const sourceWallet = this.sourceWallet()
      if (sourceWallet && this.destValid()) {
        StellarUtils.sendAsset(sourceWallet, this.selectedDest.publicKey, '122')
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
}

.address-box {
    display: flex;
    align-items: center;
    div.input-group {
        margin-right: 16px;
    }
}
</style>
