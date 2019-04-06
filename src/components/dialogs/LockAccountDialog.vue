<template>
  <v-dialog lazy v-model="visible" scrollable @keydown.esc="visible = false" max-width="600">
    <div class="main-container">
      <dialog-titlebar :title="title" v-on:close="visible = false"/>

      <div class="help-contents">
        <div class="help-email">
          <dialog-accounts
            ref="dialogAccounts"
            v-on:enter-key-down="lockAccount"
            :model="model"
            v-on:toast="displayToast"
            :showSource="true"
            :showFunding="true"
          />

          <div
            class="status-message"
          >By default the account is locked to still allow low threshold operations like Allow Trust. This is normally what you would want for an issuer account if require trust is set. Check 'Lock Completely' if you don't need low threshold operations</div>
          <v-checkbox label="Lock Completely" v-model="lockCompletely"></v-checkbox>

          <div class="status-message">
            Any tokens or currency on this account will be locked forever. This feature is great to ensure no more tokens can ever be created in the case of an issuer.
            Make sure everything on this account is set, for example the home domain. Be ABSOLUTELY CERTAIN you know what your are doing. This is NOT REVERSABLE EVER."
          </div>

          <v-checkbox label="I understand" v-model="confirmed"></v-checkbox>
        </div>

        <div class="button-holder">
          <v-tooltip open-delay="200" bottom>
            <v-btn
              round
              small
              :disabled="!confirmed"
              color="primary"
              slot="activator"
              @click="lockAccount"
              :loading="loading"
            >Lock Account</v-btn>
            <span>Lock account so it can never be accessed by anyone</span>
          </v-tooltip>
        </div>

        <toast-component
          :absolute="true"
          location="manage-offer-dialog"
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
      title: 'Lock Account',
      confirmed: false,
      loading: false,
      lockCompletely: false
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
    lockAccount() {
      if (!this.confirmed) {
        this.displayToast('You must click "I understand" to continue', true)
      } else {
        const sourceWallet = this.dialogAccounts().sourceWallet()
        this.loading = true

        if (sourceWallet) {
          Helper.debugLog('Locking account...')

          StellarUtils.lockAccount(
            sourceWallet,
            this.lockCompletely ? 'lock' : 'low'
          )
            .then(result => {
              Helper.debugLog('locked!')
              Helper.debugLog(result)
              this.displayTrust('Account is now locked')
              StellarUtils.updateBalances()

              return null
            })
            .catch(error => {
              this.displayTrust('Lock failed', true)
              Helper.debugLog(error)
            })
            .finally(() => {
              this.loading = false
            })
        }
      }
    },
    displayToast(message, error = false) {
      Helper.toast(message, error, 'manage-offer-dialog')
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

    .help-email {
      margin: 0 30px;
    }

    .status-message {
      font-size: 0.8em;
    }
  }
}
</style>
