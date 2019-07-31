<template>
  <v-dialog v-model="visible" scrollable @keydown.esc="visible = false" max-width="600">
    <div class="main-container">
      <dialog-titlebar :title="title" v-on:close="visible = false" />

      <div class="help-contents">
        <textarea v-model="editableTransaction"></textarea>
        <div>{{statusMessage}}</div>

        <div class="button-holder">
          <v-btn
            rounded
            small
            color="primary"
            v-on="on"
            @click="submitTransaction()"
            :loading="loadingTransaction"
          >Submit</v-btn>
        </div>
        <toast-component
          :absolute="true"
          location="transaction-dialog"
          :bottom="false"
          :top="true"
        />
      </div>
    </div>
  </v-dialog>
</template>

<script>
import Helper from '../../js/helper.js'
import { DialogTitleBar } from 'stellarkit-js-ui'
import StellarCommonMixin from '../StellarCommonMixin.js'
import StellarUtils from '../../js/StellarUtils.js'
const StellarSdk = require('stellar-sdk')
import ToastComponent from '../ToastComponent.vue'

export default {
  props: ['ping', 'transaction'],
  mixins: [StellarCommonMixin],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent
  },
  watch: {
    transaction() {
      this.editableTransaction = this.transaction
    },
    ping() {
      this.visible = true
      this.statusMessage = ''
    }
  },
  data() {
    return {
      visible: false,
      title: 'Submit Transaction',
      loadingTransaction: false,
      statusMessage: '',
      editableTransaction: ''
    }
  },
  methods: {
    submitTransaction() {
      if (Helper.strlen(this.editableTransaction) > 0) {
        const envelope = StellarSdk.xdr.TransactionEnvelope.fromXDR(
          this.editableTransaction,
          'base64'
        )
        const transaction = new StellarSdk.Transaction(envelope)

        this.loadingTransaction = true
        this.statusMessage = '' // clear any previous warning

        StellarUtils.submitTransaction(transaction)
          .then(response => {
            Helper.debugLog(response)

            Helper.toast('Success', false, 'transaction-dialog')
            this.loadingTransaction = false
            this.statusMessage = 'Success'

            return null
          })
          .catch(error => {
            Helper.debugLog(error)

            if (
              error.data &&
              error.data.extras &&
              error.data.extras.result_codes
            ) {
              this.statusMessage =
                'Error: ' + error.data.extras.result_codes.transaction
            } else {
              this.statusMessage = 'Error: unknown'
            }

            Helper.toast('Failed: see console', true, 'transaction-dialog')
            this.loadingTransaction = false
          })
      }
    },
    displayErrorMessage(message) {
      Helper.toast(message, true, 'transaction-dialog')
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

    textarea {
      width: 100%;
      height: 200px;
      resize: none;
      outline: none;
      font-size: 0.8em;
      font-family: monospace;
      background: rgb(0, 20, 0);
      overflow: auto;
      color: rgb(0, 256, 150);
      padding: 10px;
    }
  }
}
</style>
