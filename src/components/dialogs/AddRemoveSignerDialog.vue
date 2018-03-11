<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>You can create a 'multi-sig' account by adding an additional signer.</div>
        <div class='sub-header'>You'll need the assets symbol and issuing account address. This can be found normally at the https://tokens-home-page/.well-known/stellar.toml</div>
      </div>

      <div class='help-email'>
        <dialog-accounts ref='dialogAccounts' v-on:toast='displayToast' :showSource=true :showSigner=true />
      </div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round slot="activator" @click="addSigner(true)" :loading="loading">Remove Signer</v-btn>
          <span>Remove a signer from account</span>
        </v-tooltip>
        <v-tooltip open-delay='200' bottom>
          <v-btn round color='primary' slot="activator" @click="addSigner()" :loading="loading">Add Signer</v-btn>
          <span>Add a signer to account</span>
        </v-tooltip>
      </div>

      <toast-component :absolute=true location='trust-token-dialog' :bottom=false :top=true />
    </div>
  </div>
</v-dialog>
</template>

<script>
import Helper from '../../js/helper.js'
import {
  DialogTitleBar,
  StellarWallet
} from 'stellar-js-utils'
import StellarUtils from '../../js/StellarUtils.js'
import ToastComponent from '../ToastComponent.vue'
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
      title: 'Add/Remove Signer',
      loading: false
    }
  },
  watch: {
    ping: function() {
      this.visible = true

      // autofocus hack
      this.$nextTick(() => {
        if (this.$refs.input) {
          this.$refs.input.focus()
        }
      })
    }
  },
  methods: {
    dialogAccounts() {
      return this.$refs.dialogAccounts
    },
    addSigner(removeSigner = false) {
      const sourceWallet = this.dialogAccounts().sourceWallet()
      if (sourceWallet) {
        Helper.debugLog(removeSigner ? 'Removing signer...' : 'Adding signer...')
        this.loading = true

        if (removeSigner) {
          StellarUtils.removeMultiSig(sourceWallet, StellarWallet.secret(this.selectedSigner.secret))
            .then((result) => {
              Helper.debugLog(result)
              this.loading = false

              this.displayToast('Success!')
              return null
            })
            .catch((error) => {
              Helper.debugLog(error, 'Error')
              this.loading = false
              this.displayToast('Error!', true)
            })
        } else {
          StellarUtils.makeMultiSig(sourceWallet, this.selectedSigner.publicKey)
            .then((result) => {
              Helper.debugLog(result)
              this.loading = false

              this.displayToast('Success!')
              return null
            })
            .catch((error) => {
              Helper.debugLog(error, 'Error')
              this.loading = false
              this.displayToast('Error!', true)
            })
        }
      }
    },
    displayToast(message, error = false) {
      Helper.toast(message, error, 'trust-token-dialog')
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
