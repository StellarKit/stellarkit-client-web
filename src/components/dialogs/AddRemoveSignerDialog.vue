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
        <dialog-accounts ref='dialogAccounts' v-on:enter-key-down='addSigner' :model="model" v-on:toast='displayToast' :showSource=true :showSigner=true />
      </div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round slot="activator" @click="addSigner(true)" :loading="removing">Remove Signer</v-btn>
          <span>Remove a signer from account</span>
        </v-tooltip>
        <v-tooltip open-delay='200' bottom>
          <v-btn round color='primary' slot="activator" @click="addSigner()" :loading="adding">Add Signer</v-btn>
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
  DialogTitleBar
} from 'stellar-js-utils'
import StellarUtils from '../../js/StellarUtils.js'
import ToastComponent from '../ToastComponent.vue'
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
      title: 'Add/Remove Signer',
      removing: false,
      adding: false
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
    addSigner(removeSigner = false) {
      const sourceWallet = this.dialogAccounts().sourceWallet()
      const signerWallet = this.dialogAccounts().signerWallet()
      if (sourceWallet && signerWallet) {
        Helper.debugLog(removeSigner ? 'Removing signer...' : 'Adding signer...')

        if (removeSigner) {
          this.removing = true

          StellarUtils.removeMultiSig(sourceWallet, signerWallet)
            .then((result) => {
              Helper.debugLog(result)
              this.removing = false

              this.displayToast('Success!')
              return null
            })
            .catch((error) => {
              Helper.debugLog(error, 'Error')
              this.removing = false
              this.displayToast('Error!', true)
            })
        } else {
          this.adding = true

          StellarUtils.makeMultiSig(sourceWallet, signerWallet)
            .then((result) => {
              Helper.debugLog(result)
              this.adding = false

              this.displayToast('Success!')
              return null
            })
            .catch((error) => {
              Helper.debugLog(error, 'Error')
              this.adding = false
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
