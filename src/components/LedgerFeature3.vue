<template>
<div>
  <div>
    Merge an account into your Ledger account deleting the source account. If you made an account and then changed your mind, just merge it back in. Any balance on the source account will be added to your Ledgers account.
  </div>
  <div>
    This is reversible if you just send XLM to that account that is now empty
  </div>
  <div class='address-box'>
    <v-select :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source accout" autocomplete return-object max-height="600"></v-select>
  </div>
  <v-btn round @click="mergeAccountIntoLedger()">Merge Account into Ledger</v-btn>
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
    sourceValid() {
      const result = this.selectedSource ? this.selectedSource.publicKey : null

      if (Helper.strlen(result) > 0) {
        return true
      }

      Helper.debugLog('please select a source account', 'Error')
      return false
    },
    mergeAccountIntoLedger() {
      // dd
    }
  }
}
</script>

<style scoped lang='scss'>
// ddd
</style>
