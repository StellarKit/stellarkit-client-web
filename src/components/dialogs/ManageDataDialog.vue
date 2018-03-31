<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>Add data to your account</div>
        <div class='sub-header'>Data is limited to 64 bytes</div>
      </div>

      <div class='help-email'>
        <dialog-accounts ref='dialogAccounts' v-on:enter-key-down='addData' v-on:toast='displayToast' :showSource=true :showFunding=true :showSigner=true />

        <v-text-field hide-details label='Name' v-model.trim="name" @keyup.enter="addData()" ref='input'></v-text-field>
        <v-text-field hide-details label='Value' v-model.trim="value" @keyup.enter="addData()"></v-text-field>
      </div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round color='primary' slot="activator" @click="addData()" :loading="loading">Add Data</v-btn>
          <span>Add data to an account</span>
        </v-tooltip>
      </div>

      <toast-component :absolute=true location='data-dialog' :bottom=false :top=true />
    </div>
  </div>
</v-dialog>
</template>

<script>
import Helper from '../../js/helper.js'
import {
  DialogTitleBar
} from 'stellar-js-utils'
import StellarUtils from '../../js/StellarUtils.js'
import ToastComponent from '../ToastComponent.vue'
// const StellarSdk = require('stellar-sdk')
import DialogAccountsView from './DialogAccountsView.vue'

export default {
  props: ['ping'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent,
    'dialog-accounts': DialogAccountsView
  },
  data() {
    return {
      visible: false,
      title: 'Edit Account Data',
      name: '',
      value: '',
      loading: false
    }
  },
  watch: {
    ping: function() {
      this.visible = true

      if (this.dialogAccounts()) {
        this.dialogAccounts().resetState()
      }

      // autofocus hack
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  },
  methods: {
    dialogAccounts() {
      return this.$refs.dialogAccounts
    },
    addData() {
      // value can be empty to erase both key and value
      if (Helper.strOK(this.name)) {
        const sourceWallet = this.dialogAccounts().sourceWallet()
        const fundingWallet = this.dialogAccounts().fundingWallet()

        // additional signers optional
        const signerWallet = this.dialogAccounts().signerWallet()
        let additionalSigners = null
        if (signerWallet) {
          additionalSigners = [signerWallet]
        }

        if (sourceWallet) {
          Helper.debugLog('Setting key value data...')
          this.loading = true

          StellarUtils.manageData(sourceWallet, fundingWallet, this.name, this.value, additionalSigners)
            .then((result) => {
              Helper.debugLog(result)
              this.loading = false
              StellarUtils.updateBalances()

              this.displayToast('Success!')
            })
            .catch((error) => {
              Helper.debugLog(error)
              this.loading = false

              this.displayToast('Error!', true)
            })
        }
      } else {
        this.displayToast('Key is blank!', true)
      }
    },
    displayToast(message, error = false) {
      Helper.toast(message, error, 'data-dialog')
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
            margin: 0 30px 16px;
        }
    }
}
</style>
