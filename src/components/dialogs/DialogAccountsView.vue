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

  <div v-if='showAmount' class='account-choice-box'>
    <v-text-field hide-details label="Amount" type='number' v-model.number="amountXLM"></v-text-field>
  </div>

  <div v-if='showSigner' class='account-choice-box'>
    <div>
      <v-checkbox hide-details label='Add Ledger Nano as a signer account' v-model="useLedgerSigning"></v-checkbox>
    </div>
    <div v-if='!useLedgerSigning' class='inset-choice-box'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedSigner" clearable label="Add signer for account" autocomplete return-object max-height="600"></v-select>
    </div>
  </div>

  <div v-if='showAdditionalSigner' class='account-choice-box'>
    <div>
      <v-checkbox hide-details label='Add additional signer' v-model="additionalSigner"></v-checkbox>
    </div>
    <div v-if='additionalSigner' class='inset-choice-box'>
      <div>
        <v-checkbox hide-details label='Use Ledger Nano to signing account' v-model="useLedgerAdditionalSigner"></v-checkbox>
      </div>
      <div v-if='!useLedgerAdditionalSigner' class='inset-choice-box'>
        <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedAdditionalSigner" clearable label="Additional signing account" autocomplete return-object max-height="600"></v-select>
      </div>
    </div>
  </div>

  <div v-if='showFunding' class='account-choice-box'>
    <div>
      <v-checkbox hide-details label='Use different funding account' v-model="differentFundingAccount"></v-checkbox>
    </div>
    <div v-if='differentFundingAccount' class='inset-choice-box'>
      <div>
        <v-checkbox hide-details label='Use Ledger Nano funding account' v-model="useLedgerFunding"></v-checkbox>
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
  props: ['showSource', 'showDest', 'showFunding', 'showSigner', 'showAdditionalSigner', 'showAmount'],
  mixins: [StellarCommonMixin],
  data() {
    return {
      useLedgerSrc: false,
      useLedgerDest: false,
      useLedgerFunding: false,
      useLedgerSigning: false,
      useLedgerAdditionalSigner: false,

      selectedSource: null,
      selectedDest: null,
      selectedFunding: null,
      selectedSigner: null,
      selectedAdditionalSigner: null,

      differentFundingAccount: false,
      additionalSigner: false,
      amountXLM: 2,
      ledgerAPI: null
    }
  },
  watch: {
    useLedgerSrc: function() {
      if (this.useLedgerSrc) {
        this.useLedgerDest = false
        this.useLedgerFunding = false
        this.useLedgerSigning = false
      }
    },
    useLedgerDest: function() {
      if (this.useLedgerDest) {
        this.useLedgerSrc = false
        this.useLedgerFunding = false
        this.useLedgerSigning = false
      }
    },
    useLedgerFunding: function() {
      if (this.useLedgerFunding) {
        this.useLedgerSrc = false
        // this.useLedgerDest = false
        this.useLedgerSigning = false
      }
    },
    useLedgerSigning: function() {
      if (this.useLedgerSigning) {
        this.useLedgerSrc = false
        this.useLedgerFunding = false
        this.useLedgerDest = false
      }
    }
  },
  methods: {
    legerAPI() {
      if (!this.ledgerAPI) {
        this.ledgerAPI = new LedgerAPI()
      }
      return this.ledgerAPI
    },
    sourceWallet() {
      let result = null

      if (this.useLedgerSrc) {
        result = StellarWallet.ledger(this.ledgerAPI(), () => {
          this._displayToast('Confirm on your Ledger Nano')
        })
      } else {
        if (this._sourceValid()) {
          result = StellarWallet.secret(this.selectedSource.secret)
        }
      }

      return result
    },
    destWallet() {
      let result = null

      if (this.useLedgerDest) {
        result = StellarWallet.ledger(this.ledgerAPI(), () => {
          this._displayToast('Confirm on your Ledger Nano')
        })
      } else {
        if (this._destValid()) {
          result = StellarWallet.secret(this.selectedDest.secret)
        }
      }

      return result
    },
    signerWallet() {
      let result = null

      if (this.useLedgerSigning) {
        result = StellarWallet.ledger(this.ledgerAPI(), () => {
          this._displayToast('Confirm on your Ledger Nano')
        })
      } else {
        if (this._signerValid()) {
          result = StellarWallet.secret(this.selectedSigner.secret)
        }
      }

      return result
    },
    additionalSignerWallet() {
      let result = null

      if (this.useLedgerSigning) {
        result = StellarWallet.ledger(this.ledgerAPI(), () => {
          this._displayToast('Confirm on your Ledger Nano')
        })
      } else {
        if (this._additionalSignerValid()) {
          result = StellarWallet.secret(this.selectedAdditionalSigner.secret)
        }
      }

      return result
    },
    fundingWallet() {
      let result = null

      if (this.useLedgerFunding) {
        result = StellarWallet.ledger(this.ledgerAPI(), () => {
          this._displayToast('Confirm on your Ledger Nano')
        })
      } else {
        if (this._fundingValid()) {
          result = StellarWallet.secret(this.selectedFunding.secret)
        }
      }

      return result
    },
    amount() {
      return this.amountXLM
    },
    // ======================================================
    // Private
    // ======================================================
    _destValid() {
      const result = this.selectedDest ? this.selectedDest.publicKey : null

      if (Helper.strOK(result)) {
        return true
      }

      this._displayToast('Please select a destination account', true)
      Helper.debugLog('Please select a destination account', 'Error')

      return false
    },
    _signerValid() {
      const result = this.selectedSigner ? this.selectedSigner.publicKey : null

      if (Helper.strOK(result)) {
        return true
      }

      this._displayToast('Please select a signing account', true)
      Helper.debugLog('Please select a signing account', 'Error')

      return false
    },
    _additionalSignerValid() {
      const result = this.selectedAdditionalSigner ? this.selectedAdditionalSigner.publicKey : null

      if (Helper.strOK(result)) {
        return true
      }

      this._displayToast('Please select an additional signing account', true)
      Helper.debugLog('Please select an additional signing account', 'Error')

      return false
    },
    _sourceValid() {
      const result = this.selectedSource ? this.selectedSource.publicKey : null

      if (Helper.strOK(result)) {
        return true
      }

      this._displayToast('Please select a source account', true)
      Helper.debugLog('Please select a source account', 'Error')

      return false
    },
    _fundingValid() {
      const result = this.selectedFunding ? this.selectedFunding.publicKey : null

      if (Helper.strOK(result)) {
        return true
      }

      this._displayToast('Please select a funding account', true)
      Helper.debugLog('Please select a funding account', 'Error')

      return false
    },
    _displayToast(message, error) {
      this.$emit('toast', message, error)
    }
  }
}
</script>

<style lang='scss' scoped>
.account-choice-box {
    padding: 8px;
    margin-bottom: 8px;
    background: rgba(0,0,0,.05);
    border-radius: 4px;

    .inset-choice-box {
        margin-left: 20px;
    }
}
</style>
