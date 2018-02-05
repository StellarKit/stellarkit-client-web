<template>
<div>
  <div class='top-controls'>
    <v-btn small @click="horizonMetrics()">Horizon Metrics</v-btn>

    <div class='address-box'>
      <v-select :items="accountsUI" item-text='name' v-model="selectedSource" label="Source accout" autocomplete return-object max-height="600"></v-select>
      <v-select :items="accountsUI" item-text='name' v-model="selectedDest" label="Destination accout" autocomplete return-object max-height="600"></v-select>
      <v-btn small @click='swapSourceDest()'>Swap</v-btn>
    </div>

    <v-select :items="accountsUI" item-text='name' v-model="selectedSigner" label="Add signer to source" autocomplete return-object max-height="600"></v-select>
    <v-btn small @click="makeSelectedPayment()">Pay</v-btn>
    <v-btn small @click="infoForSelectedSource()">Info</v-btn>
    <v-btn small @click="transactionsForSelectedSource()">Transactions</v-btn>
    <v-btn small @click="paymentsForSelectedSource()">Payments</v-btn>
    <v-btn small @click="operationsForSelectedSource()">Operations</v-btn>
    <v-btn small @click="setSignerForSelected()">Set Signer</v-btn>
    <v-btn small @click="payWithSigners()">Pay with Signers</v-btn>
    <v-btn small @click="mergeSelected()">Merge Selected</v-btn>
    <v-btn small @click="testFederation()">Federation Lookup</v-btn>
    <v-btn small @click="setDomain()">Set Domain</v-btn>
    <v-btn small @click="setAuthRequiredFlag()">Set AuthRequiredFlag</v-btn>
    <v-btn small @click="setAuthRevocableFlag()">Set AuthRevocableFlag</v-btn>
    <v-btn small @click="clearFlags()">Clear Flags</v-btn>
  </div>

  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />

  <enter-string-dialog :ping='enterStringPing' />
  <set-domain-dialog :ping='setDomainPing' :secretKey='sourceSecretKey' />
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
import EnterStringDialog from '../components/EnterStringDialog.vue'
import SetDomainDialog from '../components/SetDomainDialog.vue'
import Helper from '../js/helper.js'
const StellarSdk = require('stellar-sdk')

