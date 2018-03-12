<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='help-contents'>
      <div class='help-text'>
        <div>Merging an account destroys the source account.</div>
        <div class='sub-header'>
          Great if you have some XLM in another account and you want to extract the balance into another account. If the source has any other assets, the destination must first trust that asset.</div>
      </div>

      <div class='help-email'>
        <dialog-accounts ref='dialogAccounts' v-on:toast='displayToast' :showSource=true :showDest=true />
      </div>
      <div class='button-holder'>
        <v-tooltip open-delay='200' bottom>
          <v-btn round color='primary' slot="activator" @click="mergeAccounts()" :loading="loading">Merge into Destination</v-btn>
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
      title: 'Merge Source into Destination',
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
    mergeAccounts() {
      const sourceWallet = this.dialogAccounts().sourceWallet()
      const destWallet = this.dialogAccounts().destWallet()

      if (sourceWallet && destWallet) {
        Helper.debugLog('Merging...')
        this.loading = true

        StellarUtils.mergeAccount(sourceWallet, destWallet)
          .then((response) => {
            Helper.debugLog(response)
            this.loading = false

            StellarUtils.updateBalances()

            this.displayToast('Success!')
            return null
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
            this.loading = false
            this.displayToast('Error!', true)
          })
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
