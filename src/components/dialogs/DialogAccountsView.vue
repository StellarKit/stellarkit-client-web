<template>
<div>
  <div v-if='showSource' class='account-choice-box'>
    <div>
      <v-checkbox hide-details label='Use Ledger Nano for source account' v-model="useLedgerSrc"></v-checkbox>
    </div>
    <div v-if='!useLedgerSrc' class='inset-choice-box'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source account" autocomplete return-object max-height="600"></v-select>
    </div>
  </div>

  <div v-if='showDest' class='account-choice-box'>
    <div>
      <v-checkbox hide-details label='Use Ledger Nano for destination account' v-model="useLedgerDest"></v-checkbox>
    </div>
    <div v-if='!useLedgerDest' class='inset-choice-box'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedDest" clearable label="Destination account" autocomplete return-object max-height="600"></v-select>
    </div>
  </div>

  <div v-if='showFunding' class='account-choice-box'>
    <div>
      <v-checkbox hide-details label='Use different funding account' v-model="differentFundingAccount"></v-checkbox>
    </div>
    <div v-if='differentFundingAccount' class='inset-choice-box'>
      <div>
        <v-checkbox hide-details label='Use Ledger Nano for funding account' v-model="useLedgerFunding"></v-checkbox>
      </div>
      <div v-if='!useLedgerFunding' class='inset-choice-box'>
        <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedFunding" clearable label="Funding account" autocomplete return-object max-height="600"></v-select>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import Helper from '../../js/helper.js'
import StellarCommonMixin from '../StellarCommonMixin.js'
import {
  StellarWallet,
  LedgerAPI
} from 'stellar-js-utils'

export default {
  props: ['showSource', 'showDest', 'showFunding'],
  mixins: [StellarCommonMixin],
  data() {
    return {
      useLedgerSrc: false,
      useLedgerDest: false,
      useLedgerFunding: false,
      selectedSource: null,
      selectedDest: null,
      selectedFunding: null,
      differentFundingAccount: false
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
    displayToast(message, error) {
      this.$emit('toast', message, error)
    }
  }
}
</script>

<style lang='scss' scoped>
.account-choice-box {
    padding: 8px;
    margin-bottom: 8px;
    background: rgba(0,0,0,.06);

    .inset-choice-box {
        margin-left: 20px;
    }
}
</style>
