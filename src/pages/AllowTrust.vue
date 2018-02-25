<template>
<div>
  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />
  <instructions-header>
    <div>Content coming soon...</div>
  </instructions-header>

  <div class='top-controls'>
    <div class='address-box'>
      <v-select :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source accout" autocomplete return-object max-height="600"></v-select>
    </div>

    <div>1. First setup a Token on the previous tab</div>
    <div>2. Set Source account to Issuer, then set or clear flags to test AuthRequiredFlag</div>
    <v-btn round small @click="setAuthRequiredFlag()">Set AuthRequiredFlag</v-btn>
    <v-btn round small @click="setAuthRevocableFlag()">Set AuthRevocableFlag</v-btn>
    <v-btn round small @click="clearFlags()">Clear Flags</v-btn>

    <div>Set Source account to a new account, Click Set Trust, and try to buy Token. It will fail if AuthRequiredFlag set unless you allow trust.</div>
    <v-btn round small @click="allowTrust(true)">Enable Trust For Account</v-btn>
    <v-btn round small @click="allowTrust(false)">Disable Trust For Account</v-btn>

    <div>Set Source account, trust asset, try to buy.</div>
    <v-btn round small @click="changeTrust()">Trust Asset</v-btn>
    <v-btn round small @click="buyToken()">Buy Token</v-btn>
  </div>

</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
const StellarSdk = require('stellar-sdk')
import Helper from '../js/helper.js'
import StellarAccounts from '../js/StellarAccounts.js'
import StellarUtils from '../js/StellarUtils.js'
import {
  StellarWallet
} from 'stellar-js-utils'
import InstructionsHeader from '../components/InstructionsHeader.vue'

export default {
  mixins: [StellarCommonMixin],
  components: {
    'account-list': AccountList,
    'instructions-header': InstructionsHeader
  },
  data() {
    return {
      selectedSource: null
    }
  },
  mounted() {
    StellarUtils.updateBalances()
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
          StellarUtils.allowTrust(StellarWallet.secret(issuerAcct.secret), this.selectedSource.publicKey, StellarAccounts.lamboTokenAsset(), authorize)
            .then((response) => {
              Helper.debugLog(response, 'Success')
            })
            .catch((error) => {
              Helper.debugLog(error, 'Error')
            })
        } else {
          Helper.debugLog('Error: no issuer account')
        }
      } else {
        Helper.debugLog('Error: no source account selected')
      }
    },
    changeTrust() {
      if (this.sourceValid()) {
        StellarUtils.changeTrust(StellarWallet.secret(this.selectedSource.secret), StellarAccounts.lamboTokenAsset(), '10000')
          .then((response) => {
            Helper.debugLog(response, 'Success')
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      } else {
        Helper.debugLog('Error: no source account selected')
      }
    },
    setAuthRequiredFlag() {
      Helper.debugLog('setAuthRequiredFlag...')

      if (this.sourceValid()) {
        StellarUtils.setFlags(StellarWallet.secret(this.selectedSource.secret), StellarSdk.AuthRequiredFlag)
          .then((response) => {
            Helper.debugLog(response, 'Success')
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      } else {
        Helper.debugLog('Error: no source account selected')
      }
    },
    setAuthRevocableFlag() {
      Helper.debugLog('setAuthRevocableFlag...')

      if (this.sourceValid()) {
        StellarUtils.setFlags(StellarWallet.secret(this.selectedSource.secret), StellarSdk.AuthRevocableFlag)
          .then((response) => {
            Helper.debugLog(response, 'Success')
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      } else {
        Helper.debugLog('Error: no source account selected')
      }
    },
    clearFlags() {
      Helper.debugLog('clearing flags...')

      if (this.sourceValid()) {
        StellarUtils.clearFlags(StellarWallet.secret(this.selectedSource.secret), StellarSdk.AuthRequiredFlag | StellarSdk.AuthRevocableFlag)
          .then((response) => {
            Helper.debugLog(response, 'Success')
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      } else {
        Helper.debugLog('Error: no source account selected')
      }
    },
    buyToken() {
      Helper.debugLog('Buying tokens...')

      if (this.sourceValid()) {
        StellarUtils.buyTokens(StellarWallet.secret(this.selectedSource.secret), StellarUtils.lumins(), StellarAccounts.lamboTokenAsset(), '1000', '2.22')
          .then((response) => {
            Helper.debugLog(response)

            StellarUtils.updateBalances()
          })
          .catch((error) => {
            Helper.debugLog(error)
          })
      } else {
        Helper.debugLog('Error: no source account selected')
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.top-controls {
    padding: 10px 20px;
}

.address-box {
    display: flex;
    align-items: center;
    div.input-group {
        margin-right: 16px;
    }
}
</style>
