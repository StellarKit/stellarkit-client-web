<template>
<div>
  <div>
    <v-checkbox hide-details label='Use Ledger Nano for source account' v-model="useLedger"></v-checkbox>
  </div>
  <div v-if='!useLedgerSrc' class='address-box'>
    <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source account" autocomplete return-object max-height="600"></v-select>
  </div>
  <div>
    <v-checkbox hide-details label='Use Ledger Nano for destination account' v-model="useLedger"></v-checkbox>
  </div>
  <div v-if='!useLedgerDest' class='address-box'>
    <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedDest" clearable label="Destination account" autocomplete return-object max-height="600"></v-select>
  </div>
</div>
</template>

<script>
import Helper from '../js/helper.js'
import StellarCommonMixin from '../StellarCommonMixin.js'
import {
  StellarWallet,
  LedgerAPI
} from 'stellar-js-utils'

export default {
  data() {
    return {
      useLedgerSrc: true,
      useLedgerDest: false,
      selectedSource: null,
      selectedDest: null
    }
  },
  watch: {
    useLedgerSrc: function() {
      if (this.useLedgerSrc) {
        this.useLedgerDest = false
      }
    },
    useLedgerDest: function() {
      if (this.useLedgerDest) {
        this.useLedgerSrc = false
      }
    }
  },
  methods: {
    sourceWallet() {
      let result = null

      if (this.useLedger) {
        result = StellarWallet.ledger(new LedgerAPI(), () => {
          this.displayToast('Confirm on your Ledger Nano')
        })
      } else {
        if (this.sourceValid()) {
          result = StellarWallet.secret(this.selectedSource.secret)
        }
      }

      return result
    },
    sourceValid() {
      const result = this.selectedSource ? this.selectedSource.publicKey : null

      if (Helper.strOK(result)) {
        return true
      }

      this.displayToast('Please select a source account', true)
      Helper.debugLog('Please select a source account', 'Error')

      return false
    },
    destWallet() {
      let result = null

      if (this.useLedger) {
        result = StellarWallet.ledger(new LedgerAPI(), () => {
          this.displayToast('Confirm on your Ledger Nano')
        })
      } else {
        if (this.sourceValid()) {
          result = StellarWallet.secret(this.selectedDest.secret)
        }
      }

      return result
    },
    destValid() {
      const result = this.selectedDest ? this.selectedDest.publicKey : null

      if (Helper.strOK(result)) {
        return true
      }

      this.displayToast('Please select a destination account', true)
      Helper.debugLog('Please select a destination account', 'Error')

      return false
    },
    toastDialogID() {
      // Must override
      Helper.debugLog('Must override toastDialogID', 'Error')

      return null
    },
    displayToast(message, error = false) {
      Helper.toast(message, error, 'trust-token-dialog')
    }
  }
}
</script>
