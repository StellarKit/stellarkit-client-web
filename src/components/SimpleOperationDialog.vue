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
        <v-text-field :label='inputLabel' v-model.trim="domain" @keyup.native.enter="doOperation()" ref='input'></v-text-field>
      </div>
      <div class='status-message'>{{statusMessage}}</div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round color='primary' slot="activator" @click.native="doOperation()" :loading="loading">{{buttonTitle}}</v-btn>
          <span>{{tooltip}}</span>
        </v-tooltip>
      </div>

      <toast-component :absolute=true location='attribute-dialog' :bottom=false :top=true />
    </div>
  </div>
</v-dialog>
</template>

<script>
import Helper from '../js/helper.js'
import {
  DialogTitleBar,
  StellarWallet
} from 'stellar-js-utils'
import StellarCommonMixin from './StellarCommonMixin.js'
import StellarUtils from '../js/StellarUtils.js'
import ToastComponent from './ToastComponent.vue'
const StellarSdk = require('stellar-sdk')

export default {
  props: ['ping', 'secretKey', 'operation'],
  mixins: [StellarCommonMixin],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent
  },
  data() {
    return {
      visible: false,
      title: 'Set Home Domain',
      statusMessage: '',
      domain: '',
      tooltip: '',
      buttonTitle: '',
      inputLabel: '',
      header: '',
      subHeader: '',
      loading: false
    }
  },
  mounted() {
    switch (this.operation) {
      case 'domain':
        this.title = 'Set Home Domain'
        this.tooltip = 'Set the home domain'
        this.buttonTitle = 'Set Domain'
        this.inputLabel = 'Domain'
        this.header = 'Enter your domain'
        break
      case 'inflation':
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
    ping: function () {
      this.visible = true
      this.domain = ''
      this.statusMessage = ''

      // autofocus hack
      this.$nextTick(() => {
        this.$refs.input.focus()
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
    setDomain() {
      if (this.domain.length === 0) {
        this.statusMessage = 'Domain is blank'
      } else {
        this.loading = true

        this.statusMessage = 'Setting home domain...'

        StellarUtils.setDomain(StellarWallet.secret(this.secretKey), this.domain)
          .then((result) => {
            Helper.debugLog(result)
            this.loading = false
            this.statusMessage = 'Success!'
          })
          .catch((error) => {
            Helper.debugLog(error)
            this.loading = false
            this.statusMessage = 'Error!'
          })
      }
    },
    setInflationDestination() {
      if (this.domain.length === 0) {
        this.statusMessage = 'Inflation destination is blank'
      } else {
        this.loading = true

        this.statusMessage = 'Setting inflation destination...'

        StellarUtils.setInflationDestination(StellarWallet.secret(this.secretKey), this.domain)
          .then((result) => {
            Helper.debugLog(result)
            this.loading = false
            this.statusMessage = 'Success!'
          })
          .catch((error) => {
            Helper.debugLog(error)
            this.loading = false
            this.statusMessage = 'Error!'
          })
      }
    },
    federationLookup() {
      Helper.debugLog('Talking to federation server...')

      if (!Helper.isFederation(this.domain)) {
        let formResponse = ''

        if (this.domain.length > 0) {
          formResponse = 'The address "' + this.domain + '" appears to be invalid.'
        } else {
          formResponse = 'Enter your federation address in the field above.'
        }

        this.displayErrorMessage(formResponse)
      } else {
        this.loadingFederation = true

        Helper.debugLog('Talking to federation server...')
        this.statusMessage = 'Talking to federation server...'

        StellarSdk.FederationServer.resolve(this.domain)
          .then(federationRecord => {
            this.loadingFederation = false

            Helper.debugLog(federationRecord.account_id)
            this.statusMessage = federationRecord.account_id

            Helper.toast('Success', false, 'federation-dialog')
          })
          .catch(error => {
            this.loadingFederation = false
            this.displayErrorMessage('Failed: see console')
            this.statusMessage = 'Failed'

            Helper.debugLog(error)
          })
      }
    },
    displayErrorMessage(message) {
      Helper.toast(message, true, 'attribute-dialog')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../scss/styles.scss';

.main-container {
    @include standard-dialog-contents();

    .help-contents {
        // for the toast absolute
        position: relative;
        overflow: hidden;

        padding: 20px;
        font-size: 1.2em;

        flex: 1 1 auto;

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

        .button-holder {
            display: flex;
            justify-content: flex-end;
        }

        .status-message {
            font-size: 0.8em;
        }
    }
}
</style>
