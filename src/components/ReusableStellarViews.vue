<template>
<div>
  <div v-if='showSource' class='account-choice-box'>
    <div>
      <menu-button v-on:menu-selected='sourceMenuSelected' title='Source account' :items='sourceMenuItems' :selectedID='sourceType' />
    </div>
    <div v-if='sourceType === "account"'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model='model.sourceAccount' clearable label="Source account" autocomplete return-object max-height="600"></v-select>
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
      <v-select hide-details :items="accountsUI" item-text='name' v-model="model.destAccount" clearable label="Destination account" autocomplete return-object max-height="600"></v-select>
    </div>
    <div v-if='destType === "publicKeyList"'>
      <textarea v-model='destPublicKeyList' placeholder='Paste in a list of public keys separated by returns, spaces or commas.' class='public-key-text'></textarea>
      <menu-button v-on:menu-selected='destPaymentsMenuSelected' title='Payments per transaction' :items='destPaymentsMenuItems' :selectedID='destPaymentsType' />
    </div>
  </div>

  <div v-if='showAsset' class='account-choice-box'>
    <asset-popup title='Asset' :model='model.assetModel' />
  </div>

  <div v-if='showBuyingAsset' class='account-choice-box'>
    <asset-popup title='Buying asset' :model='model.buyingAssetModel' />
  </div>

  <div v-if='showSellingAsset' class='account-choice-box'>
    <asset-popup title='Selling asset' :model='model.sellingAssetModel' />
  </div>

  <div v-if='showSecret' class='account-choice-box'>
    <div>
      <menu-button v-on:menu-selected='secretMenuSelected' title='Enter an account key' :items='secretMenuItems' :selectedID='secretType' />
    </div>
    <div v-if='secretType === "secret"'>
      <v-text-field hide-details spellcheck="false" autofocus label="Secret key" :counter="56" v-model.trim="model.secretKey" @keyup.enter="enterKeyDown" hint="Starts with an 'S'" :append-icon="showSecretText ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (showSecretText = !showSecretText)"
        :type="showSecretText ? 'text' : 'password'"></v-text-field>
    </div>
    <div v-if='secretType === "public"'>
      <v-text-field hide-details spellcheck="false" autofocus label="Public key" :counter="56" v-model.trim="model.publicKey" @keyup.enter="enterKeyDown" hint="Starts with an 'G'"></v-text-field>
    </div>
  </div>

  <div v-if='showAccountName' class='account-choice-box'>
    <v-text-field hide-details spellcheck="false" label="Account name" v-model.trim="model.accountName" @keyup.enter="enterKeyDown" hint="A unique name helps you keep track of multiple accounts"> </v-text-field>
  </div>

  <div v-if='showAmount' class='account-choice-box'>
    <v-text-field hide-details label="Amount" type='number' v-model.number="model.assetAmount" @keyup.enter="enterKeyDown"></v-text-field>
  </div>

  <div v-if='showManageOffer' class='account-choice-box'>
    <v-text-field hide-details label="Sell amount" @keyup.enter="enterKeyDown" type='number' v-model.number='model.sellAmount'></v-text-field>

    <div>Price:</div>
    <div class='accounts-small-text'>For example, you want buy 1000 XLM for 1 MyToken.</div>
    <div class='price-pair'>
      <v-text-field hide-details class='buy-price' label="Buy unit" @keyup.enter="enterKeyDown" type='number' v-model.number="buyUnit"></v-text-field>
      <v-text-field hide-details label="Sell unit" @keyup.enter="enterKeyDown" type='number' v-model.number="sellUnit"></v-text-field>
    </div>
  </div>

  <div v-if='showAuthFlags' class='account-choice-box'>
    <div class='price-pair'>
      <v-checkbox hide-details small class='buy-price' label="Auth required" v-model="authRequired"></v-checkbox>
      <v-checkbox hide-details small label="Auth revocable" v-model="authRevocable"></v-checkbox>
    </div>
  </div>

  <div v-if='showBuyOffer' class='account-choice-box'>
    <div class='price-pair'>
      <v-text-field hide-details class='buy-price' label="Buy amount" @keyup.enter="enterKeyDown" type='number' v-model.number="buyAmount"></v-text-field>
      <v-text-field hide-details label="Send maximum" @keyup.enter="enterKeyDown" type='number' v-model.number="buySendMax"></v-text-field>
    </div>
  </div>

  <div v-if='showHomeDomain' class='account-choice-box'>
    <v-text-field hide-details label="Home domain (optional)" @keyup.enter="enterKeyDown" v-model.trim="model.homeDomain" hint='www.example-domain.com'></v-text-field>
  </div>

  <div v-if='showTimeLock' class='account-choice-box'>
    <v-checkbox hide-details small label="Time lock access to this account" v-model="timeLockEnabled"></v-checkbox>

    <div v-if='timeLockEnabled'>
      <v-dialog v-model="timeLockModal" persistent lazy full-width width="290px" :return-value.sync="timeLockDate" ref="dialog">
        <v-text-field hide-details :disabled='!timeLockEnabled' slot="activator" label="Time Lock Expiration Date" v-model="timeLockDate" prepend-icon="event" readonly></v-text-field>
        <v-date-picker v-model="timeLockDate" scrollable actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="timeLockModal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(timeLockDate)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
    </div>
  </div>

  <div v-if='showFunding' class='account-choice-box'>
    <div>
      <menu-button v-on:menu-selected='fundingMenuSelected' title='Funding account' :items='fundingMenuItems' :selectedID='fundingType' />
    </div>
    <div v-if='fundingType === "account"'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="model.fundingAccount" clearable label="Funding account" autocomplete return-object max-height="600"></v-select>
    </div>
    <div v-if='fundingType === "none"'>
      <div class='accounts-small-text'>{{this.model.fundingMessage}}</div>
    </div>
  </div>

  <div v-if='showSigner' class='account-choice-box'>
    <div>
      <menu-button v-on:menu-selected='signerMenuSelected' title='Add Signer account' :items='signerMenuItems' :selectedID='signerType' />
    </div>
    <div v-if='signerType === "account"'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="model.signerAccount" clearable label="Signing account" autocomplete return-object max-height="600"></v-select>
    </div>
  </div>

