<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='simple-header'>
        <div> {{header}} </div>
        <div class='sub-header'> {{subHeader}} </div>
      </div>

      <div class='help-email'>
        <dialog-accounts ref='dialogAccounts' v-on:enter-key-down='doOperation' :model="model" v-on:toast='displayToast' :showSource=showSource :showFunding=showFunding :showSigner=showSigner :showTextValue=true />
      </div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round small color='primary' slot="activator" @click="doOperation()" :loading="loading">{{buttonTitle}}</v-btn>
          <span>{{tooltip}}</span>
        </v-tooltip>
      </div>

      <toast-component :absolute=true location='attribute-dialog' :bottom=false :top=true />
    </div>
  </div>
</v-dialog>
</template>

<script>
import Helper from '../../js/helper.js'
import {
  DialogTitleBar
} from 'stellar-js-utils'
import ReusableStellarViews from '../ReusableStellarViews.vue'
import StellarUtils from '../../js/StellarUtils.js'
import ToastComponent from '../ToastComponent.vue'
const StellarSdk = require('stellar-sdk')

export default {
  props: ['ping', 'operation', 'model'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent,
    'dialog-accounts': ReusableStellarViews
  },
  data() {
    return {
      visible: false,
      title: '',
      tooltip: '',
      buttonTitle: '',
      header: '',
      hint: '',
      subHeader: '',
      loading: false,
      showSource: false,
      showSigner: false,
      showFunding: false
    }
  },
  watch: {
    ping: function() {
      this.visible = true
      this.updateForOperation()

      // autofocus hack
      this.$nextTick(() => {
        if (this.$refs.input) {
          this.$refs.input.focus()
        }
      })
    }
  },
  methods: {
    updateForOperation() {
      switch (this.operation) {
        case 'domain':
          this.showSource = true
          this.showFunding = true
          this.showSigner = true
          this.title = 'Set Home Domain'
          this.tooltip = 'Set the home domain'
          this.buttonTitle = 'Set Domain'
          this.model.textValueLabel = 'Home domain'
          this.model.textValueHint = 'www.example-domain.com'
          this.header = 'Adds a domain name to the source account. Leave blank to remove. Funding account is optional.'
          break
        case 'inflation':
          this.showSource = true
          this.showFunding = true
          this.showSigner = true
          this.title = 'Set Inflation Destination'
          this.tooltip = 'Set the inflation destination'
          this.buttonTitle = 'Set Inflation Destination'
          this.model.textValueLabel = 'Inflation destination'
          this.header = 'Adds the inflation destination to the source account. Funding account is optional.'
          this.subHeader = 'ex: GCCD6AJOYZCUAQLX32ZJF2MKFFAUJ53PVCFQI3RHWKL3V47QYE2BNAUT'
          this.model.textValueHint = 'visit: https://lumenaut.net/'
          break
        case 'federation':
          this.title = 'Lookup Federation Address'
          this.tooltip = 'Lookup Federation Address'
          this.buttonTitle = 'Lookup'
          this.model.textValueLabel = 'Federation address'
          this.header = 'Enter the federation address'
          this.model.textValueHint = 'example*domain.com'
          break
        default:
          console.log('switch case not handled')
          break
      }
    },
    doOperation() {
      switch (this.operation) {
        case 'domain':
          this.setDomain()
          break
        case 'inflation':
          this.setInflationDestination()
          break
        case 'federation':
          this.federationLookup()
          break
        default:
          console.log('switch case not handled')
          break
      }
    },
    dialogAccounts() {
      return this.$refs.dialogAccounts
    },
    setDomain() {
      const sourceWallet = this.dialogAccounts().sourceWallet()
      const fundingWallet = this.dialogAccounts().fundingWallet()
      const textValue = this.dialogAccounts().textValue(true)

      // additional signers optional
      const signerWallet = this.dialogAccounts().signerWallet()
      let additionalSigners = null
      if (signerWallet) {
        additionalSigners = [signerWallet]
      }

      if (sourceWallet && Helper.strOK(textValue)) {
        this.loading = true
        Helper.debugLog('Setting home domain...')

        StellarUtils.setDomain(sourceWallet, textValue, fundingWallet, additionalSigners)
          .then((result) => {
            Helper.debugLog(result)
            this.loading = false
            StellarUtils.updateBalances()
            this.displayToast('Success')
          })
          .catch((error) => {
            Helper.debugLog(error)
            this.displayToast('Failed: see console', true)

            this.loading = false
          })
      }
    },
    setInflationDestination() {
      const sourceWallet = this.dialogAccounts().sourceWallet()
      const fundingWallet = this.dialogAccounts().fundingWallet()
      const textValue = this.dialogAccounts().textValue(true)

      // additional signers optional
      const signerWallet = this.dialogAccounts().signerWallet()
      let additionalSigners = null
      if (signerWallet) {
        additionalSigners = [signerWallet]
      }

      if (sourceWallet && Helper.strOK(textValue)) {
        this.loading = true
        Helper.debugLog('Setting inflation destination...')

        // sending in blank string or null just eats transaction fees and does nothing
        // remove this if statement when fixed in stellar core
        StellarUtils.setInflationDestination(sourceWallet, textValue, fundingWallet, additionalSigners)
          .then((result) => {
            Helper.debugLog(result)
            this.loading = false
            StellarUtils.updateBalances()

            this.displayToast('Success')
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
            this.displayToast('Failed: see console', true)

            this.loading = false
          })
      }
    },
    federationLookup() {
      const textValue = this.dialogAccounts().textValue(true)

      if (!Helper.isFederation(textValue)) {
        let formResponse = ''

        if (textValue.length > 0) {
          formResponse = 'The address "' + textValue + '" appears to be invalid.'
        } else {
          formResponse = 'Enter your federation address in the field above.'
        }

        this.displayToast(formResponse, true)
      } else {
        this.loadingFederation = true

        Helper.debugLog('Talking to federation server: ' + textValue)

        StellarSdk.FederationServer.resolve(textValue)
          .then(federationRecord => {
            this.loadingFederation = false

            Helper.debugLog(federationRecord.account_id)

            this.displayToast('Success')
          })
          .catch(error => {
            this.loadingFederation = false
            this.displayToast('Failed: see console', true)

            Helper.debugLog(error)
          })
      }
    },
    displayToast(message, error = false) {
      Helper.toast(message, error, 'attribute-dialog')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../scss/styles.scss';

.main-container {
    @include standard-dialog-contents();

    .help-contents {
        @include inner-dialog-contents();
        font-weight: normal;

        .simple-header {
            div {
                margin-bottom: 2px;
            }
            margin-bottom: 20px;

            .sub-header {
                font-size: 0.8em;
                padding-left: 10px;
            }
        }

        .help-email {
            margin: 0 30px;
        }
    }
}
</style>
