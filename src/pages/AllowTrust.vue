<template>
<div>
  <div class='top-controls'>
    <v-btn small @click="createAccount()">Create Account</v-btn>

    <div class='address-box'>
      <v-select :items="accountsUI" item-text='name' v-model="selectedSource" label="Source accout" autocomplete return-object max-height="600"></v-select>
    </div>

    <div>1. First setup a Token on the previous tab</div>
    <div>2. Set Source account to Issuer, then set or clear flags to test AuthRequiredFlag</div>
    <v-btn small @click="setAuthRequiredFlag()">Set AuthRequiredFlag</v-btn>
    <v-btn small @click="setAuthRevocableFlag()">Set AuthRevocableFlag</v-btn>
    <v-btn small @click="clearFlags()">Clear Flags</v-btn>

    <div>Set Source account to a new account, Click Set Trust, and try to buy Token. It will fail if AuthRequiredFlag set unless you allow trust.</div>
    <v-btn small @click="allowTrust(true)">Enable Trust</v-btn>
    <v-btn small @click="allowTrust(false)">Disable Trust</v-btn>

    <div>Set Source account, trust asset, try to buy.</div>
    <v-btn small @click="changeTrust()">Trust Asset</v-btn>
    <v-btn small @click="buyToken()">Buy Token</v-btn>
  </div>

  <div class='balances'>
    <h3>Accounts - Click for info</h3>
    <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />
  </div>
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
const StellarSdk = require('stellar-sdk')
import Helper from '../js/helper.js'
import StellarAccounts from '../js/StellarAccounts.js'

export default {
  mixins: [StellarCommonMixin],
  components: {
    'account-list': AccountList
  },
  data() {
    return {
      selectedSource: null
    }
  },
  mounted() {
    this.su.updateBalances()
  },
  methods: {
    sourceValid() {
      const result = this.selectedSource ? this.selectedSource.publicKey : null

      if (Helper.strlen(result) > 0) {
        return true
      }
      return false
    },
    allowTrust(authorize) {
      if (this.sourceValid()) {
        const issuerAcct = StellarAccounts.accountWithName('Issuer')
        if (issuerAcct) {
          this.su.allowTrust(issuerAcct.secret, this.selectedSource.publicKey, StellarAccounts.lamboTokenAsset(), authorize)
            .then((response) => {
              this.debugLog(response, 'Success')
            })
            .catch((error) => {
              this.debugLog(error, 'Error')
            })
        } else {
          this.debugLog('Error: no issuer account')
        }
      } else {
        this.debugLog('Error: no source account selected')
      }
    },
    changeTrust() {
      if (this.sourceValid()) {
        this.su.changeTrust(this.selectedSource.secret, StellarAccounts.lamboTokenAsset(), '10000')
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
    buyToken() {
      this.debugLog('Buying tokens...')

      if (this.sourceValid()) {
        this.su.buyTokens(this.selectedSource.secret, this.su.lumins(), StellarAccounts.lamboTokenAsset(), '1000', '2.22')
          .then((response) => {
            this.debugLog(response)

            this.su.updateBalances()
          })
          .catch((error) => {
            this.debugLog(error)
          })
      } else {
        this.debugLog('Error: no source account selected')
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

.balances {
    padding: 10px;
    background: steelblue;
    box-shadow: 0 7px 12px -7px rgba(0,0,0,.7);
    color: white;
    text-align: center;
}
</style>
