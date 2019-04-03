<template>
  <div class="comp-box">
    <div>You must trust the Carbon asset before you can request your tokens. This can be done in your Stellar wallet application, or you can do it here.</div>
    <div>Token Information</div>
    <div>Code: {{asset ? asset.getCode() : ""}}</div>
    <div>Issuer: {{asset ? asset.getIssuer() : ""}}</div>

    <v-text-field
      style="width: 100%;"
      label="Secret Key"
      placeholder="Starts with an 'S'"
      v-model.trim="secretKey"
      @keyup.enter="trustAsset"
      :counter="56"
      hint="Starts with an 'S'"
      :append-icon="showSecretText ? 'visibility_off' : 'visibility'"
      @click:append="() => (showSecretText = !showSecretText)"
      :type="showSecretText ? 'text' : 'password'"
    ></v-text-field>

    <v-btn round small color="primary" @click="trustAsset()" :loading="loading">Trust Asset</v-btn>
  </div>
</template>

<script>
import { StellarWallet } from 'stellarkit-js-utils'
import Helper from '../../js/helper.js'
import StellarUtils from '../../js/StellarUtils.js'

export default {
  props: ['asset'],
  data() {
    return {
      loading: false,
      secretKey: '',
      showSecretText: false
    }
  },
  methods: {
    trustAsset() {
      if (Helper.strOK(this.secretKey)) {
        const sourceWallet = StellarWallet.secret(this.secretKey)

        const trustLimit = 0xffffffff

        if (sourceWallet && this.asset && !this.asset.isNative()) {
          Helper.debugLog('Setting trust...')
          this.loading = true

          StellarUtils.changeTrust(
            sourceWallet,
            sourceWallet,
            this.asset,
            String(trustLimit)
          )
            .then(result => {
              Helper.debugLog(result)
              this.loading = false

              Helper.toast('Success!')
            })
            .catch(error => {
              Helper.debugLog(error, 'Error')
              this.loading = false
              Helper.toast('Error!', true)
            })
        } else {
          Helper.toast("Choose another asset. XLM doesn't need trust", true)
        }
      } else {
        Helper.toast('The secret key is invalid', true)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../scss/styles.scss';

.comp-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
