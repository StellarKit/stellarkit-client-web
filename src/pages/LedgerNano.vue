<template>
<div>
  <div class='top-controls'>
    <div class='instructions'>
      <div class='title-instructions'>
        <strong>Fun with Ledger Nano (under construction)</strong>
      </div>
    </div>

    <v-btn small @click="createAccountWithLockedTokens()">Connect to Ledger</v-btn>

    <div class='address-box'>
      <v-select :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source accout" autocomplete return-object max-height="600"></v-select>
    </div>
    <v-btn small @click="createUnlockTransaction()">Send To Ledger</v-btn>
    <v-btn small @click="submitTransaction()">Send From Ledger</v-btn>
    <v-btn small @click="viewTransaction()">Give Ledger Signing Power</v-btn>
  </div>

  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
import Helper from '../js/helper.js'
// import StellarAccounts from '../js/StellarAccounts.js'
// import StellarUtils from '../js/StellarUtils.js'
// const StellarSdk = require('stellar-sdk')
// import {
//   StellarWallet
// } from 'stellar-js-utils'

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
  methods: {
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

.instructions {
    .title-instructions {
        text-align: center;
        font-weight: bold;
        font-size: 1.2em;
    }
    div {
        margin-bottom: 12px;
        line-height: 1;
    }
}
</style>
