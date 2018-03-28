<template>
<div>
  <div v-if='showSource' class='account-choice-box'>
    <div>
      <menu-button v-on:menu-selected='sourceMenuSelected' title='Source account' :items='sourceMenuItems' :selectedID='sourceType' />
    </div>
    <div v-if='sourceType === "account"'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source account" autocomplete return-object max-height="600"></v-select>
    </div>
  </div>

  <div v-if='showDest' class='account-choice-box'>
    <div>
      <menu-button v-on:menu-selected='destMenuSelected' title='Destination account' :items='destMenuItems' :selectedID='destType' />
    </div>
    <div v-if='destType === "publicKey"'>
      <v-text-field hide-details label="Destination public key" v-model.trim="destPublicKey" ref='input' @keyup.enter="enterKeyDown"></v-text-field>
    </div>
    <div v-if='destType === "account"'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedDest" clearable label="Destination account" autocomplete return-object max-height="600"></v-select>
    </div>
    <div v-if='destType === "publicKeyList"'>
      <textarea v-model='destPublicKeyList' placeholder='Paste in a list of public keys separated by returns, spaces or commas.' class='public-key-text'></textarea>
    </div>
  </div>

  <div v-if='showAsset' class='account-choice-box'>
    <div>
      <v-checkbox hide-details label='Send XLM' v-model="sendXLM"></v-checkbox>
    </div>
    <div v-if='!sendXLM'>
      <v-text-field hide-details label="Asset Code" v-model.trim="assetCode" ref='input' @keyup.enter="enterKeyDown"></v-text-field>
      <v-text-field hide-details label="Asset Issuer" v-model.trim="assetIssuer" @keyup.enter="enterKeyDown"></v-text-field>
    </div>
  </div>

  <div v-if='showBuyingAsset' class='account-choice-box'>
    <div>
      <menu-button v-on:menu-selected='buyingMenuSelected' title='Buying asset' :items='assetMenuItems' :selectedID='buyingAssetType' />
    </div>
    <div v-if='buyingAssetType === "custom"' class='asset-pair'>
      <v-text-field hide-details label="Asset code" class='asset-code' @keyup.enter="enterKeyDown" v-model.trim="buyingAssetCode" ref='input'></v-text-field>
      <v-text-field hide-details label="Asset issuer" @keyup.enter="enterKeyDown" v-model.number="buyingAssetIssuer"></v-text-field>
    </div>
  </div>

  <div v-if='showSellingAsset' class='account-choice-box'>
    <div>
      <menu-button v-on:menu-selected='sellingMenuSelected' title='Selling asset' :items='assetMenuItems' :selectedID='sellingAssetType' />
    </div>
    <div v-if='sellingAssetType === "custom"' class='asset-pair'>
      <v-text-field hide-details label="Asset code" class='asset-code' @keyup.enter="enterKeyDown" v-model.number="sellingAssetCode"></v-text-field>
      <v-text-field hide-details label="Asset issuer" @keyup.enter="enterKeyDown" v-model.number="sellingAssetIssuer"></v-text-field>
    </div>
  </div>

  <div v-if='showSecret' class='account-choice-box'>
    <div>
      <menu-button v-on:menu-selected='secretMenuSelected' title='Enter an account key' :items='secretMenuItems' :selectedID='secretType' />
    </div>
    <div v-if='secretType === "secret"'>
      <v-text-field hide-details spellcheck="false" autofocus label="Secret key" :counter="56" v-model.trim="secretKeyText" @keyup.enter="enterKeyDown" hint="Starts with an 'S'" :append-icon="showSecretText ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (showSecretText = !showSecretText)"
        :type="showSecretText ? 'text' : 'password'"></v-text-field>
    </div>
    <div v-if='secretType === "public"'>
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
    <div v-if='signerType === "account"'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedSigner" clearable label="Signing account" autocomplete return-object max-height="600"></v-select>
    </div>
  </div>

  <div v-if='showManageOffer' class='account-choice-box'>
    <v-text-field hide-details label="Sell amount" @keyup.enter="enterKeyDown" type='number' v-model.number="sellingAmount"></v-text-field>

    <div>Price:</div>
    <div class='accounts-small-text'>For example, you want buy 1000 XLM for 1 MyToken.</div>
    <div class='price-pair'>
      <v-text-field hide-details class='buy-price' label="Buy unit" @keyup.enter="enterKeyDown" type='number' v-model.number="buyUnit"></v-text-field>
      <v-text-field hide-details label="Sell unit" @keyup.enter="enterKeyDown" type='number' v-model.number="sellUnit"></v-text-field>
    </div>
  </div>

  <div v-if='showBuyOffer' class='account-choice-box'>
    <div class='price-pair'>
      <v-text-field hide-details class='buy-price' label="Buy amount" @keyup.enter="enterKeyDown" type='number' v-model.number="buyAmount"></v-text-field>
      <v-text-field hide-details label="Send maximum" @keyup.enter="enterKeyDown" type='number' v-model.number="buySendMax"></v-text-field>
    </div>
  </div>

  <div v-if='showFunding' class='account-choice-box'>
    <div>
      <menu-button v-on:menu-selected='fundingMenuSelected' title='Funding account' :items='fundingMenuItems' :selectedID='fundingType' />
    </div>
    <div v-if='fundingType === "account"'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedFunding" clearable label="Funding account" autocomplete return-object max-height="600"></v-select>
    </div>
    <div v-if='fundingType === "none"'>
      <div class='accounts-small-text'>The source accout will pay the fee.</div>
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
  props: ['showSource', 'showDest', 'showFunding', 'showSigner', 'showAmount', 'showAsset', 'showAccountName', 'showSecret', 'showManageOffer', 'showBuyingAsset', 'showSellingAsset', 'showBuyOffer'],
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

      buyingAssetCode: '',
      buyingAssetIssuer: '',
      sellingAssetCode: '',
      sellingAssetIssuer: '',

      // buy  offer fields
      buySendMax: 0,
      buyAmount: 0,

      // manage  offer fields
      sellingAmount: 100,
      buyUnit: 100,
      sellUnit: 1,
      buyingAssetType: 'xlm',
      sellingAssetType: 'custom',

      destPublicKeyList: '',

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
        },
        {
          id: 'publicKeyList',
          title: 'Public key list'
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
      assetMenuItems: [{
          id: 'xlm',
          title: 'XLM'
        },
        {
          id: 'custom',
          title: 'Custom asset'
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
    buyingMenuSelected(item) {
      this.buyingAssetType = item.id
      this.adjustSetting('buyingAssetType')
    },
    sellingMenuSelected(item) {
      this.sellingAssetType = item.id
      this.adjustSetting('sellingAssetType')
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
        case 'publicKeyList':
          {
            // see destPublicKeys(), but we'll just use the first public key to avoid toast or errors
            const keyList = this.parseDestKeys()

            if (keyList.length > 0) {
              const publicKey = keyList[0]

              if (Helper.strOK(publicKey)) {
                result = StellarWallet.public(publicKey)
              }
            }
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
    parseDestKeys() {
      if (Helper.strOK(this.destPublicKeyList)) {
        const result = this.destPublicKeyList.split(/\s*[\s,]\s*/).filter((word) => {
          // filter Boolean removes blank lines - a double comma or ending comma can produce a blank math
          return word.trim().length > 0
        })

        return result
      }

      return []
    },
    destPublicKeys() {
      if (this.destType === 'publicKeyList') {
        if (Helper.strOK(this.destPublicKeyList)) {
          // parse the list
          const result = this.parseDestKeys()

          Helper.debugLog(result)
          return result
        }
      }

      return []
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
    manageOffer() {
      let good = false

      if ((this.sellingAmount > 0) &&
        (this.buyUnit > 0) &&
        (this.sellUnit > 0)) {
        good = true
      }

      if (good && this.buyingAssetType === 'custom') {
        good = false
        if (Helper.strOK(this.buyingAssetCode) &&
          Helper.strOK(this.buyingAssetIssuer)) {
          good = true
        }
      }

      if (good && this.sellingAssetType === 'custom') {
        good = false
        if (Helper.strOK(this.sellingAssetCode) &&
          Helper.strOK(this.sellingAssetIssuer)) {
          good = true
        }
      }

      if (good) {
        return {
          buyingAssetCode: this.buyingAssetCode,
          buyingAssetIssuer: this.buyingAssetIssuer,
          sellingAssetCode: this.sellingAssetCode,
          sellingAssetIssuer: this.sellingAssetIssuer,
          sellingAmount: this.sellingAmount,
          buyUnit: this.buyUnit,
          sellUnit: this.sellUnit,
          buyXLM: this.buyingAssetType === 'xlm',
          sellXLM: this.sellingAssetType === 'xlm'
        }
      }

      this._displayToast('Please fill in all the fields', true)
      Helper.debugLog('Please fill in all the fields', 'Error')

      return null
    },
    buyOffer() {
      let good = false

      if ((this.buySendMax > 0) &&
        (this.buyAmount > 0)) {
        good = true
      }

      if (good && this.buyingAssetType === 'custom') {
        good = false
        if (Helper.strOK(this.buyingAssetCode) &&
          Helper.strOK(this.buyingAssetIssuer)) {
          good = true
        }
      }

      if (good && this.sellingAssetType === 'custom') {
        good = false
        if (Helper.strOK(this.sellingAssetCode) &&
          Helper.strOK(this.sellingAssetIssuer)) {
          good = true
        }
      }

      if (good) {
        return {
          buyingAssetCode: this.buyingAssetCode,
          buyingAssetIssuer: this.buyingAssetIssuer,
          sellingAssetCode: this.sellingAssetCode,
          sellingAssetIssuer: this.sellingAssetIssuer,
          buySendMax: this.buySendMax,
          buyAmount: this.buyAmount,
          buyXLM: this.buyingAssetType === 'xlm',
          sellXLM: this.sellingAssetType === 'xlm'
        }
      }

      this._displayToast('Please fill in all the fields', true)
      Helper.debugLog('Please fill in all the fields', 'Error')

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

    .accounts-small-text {
        font-size: 0.85em;
        color: rgba(0,0,0,.5);
    }

    .price-pair {
        display: flex;

        .buy-price {
            margin-right: 8px;
        }
    }

    .asset-pair {
        display: flex;

        .asset-code {
            flex: 0 0 100px;
            margin-right: 8px;
        }
    }

    .public-key-text {
        width: 100%;
        height: 150px;
        background: white;
    }
}
</style>
