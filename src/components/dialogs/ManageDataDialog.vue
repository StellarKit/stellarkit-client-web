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
        <div>
          <v-checkbox hide-details label='Use Ledger Nano for source account' v-model="useLedger"></v-checkbox>
        </div>
        <div v-if='!useLedger' class='address-box'>
          <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source account" autocomplete return-object max-height="600"></v-select>
        </div>

        <v-text-field hide-details label='Name' v-model.trim="name" @keyup.enter="addData()" ref='input'></v-text-field>
        <v-text-field hide-details label='Value' v-model.trim="value" @keyup.enter="addData()"></v-text-field>
      </div>
      <div class='status-message'>{{statusMessage}}</div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round color='primary' slot="activator" @click="addData()" :loading="loading">Add Data</v-btn>
          <span>{{tooltip}}</span>
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
  DialogTitleBar,
  StellarWallet,
  LedgerAPI
} from 'stellar-js-utils'
import StellarCommonMixin from '../StellarCommonMixin.js'
import StellarUtils from '../../js/StellarUtils.js'
import ToastComponent from '../ToastComponent.vue'
// const StellarSdk = require('stellar-sdk')

export default {
  props: ['ping'],
  mixins: [StellarCommonMixin],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent
  },
  data() {
    return {
      visible: false,
      title: 'Edit Account Data',
      selectedSource: null,
      statusMessage: '',
      name: '',
      value: '',
      tooltip: '',
      useLedger: true,
      loading: false
    }
  },
  watch: {
    ping: function() {
      this.visible = true
      this.domain = ''
      this.statusMessage = ''
      this.useLedger = true

      // autofocus hack
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  },
  methods: {
    addData() {
      // value can be empty to erase both key and value
      if (Helper.strOK(this.name)) {
        let sourceWallet = null

        if (this.useLedger) {
          sourceWallet = StellarWallet.ledger(new LedgerAPI(), () => {
            this.displayToast(this.statusMessage)
          })
        } else {
          sourceWallet = this.sourceWallet()
        }

        if (sourceWallet) {
          this.statusMessage = 'Setting key value data...'
          this.loading = true

          StellarUtils.manageData(sourceWallet, null, this.name, this.value)
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
      } else {
        this.statusMessage = 'Type in a key first'
      }
    },
    sourceWallet() {
      if (this.sourceValid()) {
        return StellarWallet.secret(this.selectedSource.secret)
      }
      return null
    },
    sourceValid() {
      const result = this.selectedSource ? this.selectedSource.publicKey : null

      if (Helper.strlen(result) > 0) {
        return true
      }

      Helper.debugLog('please select a source account', 'Error')
      return false
    },
    displayErrorMessage(message) {
      Helper.toast(message, true, 'data-dialog')
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

        .status-message {
            font-size: 0.8em;
        }
    }
}
</style>
