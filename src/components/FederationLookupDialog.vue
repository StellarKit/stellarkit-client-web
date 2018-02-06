<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>
          Enter your federation address.
        </div>
      </div>
      <div class='help-email'>
        <v-text-field label="Federation address" v-model.trim="email" @keyup.native.enter="lookup()" ref='input'></v-text-field>
      </div>
      <div class='status-message'>{{statusMessage}}</div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round color='primary' slot="activator" @click.native="lookup()" :loading="loadingFederation">Look up</v-btn>
          <span>Look up your federation address</span>
        </v-tooltip>
      </div>

      <toast-component :absolute=true location='federation-dialog' :bottom=false :top=true />
    </div>
  </div>
</v-dialog>
</template>

<script>
import Helper from '../js/helper.js'
import {
  DialogTitleBar
} from 'stellar-js-utils'
const StellarSdk = require('stellar-sdk')
import ToastComponent from './ToastComponent.vue'

export default {
  props: ['ping'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent
  },
  data() {
    return {
      visible: false,
      title: 'Federation Lookup',
      statusMessage: '',
      email: '',
      loadingFederation: false
    }
  },
  watch: {
    ping: function () {
      this.visible = true
      this.email = ''
      this.statusMessage = ''

      // autofocus hack
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  },
  methods: {
    lookup() {
      Helper.debugLog('Talking to federation server...')

      if (!Helper.isFederation(this.email)) {
        let formResponse = ''

        if (this.email.length > 0) {
          formResponse = 'The address "' + this.email + '" appears to be invalid.'
        } else {
          formResponse = 'Enter your federation address in the field above.'
        }

        this.displayErrorMessage(formResponse)
      } else {
        this.loadingFederation = true

        Helper.debugLog('Talking to federation server...')
        this.statusMessage = 'Talking to federation server...'

        StellarSdk.FederationServer.resolve(this.email)
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
      Helper.toast(message, true, 'federation-dialog')
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
