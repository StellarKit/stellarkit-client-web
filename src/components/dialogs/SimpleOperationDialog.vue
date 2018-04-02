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
        <dialog-accounts ref='dialogAccounts' v-on:enter-key-down='doOperation' v-on:toast='displayToast' :showSource=showSource :showDest=showDest :showFunding=showFunding :showSigner=true />
        <v-text-field :hint='hint' :label='inputLabel' v-model.trim="inputText" @keyup.enter="doOperation()" ref='input'></v-text-field>
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
import ReusableStellarViews from './ReusableStellarViews.vue'
import StellarUtils from '../../js/StellarUtils.js'
import ToastComponent from '../ToastComponent.vue'
const StellarSdk = require('stellar-sdk')

export default {
  props: ['ping', 'operation'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent,
    'dialog-accounts': ReusableStellarViews
  },
  data() {
    return {
      visible: false,
      title: 'Set Home Domain',
      inputText: '',
      tooltip: '',
      buttonTitle: '',
      inputLabel: '',
      header: '',
      hint: '',
      subHeader: '',
      loading: false,
      showSource: false,
      showDest: false,
      showFunding: false
    }
  },
  mounted() {
    switch (this.operation) {
      case 'domain':
        this.showSource = true
        this.showFunding = true
        this.title = 'Set Home Domain'
        this.tooltip = 'Set the home domain'
        this.buttonTitle = 'Set Domain'
        this.inputLabel = 'Domain'
        this.hint = 'www.example-domain.com'
        this.header = 'Adds a domain name to the source account. Leave blank to remove. Funding account is optional.'
        break
      case 'inflation':
        this.showSource = true
        this.showFunding = true
        this.title = 'Set Inflation Destination'
        this.tooltip = 'Set the inflation destination'
        this.buttonTitle = 'Set Inflation Destination'
        this.inputLabel = 'Inflation destination'
        this.header = 'Adds the inflation destination to the source account. Funding account is optional.'
        this.subHeader = 'ex: GCCD6AJOYZCUAQLX32ZJF2MKFFAUJ53PVCFQI3RHWKL3V47QYE2BNAUT'
        this.hint = 'visit: https://lumenaut.net/'
        break
      case 'federation':
        this.title = 'Lookup Federation Address'
        this.tooltip = 'Lookup Federation Address'
        this.buttonTitle = 'Lookup'
        this.inputLabel = 'Federation address'
        this.header = 'Enter the federation address'
        this.hint = 'example*domain.com'
        break
      default:
        console.log('switch case not handled')
        break
    }
  },
  watch: {
    ping: function() {
      this.visible = true
      this.inputText = ''

      if (this.dialogAccounts()) {
        this.dialogAccounts().resetState()
      }

      // autofocus hack
      this.$nextTick(() => {
        if (this.$refs.input) {
          this.$refs.input.focus()
        }
      })
    }
  },
  methods: {
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

      // additional signers optional
      const signerWallet = this.dialogAccounts().signerWallet()
      let additionalSigners = null
      if (signerWallet) {
        additionalSigners = [signerWallet]
      }

      if (sourceWallet) {
        this.loading = true
        Helper.debugLog('Setting home domain...')

        StellarUtils.setDomain(sourceWallet, this.inputText, fundingWallet, additionalSigners)
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

      // additional signers optional
      const signerWallet = this.dialogAccounts().signerWallet()
      let additionalSigners = null
      if (signerWallet) {
        additionalSigners = [signerWallet]
      }

      if (sourceWallet) {
        this.loading = true
        Helper.debugLog('Setting inflation destination...')

        // sending in blank string or null just eats transaction fees and does nothing
        // remove this if statement when fixed in stellar core
        if (Helper.strOK(this.inputText)) {
          StellarUtils.setInflationDestination(sourceWallet, this.inputText, fundingWallet, additionalSigners)
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
      }
    },
    federationLookup() {
      if (!Helper.isFederation(this.inputText)) {
        let formResponse = ''

        if (this.inputText.length > 0) {
          formResponse = 'The address "' + this.inputText + '" appears to be invalid.'
        } else {
          formResponse = 'Enter your federation address in the field above.'
        }

        this.displayToast(formResponse, true)
      } else {
        this.loadingFederation = true

        Helper.debugLog('Talking to federation server: ' + this.inputText)

        StellarSdk.FederationServer.resolve(this.inputText)
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