export default {
  mixins: [StellarCommonMixin],
  components: {
    'account-list': AccountList,
    'enter-string-dialog': EnterStringDialog,
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
    this.su.updateBalances()
  },
  methods: {
    testFederation() {
      this.enterStringPing = !this.enterStringPing
    },
    sourceValid() {
      const result = this.selectedSource ? this.selectedSource.publicKey : null

      if (Helper.strlen(result) > 0) {
        return true
      }
      return false
    },
    signerValid() {
      const result = this.selectedSigner ? this.selectedSigner.publicKey : null

      if (Helper.strlen(result) > 0) {
        return true
      }
      return false
    },
    setDomain() {
      // set variable to bind to dialogs props
      if (this.sourceValid()) {
        this.sourceSecretKey = this.selectedSource.secret

        this.setDomainPing = !this.setDomainPing
      } else {
        Helper.debugLog('please select a source account', 'Error')
      }
    },
    setAuthRequiredFlag() {
      Helper.debugLog('setAuthRequiredFlag...')

      if (this.sourceValid()) {
        this.su.setFlags(this.selectedSource.secret, StellarSdk.AuthRequiredFlag)
          .then((response) => {
            Helper.debugLog(response, 'Success')
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      } else {
        Helper.debugLog('please select a source account', 'Error')
      }
    },
    setAuthRevocableFlag() {
      Helper.debugLog('setAuthRevocableFlag...')

      if (this.sourceValid()) {
        this.su.setFlags(this.selectedSource.secret, StellarSdk.AuthRevocableFlag)
          .then((response) => {
            Helper.debugLog(response, 'Success')
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      } else {
        Helper.debugLog('please select a source account', 'Error')
      }
    },
    clearFlags() {
      Helper.debugLog('clearing flags...')

      if (this.sourceValid()) {
        this.su.clearFlags(this.selectedSource.secret, StellarSdk.AuthRequiredFlag | StellarSdk.AuthRevocableFlag)
          .then((response) => {
            Helper.debugLog(response, 'Success')
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      } else {
        Helper.debugLog('please select a source account', 'Error')
      }
    },
    horizonMetrics() {
      Helper.debugLog('horizon metrics...')

      this.su.horizonMetrics()
        .then((response) => {
          Helper.debugLog(response, 'Success')
        })
        .catch((error) => {
          Helper.debugLog(error, 'Error')
        })
    },
    swapSourceDest() {
      const tmp = this.selectedSource
      this.selectedSource = this.selectedDest
      this.selectedDest = tmp
    },
    mergeSelected() {
      Helper.debugLog('merging')

      if (this.sourceValid()) {
        this.su.mergeAccount(this.selectedSource.secret, this.selectedDest.publicKey)
          .then((response) => {
            this.su.updateBalances()

            Helper.debugLog(response, 'Success')
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      } else {
        Helper.debugLog('please select a source account', 'Error')
      }
    },
    payWithSigners() {
      Helper.debugLog('path with signers...')

      if (this.sourceValid() && this.signerValid()) {
        this.su.sendAsset(this.selectedSource.secret, this.selectedDest.publicKey, '122', null, null, [this.selectedSigner.secret])
          .then((response) => {
            this.su.updateBalances()

            Helper.debugLog(response, 'Success')
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      } else {
        if (!this.sourceValid()) {
          Helper.debugLog('Error: please select a source account')
        } else {
          Helper.debugLog('Error: please select a signer account')
        }
      }
    },
    setSignerForSelected() {
      Helper.debugLog('set signer...')

      if (this.sourceValid() && this.signerValid()) {
        this.su.makeMultiSig(this.selectedSource.secret, this.selectedSigner.publicKey)
          .then((result) => {
            Helper.debugLog(result, 'Success')
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      } else {
        if (!this.sourceValid()) {
          Helper.debugLog('please select a source account', 'Error')
        } else {
          Helper.debugLog('please select a signer account', 'Error')
        }
      }
    },
    operationsForSelectedSource() {
      if (this.sourceValid()) {
        this.su.server().operations()
          .forAccount(this.selectedSource.publicKey)
          .call()
          .then((response) => {
            Helper.debugLog(response)
          })
      } else {
        Helper.debugLog('please select a source account', 'Error')
      }
    },
    paymentsForSelectedSource() {
      if (this.sourceValid()) {
        this.su.server().payments()
          .forAccount(this.selectedSource.publicKey)
          .call()
          .then((response) => {
            Helper.debugLog(response)
          })
      } else {
        Helper.debugLog('please select a source account', 'Error')
      }
    },
    transactionsForSelectedSource() {
      if (this.sourceValid()) {
        this.su.server().transactions()
          .forAccount(this.selectedSource.publicKey)
          .stream({
            onmessage: (txResponse) => {
              Helper.debugLog(txResponse)
            },
            onerror: (error) => {
              Helper.debugLog(error)
            }
          })
      } else {
        Helper.debugLog('please select a source account', 'Error')
      }
    },
    infoForSelectedSource() {
      if (this.sourceValid()) {
        this.infoForPublicKey(this.selectedSource.publicKey)
      } else {
        Helper.debugLog('please select a source account', 'Error')
      }
    },
    makeSelectedPayment() {
      Helper.debugLog('paying')

      if (this.sourceValid()) {
        this.su.sendAsset(this.selectedSource.secret, this.selectedDest.publicKey, '122')
          .then((response) => {
            this.su.updateBalances()

            Helper.debugLog(response, 'Success')

            return null
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')

            throw error
          })
      } else {
        Helper.debugLog('please select a source account', 'Error')
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.top-controls {
    padding: 20px;
}

.address-box {
    display: flex;
    align-items: center;
    div.input-group {
        margin-right: 16px;
    }
}
</style>