</div>
</template>

<script>
import Helper from '../js/helper.js'
import StellarCommonMixin from './StellarCommonMixin.js'
import MenuButton from './MenuButton.vue'
import AssetPopup from './AssetPopup.vue'
import {
  StellarWallet,
  LedgerAPI
} from 'stellar-js-utils'
const StellarSdk = require('stellar-sdk')

export default {
  props: ['model', 'showSource', 'showDest', 'showFunding', 'showSigner', 'showAmount', 'showAsset', 'showAccountName', 'showSecret', 'showManageOffer', 'showBuyingAsset', 'showSellingAsset', 'showBuyOffer', 'showHomeDomain', 'showAuthFlags',
    'showTimeLock'
  ],
  mixins: [StellarCommonMixin],
  components: {
    'menu-button': MenuButton,
    'asset-popup': AssetPopup
  },
  data() {
    return {
      destType: 'publicKey',
      destPublicKey: '',

      sourceType: 'account',
      signerType: 'none',
      fundingType: 'none',
      secretType: 'secret',

      showSecretText: false,

      ledgerAPI: null,

      // buy  offer fields
      buySendMax: 0,
      buyAmount: 0,

      // manage  offer fields
      buyUnit: 100,
      sellUnit: 1,

      destPublicKeyList: '',
      destPaymentsType: '10',

      authRequired: false,
      authRevocable: false,

      timeLockEnabled: false,
      timeLockModal: false,
      timeLockDate: null,

      destPaymentsMenuItems: [{
          id: '1',
          title: '1'
        },
        {
          id: '2',
          title: '2'
        },
        {
          id: '3',
          title: '3'
        },
        {
          id: '10',
          title: '10'
        },
        {
          id: '50',
          title: '50'
        }
      ],
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
    destPaymentsMenuSelected(item) {
      this.destPaymentsType = item.id
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
    accountName() {
      if (Helper.strOK(this.model.accountName)) {
        return this.model.accountName
      }

      this._displayToast('Please enter an account name.', true)
      Helper.debugLog('Please enter an account name', 'Error')

      return ''
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
            result = StellarWallet.secret(this.model.sourceAccount.secret)
          } else if (this._sourceValid(false)) {
            result = StellarWallet.public(this.model.sourceAccount.publicKey)
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
            result = StellarWallet.secret(this.model.destAccount.secret)
          } else if (this._destValid(false)) {
            result = StellarWallet.public(this.model.destAccount.publicKey)
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
    destPaymentsBatchSize() {
      return parseInt(this.destPaymentsType)
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
            result = StellarWallet.secret(this.model.signerAccount.secret)
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
            result = StellarWallet.secret(this.model.fundingAccount.secret)
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
    homeDomain() {
      return this.model.homeDomain
    },
    amount() {
      return this.model.assetAmount
    },
    timeLock() {
      if (this.timeLockEnabled) {
        return this.timeLockDate
      }

      return null
    },
    authFlags() {
      let result = 0
      if (this.authRequired) {
        result |= StellarSdk.AuthRequiredFlag
      }
      if (this.authRevocable) {
        result |= StellarSdk.AuthRevocableFlag
      }

      return result
    },
    secretKey() {
      if (this.secretType === 'secret') {
        if (Helper.strOK(this.model.secretKey)) {
          return this.model.secretKey
        }

        this._displayToast('Please enter a secret key', true)
        Helper.debugLog('Please enter a secret key', 'Error')
      }

      return ''
    },
    publicKey() {
      if (this.secretType === 'public') {
        if (Helper.strOK(this.model.publicKey)) {
          return this.model.publicKey
        }

        this._displayToast('Please enter a public key', true)
        Helper.debugLog('Please enter a public key', 'Error')
      }

      return ''
    },
    asset() {
      return this.model.getAsset()
    },
    manageOffer() {
      let good = false

      if ((this.model.sellAmount > 0) &&
        (this.buyUnit > 0) &&
        (this.sellUnit > 0)) {
        good = true
      }

      if (good) {
        return {
          buyingAsset: this.model.getBuyingAsset(),
          sellingAsset: this.model.getSellingAsset(),
          sellingAmount: this.model.sellAmount,
          buyUnit: this.buyUnit,
          sellUnit: this.sellUnit
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

      if (good) {
        return {
          buyingAsset: this.model.getBuyingAsset(),
          sellingAsset: this.model.getSellingAsset(),
          buySendMax: this.buySendMax,
          buyAmount: this.buyAmount
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
        key = this.model.destAccount ? this.model.destAccount.secret : null
      } else {
        key = this.model.destAccount ? this.model.destAccount.publicKey : null
      }

      if (Helper.strOK(key)) {
        return true
      }

      return false
    },
    _signerValid() {
      const result = this.model.signerAccount ? this.model.signerAccount.secret : null

      if (Helper.strOK(result)) {
        return true
      }

      return false
    },
    _sourceValid(validForSigning = true) {
      let key = null

      if (validForSigning) {
        key = this.model.sourceAccount ? this.model.sourceAccount.secret : null
      } else {
        key = this.model.sourceAccount ? this.model.sourceAccount.publicKey : null
      }

      if (Helper.strOK(key)) {
        return true
      }

      return false
    },
    _fundingValid() {
      const result = this.model.fundingAccount ? this.model.fundingAccount.secret : null

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
        height: 120px;
        background: white;
        font-size: 0.8em;
    }
}
</style>
