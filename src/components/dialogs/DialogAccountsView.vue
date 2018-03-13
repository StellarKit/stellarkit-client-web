<template>
<div>
  <div v-if='showSource' class='account-choice-box'>
    <div>
      <menu-button v-on:menu-selected='sourceMenuSelected' title='Source account' :items='sourceMenuItems' :selectedID='sourceType' />
    </div>
    <div v-if='sourceType === "account"' class='inset-choice-box'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source account" autocomplete return-object max-height="600"></v-select>
    </div>
  </div>

  <div v-if='showDest' class='account-choice-box'>
    <div>
      <menu-button v-on:menu-selected='destMenuSelected' title='Destination account' :items='destMenuItems' :selectedID='destType' />
    </div>
    <div v-if='destType === "publicKey"' class='inset-choice-box'>
      <v-text-field hide-details label="Destination public key" v-model.trim="destPublicKey" ref='input' @keyup.enter="enterKeyDown"></v-text-field>
    </div>
    <div v-if='destType === "account"' class='inset-choice-box'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedDest" clearable label="Destination account" autocomplete return-object max-height="600"></v-select>
    </div>
  </div>

  <div v-if='showAsset' class='account-choice-box'>
    <div>
      <v-checkbox hide-details label='Send XLM' v-model="sendXLM"></v-checkbox>
    </div>
    <div v-if='!sendXLM' class='inset-choice-box'>
      <v-text-field hide-details label="Asset Code" v-model.trim="assetCode" ref='input' @keyup.enter="enterKeyDown"></v-text-field>
      <v-text-field hide-details label="Asset Issuer" v-model.trim="assetIssuer" ref='input' @keyup.enter="enterKeyDown"></v-text-field>
    </div>
  </div>

  <div v-if='showSecret' class='account-choice-box'>
    <div>
      <menu-button v-on:menu-selected='secretMenuSelected' title='Enter an account key' :items='secretMenuItems' :selectedID='secretType' />
    </div>
    <div v-if='secretType === "secret"' class='inset-choice-box'>
      <v-text-field hide-details spellcheck="false" autofocus label="Secret key" :counter="56" v-model.trim="secretKeyText" @keyup.enter="enterKeyDown" hint="Starts with an 'S'" :append-icon="showSecretText ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (showSecretText = !showSecretText)"
        :type="showSecretText ? 'text' : 'password'"></v-text-field>
    </div>
    <div v-if='secretType === "public"' class='inset-choice-box'>
      <v-text-field hide-details spellcheck="false" autofocus label="Public key" :counter="56" v-model.trim="publicKeyText" @keyup.enter="enterKeyDown" hint="Starts with an 'G'"></v-text-field>
    </div>
  </div>

  <div v-if='showAccountName' class='account-choice-box'>
    <v-text-field hide-details spellcheck="false" label="Account name" v-model.trim="name" @keyup.enter="enterKeyDown" hint="A unique name helps you keep track of multiple accounts"> </v-text-field>
  </div>

  <div v-if='showAmount' class='account-choice-box'>
    <v-text-field hide-details label="Amount" type='number' v-model.number="assetAmount" @keyup.enter="enterKeyDown"></v-text-field>
  </div>

  <div v-if='showSigner' class='account-choice-box'>
    <div>
      <menu-button v-on:menu-selected='signerMenuSelected' title='Add Signer account' :items='signerMenuItems' :selectedID='signerType' />
    </div>
    <div v-if='signerType === "account"' class='inset-choice-box'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedSigner" clearable label="Signing account" autocomplete return-object max-height="600"></v-select>
    </div>
  </div>

  <div v-if='showFunding' class='account-choice-box'>
    <div>
      <menu-button v-on:menu-selected='fundingMenuSelected' title='Funding account' :items='fundingMenuItems' :selectedID='fundingType' />
    </div>
    <div v-if='fundingType === "account"' class='inset-choice-box'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedFunding" clearable label="Funding account" autocomplete return-object max-height="600"></v-select>
    </div>
  </div>

</div>
</template>

<script>
import Helper from '../../js/helper.js'
import StellarCommonMixin from '../StellarCommonMixin.js'
import MenuButton from '../MenuButton.vue'
import {
  StellarWallet,
  LedgerAPI
} from 'stellar-js-utils'
const StellarSdk = require('stellar-sdk')
const generateName = require('sillyname')

