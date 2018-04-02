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
        <dialog-accounts ref='dialogAccounts' v-on:enter-key-down='addData' :model="model" v-on:toast='displayToast' :showSource=true :showNameValue=true :showFunding=true :showSigner=true />
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
import ReusableStellarViews from '../ReusableStellarViews.vue'

export default {
  props: ['ping', 'model'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent,
    'dialog-accounts': ReusableStellarViews
  },
  data() {
    return {
      visible: false,
      title: 'Edit Account Data',
      loading: false
    }
  },
  watch: {
    ping: function() {
      this.visible = true
    }
  },
  methods: {
    dialogAccounts() {
      return this.$refs.dialogAccounts
    },
    addData() {
      const nameValue = this.dialogAccounts().nameValue(true)

      // value can be empty to erase both key and value
      if (Helper.strOK(nameValue.name)) {
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

          StellarUtils.manageData(sourceWallet, fundingWallet, nameValue.name, nameValue.value, additionalSigners)
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
