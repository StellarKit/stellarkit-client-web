<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div> {{header}} </div>
        <div class='sub-header'> {{subHeader}} </div>
      </div>

      <div class='help-email'>
        <dialog-accounts ref='dialogAccounts' v-on:toast='displayToast' :showSource=showSource :showDest=showDest />
        <v-text-field :label='inputLabel' v-model.trim="inputText" @keyup.enter="doOperation()" ref='input'></v-text-field>
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
import StellarCommonMixin from '../StellarCommonMixin.js'
import DialogAccountsView from './DialogAccountsView.vue'
import StellarUtils from '../../js/StellarUtils.js'
import ToastComponent from '../ToastComponent.vue'
const StellarSdk = require('stellar-sdk')

export default {
  props: ['ping', 'operation'],
  mixins: [StellarCommonMixin],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent,
    'dialog-accounts': DialogAccountsView
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
      subHeader: '',
      loading: false,
      showSource: false,
      showDest: false
    }
  },
  mounted() {
    switch (this.operation) {
      case 'domain':
        this.showSource = true
        this.title = 'Set Home Domain'
        this.tooltip = 'Set the home domain'
        this.buttonTitle = 'Set Domain'
        this.inputLabel = 'Domain'
        this.header = 'You can set a domain on your account. Choose the account and domain below.'
        break
      case 'inflation':
        this.showSource = true
        this.title = 'Set Inflation Destination'
        this.tooltip = 'Set the inflation destination'
        this.buttonTitle = 'Set Inflation Destination'
        this.inputLabel = 'Inflation Destination'
        this.header = 'Enter the inflation destination'
        this.subHeader = 'ex: GCCD6AJOYZCUAQLX32ZJF2MKFFAUJ53PVCFQI3RHWKL3V47QYE2BNAUT'
        break
      case 'federation':
        this.title = 'Lookup Federation Address'
        this.tooltip = 'Lookup Federation Address'
        this.buttonTitle = 'Lookup'
        this.inputLabel = 'Federation Address'
        this.header = 'Enter the federation address'
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
      if (this.inputText.length === 0) {
        this.displayToast('Domain is blank')
      } else {
        this.loading = true

        Helper.debugLog('Setting home domain...')

        const sourceWallet = this.dialogAccounts().sourceWallet()
        if (sourceWallet) {
          StellarUtils.setDomain(sourceWallet, this.inputText)
            .then((result) => {
              Helper.debugLog(result)
              this.loading = false
              this.displayToast('Success')
            })
            .catch((error) => {
              Helper.debugLog(error)
              this.displayToast('Failed: see console', true)

              this.loading = false
            })
        }
      }
    },
    setInflationDestination() {
      if (this.inputText.length === 0) {
        this.displayToast('Inflation destination is blank', true)
      } else {
        this.loading = true

        Helper.debugLog('Setting inflation destination...')

        StellarUtils.setInflationDestination(this.dialogAccounts().sourceWallet(), this.inputText)
          .then((result) => {
            Helper.debugLog(result)
            this.loading = false
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

        Helper.debugLog('Talking to federation server...')

        StellarSdk.FederationServer.resolve(this.inputText)
          .then(federationRecord => {
            this.loadingFederation = false

            Helper.debugLog(federationRecord.account_id)

            this.displayToast('Success')
          })
          .catch(error => {
            this.loadingFederation = false
            this.displayToast('Failed: see console', true)

            Helper.debugLog(error, 'Error')
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

        .help-text {
            div {
                margin-bottom: 10px;
            }
            margin-bottom: 20px;

            .sub-header {
                font-size: 0.8em;
            }
        }

        .help-email {
            margin: 0 30px;
        }
    }
}
</style>
