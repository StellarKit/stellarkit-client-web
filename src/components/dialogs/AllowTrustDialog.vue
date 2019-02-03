<template>
<v-dialog
  lazy
  v-model='visible'
  scrollable
  @keydown.esc="visible = false"
  max-width="600"
>
  <div class='main-container'>
    <dialog-titlebar
      :title=title
      v-on:close='visible = false'
    />

    <div class='help-contents'>
      <div class='help-text'>
        <div>Enable the destination to hold an asset if auth required is set on the issuer's account.</div>
        <div class='sub-header'>
          Source account is the asset issuer. Destination is the account you would like to enable authorization to hold the issuer's asset.</div>
      </div>

      <div class='help-email'>
        <dialog-accounts
          ref='dialogAccounts'
          v-on:enter-key-down='allowTrust'
          :model="model"
          v-on:toast='displayToast'
          :showSource=true
          :showDest=true
          :showAsset=true
          :showFunding=true
        />
      </div>
      <div class='button-holder'>
        <v-tooltip
          open-delay='200'
          bottom
        >
          <v-btn
            round
            color='secondary'
            slot="activator"
            @click="allowTrust(false)"
            :loading="loadingRevoke"
          >Revoke Trust</v-btn>
          <span>Allow destination to hold the asset</span>
        </v-tooltip>
        <v-tooltip
          open-delay='200'
          bottom
        >
          <v-btn
            round
            color='primary'
            slot="activator"
            @click="allowTrust(true)"
            :loading="loadingTrust"
          >Allow Trust</v-btn>
          <span>Allow destination to hold the asset</span>
        </v-tooltip>
      </div>

      <toast-component
        :absolute=true
        location='trust-token-dialog'
        :bottom=false
        :top=true
      />
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
      title: 'Allow Trust',
      loadingRevoke: false,
      loadingTrust: false
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
    allowTrust(authorize) {
      const sourceWallet = this.dialogAccounts().sourceWallet()
      const destWallet = this.dialogAccounts().destWallet()
      const fundingWallet = this.dialogAccounts().fundingWallet()
      const asset = this.dialogAccounts().asset()

      if (sourceWallet && destWallet && asset) {
        if (authorize) {
          Helper.debugLog('Authorizing trust...')
          this.loadingTrust = true
        } else {
          Helper.debugLog('Revoking trust...')
          this.loadingRevoke = true
        }

        StellarUtils.allowTrust(sourceWallet, destWallet, asset, authorize, fundingWallet)
          .then((response) => {
            Helper.debugLog(response)

            this.displayToast('Success!')
            return null
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
            this.displayToast('Error!', true)
          })
          .finally(() => {
            this.loadingTrust = false
            this.loadingRevoke = false
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
