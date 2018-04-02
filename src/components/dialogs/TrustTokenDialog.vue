<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>You need to trust an asset before you can accept it.</div>
        <div class='sub-header'>You'll need the assets symbol and issuing account address. This can be found normally at the https://tokens-home-page/.well-known/stellar.toml</div>
      </div>

      <div class='help-email'>
        <dialog-accounts ref='dialogAccounts' v-on:enter-key-down='trustToken' :model="model" v-on:toast='displayToast' :showSource=true :showFunding=true :showAsset=true />

        <v-text-field persistent-hint label='Trust Limit' v-model.number="trustLimit" @keyup.enter="trustToken()" hint="Set Trust Limit to zero to remove the trust line"></v-text-field>
      </div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round color='primary' slot="activator" @click="trustToken()" :loading="loading">Set Trust</v-btn>
          <span>Change's the trust link to the issuer's account</span>
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
      title: 'Trust Token',
      trustLimit: 100000,
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
    trustToken() {
      const asset = this.dialogAccounts().asset()

      if (asset && !asset.isNative()) {
        const sourceWallet = this.dialogAccounts().sourceWallet()
        const fundingWallet = this.dialogAccounts().fundingWallet()

        if (sourceWallet) {
          Helper.debugLog('Setting trust...')
          this.loading = true

          StellarUtils.changeTrust(sourceWallet, fundingWallet, asset, String(this.trustLimit))
            .then((result) => {
              Helper.debugLog(result)
              this.loading = false

              StellarUtils.updateBalances()

              this.displayToast('Success!')
            })
            .catch((error) => {
              Helper.debugLog(error, 'Error')
              this.loading = false
              this.displayToast('Error!', true)
            })
        }
      } else {
        this.displayToast('Choose another asset. XLM doesn\'t need trust', true)
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
