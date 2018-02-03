<template>
<div>
  <div class='top-controls'>
    <v-btn small @click="createAccount()">Create Account</v-btn>
    <v-btn small @click="refresh()">Refresh</v-btn>
    <v-btn small @click="horizonMetrics()">Horizon</v-btn>

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

  <div class='balances'>
    <h3>Accounts - Click for info</h3>
    <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />
  </div>

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
    setDomain() {
      // set variable to bind to dialogs props
      if (this.sourceValid()) {
        this.sourceSecretKey = this.selectedSource.secret

        this.setDomainPing = !this.setDomainPing
      } else {
        this.debugLog('Error: no source account selected')
      }
    },
    setAuthRequiredFlag() {
      this.debugLog('setAuthRequiredFlag...')

      if (this.sourceValid()) {
        this.su.setFlags(this.selectedSource.secret, StellarSdk.AuthRequiredFlag)
          .then((response) => {
            this.debugLog(response, 'Success')
          })
          .catch((error) => {
            this.debugLog(error, 'Error')
          })
      } else {
        this.debugLog('Error: no source account selected')
      }
    },
    setAuthRevocableFlag() {
      this.debugLog('setAuthRevocableFlag...')

      if (this.sourceValid()) {
        this.su.setFlags(this.selectedSource.secret, StellarSdk.AuthRevocableFlag)
          .then((response) => {
            this.debugLog(response, 'Success')
          })
          .catch((error) => {
            this.debugLog(error, 'Error')
          })
      } else {
        this.debugLog('Error: no source account selected')
      }
    },
    clearFlags() {
      this.debugLog('clearing flags...')

      if (this.sourceValid()) {
        this.su.clearFlags(this.selectedSource.secret, StellarSdk.AuthRequiredFlag | StellarSdk.AuthRevocableFlag)
          .then((response) => {
            this.debugLog(response, 'Success')
          })
          .catch((error) => {
            this.debugLog(error, 'Error')
          })
      } else {
        this.debugLog('Error: no source account selected')
      }
    },
    horizonMetrics() {
      this.debugLog('horizon metrics...')

      this.su.horizonMetrics()
        .then((response) => {
          this.debugLog(response, 'Success')
        })
        .catch((error) => {
          this.debugLog(error, 'Error')
        })
    },
    swapSourceDest() {
      const tmp = this.selectedSource
      this.selectedSource = this.selectedDest
      this.selectedDest = tmp
    },
    mergeSelected() {
      this.debugLog('merging')

      if (this.sourceValid()) {
        this.su.mergeAccount(this.selectedSource.secret, this.selectedDest.publicKey)
          .then((response) => {
            this.su.updateBalances()

            this.debugLog(response, 'Success')
          })
          .catch((error) => {
            this.debugLog(error, 'Error')
          })
      } else {
        this.debugLog('Error: no source account selected')
      }
    },
    payWithSigners() {
      this.debugLog('path with signers')

      if (this.sourceValid()) {
        this.su.sendAsset(this.selectedSource.secret, this.selectedDest.publicKey, '122', null, null, [this.selectedSigner.secret])
          .then((response) => {
            this.su.updateBalances()

            this.debugLog(response, 'Success')
          })
          .catch((error) => {
            this.debugLog(error, 'Error')
          })
      } else {
        this.debugLog('Error: no source account selected')
      }
    },
    setSignerForSelected() {
      this.debugLog('set signer')

      if (this.sourceValid()) {
        this.su.makeMultiSig(this.selectedSource.secret, this.selectedSigner.publicKey)
          .then((result) => {
            this.debugLog('signed!')
          })
          .catch((error) => {
            this.debugLog(error)
          })
      } else {
        this.debugLog('Error: no source account selected')
      }
    },
    operationsForSelectedSource() {
      if (this.sourceValid()) {
        this.su.server().operations()
          .forAccount(this.selectedSource.publicKey)
          .call()
          .then((response) => {
            this.debugLog(response)
          })
      } else {
        this.debugLog('Error: no source account selected')
      }
    },
    paymentsForSelectedSource() {
      if (this.sourceValid()) {
        this.su.server().payments()
          .forAccount(this.selectedSource.publicKey)
          .call()
          .then((response) => {
            this.debugLog(response)
          })
      } else {
        this.debugLog('Error: no source account selected')
      }
    },
    transactionsForSelectedSource() {
      if (this.sourceValid()) {
        this.su.server().transactions()
          .forAccount(this.selectedSource.publicKey)
          .stream({
            onmessage: (txResponse) => {
              this.debugLog(txResponse)
            },
            onerror: (error) => {
              this.debugLog(error)
            }
          })
      } else {
        this.debugLog('Error: no source account selected')
      }
    },
    infoForSelectedSource() {
      if (this.sourceValid()) {
        this.infoForPublicKey(this.selectedSource.publicKey)
      } else {
        this.debugLog('Error: no source account selected')
      }
    },
    makeSelectedPayment() {
      this.debugLog('paying')

      if (this.sourceValid()) {
        this.su.sendAsset(this.selectedSource.secret, this.selectedDest.publicKey, '122')
          .then((response) => {
            this.su.updateBalances()

            this.debugLog(response, 'Success')
          })
          .catch((error) => {
            this.debugLog(error, 'Error')
          })
      } else {
        this.debugLog('Error: no source account selected')
      }
    },
    refresh() {
      this.debugLog('refresh')
      this.su.updateBalances(this.debugLog)
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

.balances {
    padding: 10px;
    background: steelblue;
    box-shadow: 0 7px 12px -7px rgba(0,0,0,.7);
    color: white;
    text-align: center;
}
</style>