export default {
  props: ['showSource', 'showDest', 'showFunding', 'showSigner', 'showAmount', 'showAsset', 'showAccountName', 'showSecret'],
  mixins: [StellarCommonMixin],
  components: {
    'menu-button': MenuButton
  },
  data() {
    return {
      destType: 'publicKey',
      destPublicKey: '',

      sourceType: 'account',
      signerType: 'none',
      fundingType: 'none',
      secretType: 'secret',

      selectedSource: null,
      selectedDest: null,
      selectedFunding: null,
      selectedSigner: null,
      showSecretText: false,

      secretKeyText: '',
      publicKeyText: '',

      assetAmount: 10,
      name: generateName(),
      ledgerAPI: null,

      assetCode: '',
      assetIssuer: '',
      sendXLM: true,
      destMenuItems: [{
          id: 'publicKey',
          title: 'Public key'
        },
        {
          id: 'account',
          title: 'Account'
        },
        {
          id: 'ledger',
          title: 'Ledger Nano'
        }
      ],
      sourceMenuItems: [{
          id: 'account',
          title: 'Account'
        },
        {
          id: 'ledger',
          title: 'Ledger Nano'
        }
      ],
      secretMenuItems: [{
          id: 'secret',
          title: 'Secret key'
        },
        {
          id: 'public',
          title: 'Public key'
        }
      ],
      signerMenuItems: [{
          id: 'none',
          title: 'None'
        }, {
          id: 'account',
          title: 'Account'
        },
        {
          id: 'ledger',
          title: 'Ledger Nano'
        }
      ],
      fundingMenuItems: [{
          id: 'none',
          title: 'None'
        }, {
          id: 'account',
          title: 'Account'
        },
        {
          id: 'ledger',
          title: 'Ledger Nano'
        }
      ]
    }
  },
  methods: {
    // called when the dialog is reshown
    resetState() {
      this.destPublicKey = ''
      this.assetAmount = 10
      this.assetCode = ''
      this.assetIssuer = ''
      this.secretKeyText = ''
      this.publicKeyText = ''
      this.sendXLM = true
      this.name = generateName()
    },
    adjustSetting(id) {
      switch (id) {
        case 'destType':
          if (this.destType === 'ledger') {
            // this.destType = 'publicKey'
            this.sourceType = 'account'
            this.fundingType = 'none'
            this.signerType = 'none'
          }
          break
        case 'sourceType':
          if (this.sourceType === 'ledger') {
            this.destType = 'publicKey'
            // this.sourceType = 'account'
            this.fundingType = 'none'
            this.signerType = 'none'
          }
          break
        case 'fundingType':
          if (this.fundingType === 'ledger') {
            this.destType = 'publicKey'
            this.sourceType = 'account'
            // this.fundingType = 'none'
            this.signerType = 'none'
          }
          break
        case 'signerType':
          if (this.signerType === 'ledger') {
            // this.destType = 'publicKey'
            // this.sourceType = 'account'
            this.fundingType = 'none'
            // this.signerType = 'none'
          }
          break
        default:
          break
      }
    },
    enterKeyDown() {
      this.$emit('enter-key-down')
    },
    destMenuSelected(item) {
      this.destType = item.id
      this.adjustSetting('destType')
    },
    sourceMenuSelected(item) {
      this.sourceType = item.id
      this.adjustSetting('sourceType')
    },
    signerMenuSelected(item) {
      this.signerType = item.id
      this.adjustSetting('signerType')
    },
    secretMenuSelected(item) {
      this.secretType = item.id
    },
    fundingMenuSelected(item) {
      this.fundingType = item.id
      this.adjustSetting('fundingType')
    },
    sharedLegerAPI() {
      if (!this.ledgerAPI) {
        this.ledgerAPI = new LedgerAPI()
      }
      return this.ledgerAPI
    },
    sourceWallet() {
      let result = null

      switch (this.sourceType) {
        case 'ledger':
          result = StellarWallet.ledger(this.sharedLegerAPI(), () => {
            this._displayToast('Confirm on your Ledger Nano')
          })
          break
        case 'account':
          if (this._sourceValid()) {
            result = StellarWallet.secret(this.selectedSource.secret)
          } else if (this._sourceValid(false)) {
            result = StellarWallet.public(this.selectedSource.publicKey)
          }
          break
        default:
          break
      }

      if (!result) {
        this._displayToast('Please select a source account', true)
        Helper.debugLog('Please select a source account', 'Error')
      }

      return result
    },
    destWallet() {
      let result = null

      switch (this.destType) {
        case 'ledger':
          result = StellarWallet.ledger(this.sharedLegerAPI(), () => {
            this._displayToast('Confirm on your Ledger Nano')
          })
          break
        case 'publicKey':
          if (Helper.strOK(this.destPublicKey)) {
            result = StellarWallet.public(this.destPublicKey)
          } else {
            this._displayToast('Please paste in a destination public key', true)
          }
          break
        case 'account':
          if (this._destValid()) {
            result = StellarWallet.secret(this.selectedDest.secret)
          } else if (this._destValid(false)) {
            result = StellarWallet.public(this.selectedDest.publicKey)
          }
          break
        default:
          break
      }

      if (!result) {
        this._displayToast('Please select a destination account', true)
        Helper.debugLog('Please select a destination account', 'Error')
      }

      return result
    },
    signerWallet(required = false) {
      let result = null

      switch (this.signerType) {
        case 'ledger':
          result = StellarWallet.ledger(this.sharedLegerAPI(), () => {
            this._displayToast('Confirm on your Ledger Nano')
          })
          break
        case 'account':
          if (this._signerValid()) {
            result = StellarWallet.secret(this.selectedSigner.secret)
          }
          break
        default:
          break
      }

      if (!result && required) {
        this._displayToast('Please select a signing account', true)
        Helper.debugLog('Please select a signing account', 'Error')
      }

      return result
    },
    fundingWallet(required = false) {
      let result = null

      switch (this.fundingType) {
        case 'ledger':
          result = StellarWallet.ledger(this.sharedLegerAPI(), () => {
            this._displayToast('Confirm on your Ledger Nano')
          })
          break
        case 'account':
          if (this._fundingValid()) {
            result = StellarWallet.secret(this.selectedFunding.secret)
          }
          break
        default:
          break
      }

      if (!result && required) {
        this._displayToast('Please select a funding account', true)
        Helper.debugLog('Please select a funding account', 'Error')
      }

      return result
    },
    amount() {
      return this.assetAmount
    },
    accountName() {
      // ok for account name to be null or ''
      return this.name
    },
    secretKey() {
      if (this.secretType === 'secret') {
        if (Helper.strOK(this.secretKeyText)) {
          return this.secretKeyText
        }

        this._displayToast('Please enter a secret key', true)
        Helper.debugLog('Please enter a secret key', 'Error')
      }

      return ''
    },
    publicKey() {
      if (this.secretType === 'public') {
        if (Helper.strOK(this.publicKeyText)) {
          return this.publicKeyText
        }

        this._displayToast('Please enter a public key', true)
        Helper.debugLog('Please enter a public key', 'Error')
      }

      return ''
    },
    asset() {
      if (this.sendXLM) {
        return null
      }

      if (Helper.strOK(this.assetCode) && Helper.strOK(this.assetIssuer)) {
        return new StellarSdk.Asset(this.assetCode, this.assetIssuer)
      }

      this._displayToast('Please enter an asset code and issuer', true)
      Helper.debugLog('Please enter an asset code and issuer', 'Error')

      return null
    },
    // ======================================================
    // Private
    // ======================================================
    _destValid(validForSigning = true) {
      let key = null

      if (validForSigning) {
        key = this.selectedDest ? this.selectedDest.secret : null
      } else {
        key = this.selectedDest ? this.selectedDest.publicKey : null
      }

      if (Helper.strOK(key)) {
        return true
      }

      return false
    },
    _signerValid() {
      const result = this.selectedSigner ? this.selectedSigner.secret : null

      if (Helper.strOK(result)) {
        return true
      }

      return false
    },
    _sourceValid(validForSigning = true) {
      let key = null

      if (validForSigning) {
        key = this.selectedSource ? this.selectedSource.secret : null
      } else {
        key = this.selectedSource ? this.selectedSource.publicKey : null
      }

      if (Helper.strOK(key)) {
        return true
      }

      return false
    },
    _fundingValid() {
      const result = this.selectedFunding ? this.selectedFunding.secret : null

      if (Helper.strOK(result)) {
        return true
      }

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
    padding: 8px 12px;
    margin-bottom: 8px;
    background: rgba(0,0,0,.05);
    border-radius: 4px;

    .inset-choice-box {}
}
</style>
