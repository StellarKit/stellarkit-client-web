<template>
<div>
  <div>
    Add your ledger as a signer to an existing account
  </div>
  <div class='address-box'>
    <v-select :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source accout" autocomplete return-object max-height="600"></v-select>
  </div>
  <v-btn round small @click="giveLedgerSigningPower()">Give Ledger Signing Power</v-btn>
</div>
</template>

<script>
import Helper from '../js/helper.js'
// import StellarAccounts from '../js/StellarAccounts.js'
// import StellarUtils from '../js/StellarUtils.js'
// const StellarSdk = require('stellar-sdk')
// import {
//   StellarWallet
// } from 'stellar-js-utils'

export default {
  props: ['accountsUI'],
  data() {
    return {
      selectedSource: null
    }
  },
  methods: {
    giveLedgerSigningPower() {
      // sdf
    },
    sourceValid() {
      const result = this.selectedSource ? this.selectedSource.publicKey : null

      if (Helper.strlen(result) > 0) {
        return true
      }

      Helper.debugLog('please select a source account', 'Error')
      return false
    }
  }
}
</script>

<style scoped lang='scss'>
// ddd
</style>
