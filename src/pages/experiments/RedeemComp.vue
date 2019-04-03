<template>
  <div class="comp-box">
    <div>You can use your own wallet to send tokens to the this address to redeem: {{publicKey}}</div>
    <div>Or you can use the form below</div>

    <v-text-field
      style="width: 100%;"
      label="Email"
      placeholder="email@example.com"
      v-model.trim="email"
      @keyup.enter="redeemCredits"
      hint="Email"
    ></v-text-field>

    <v-text-field
      style="width: 100%;"
      label="Amount"
      placeholder="Amount"
      v-model.trim="amount"
      @keyup.enter="redeemCredits"
      hint="Amount"
      type="number"
    ></v-text-field>

    <v-text-field
      style="width: 100%;"
      label="Secret Key"
      placeholder="Starts with an 'S'"
      v-model.trim="secretKey"
      @keyup.enter="redeemCredits"
      :counter="56"
      hint="Starts with an 'S'"
      :append-icon="showSecretText ? 'visibility_off' : 'visibility'"
      @click:append="() => (showSecretText = !showSecretText)"
      :type="showSecretText ? 'text' : 'password'"
    ></v-text-field>

    <v-btn
      round
      small
      :loading="loading"
      color="primary"
      @click="redeemCredits"
    >Redeem Carbon Credits</v-btn>
  </div>
</template>

<script>
import Helper from '../../js/helper.js'
import StellarUtils from '../../js/StellarUtils.js'
import { StellarWallet } from 'stellarkit-js-utils'

export default {
  props: ['asset', 'publicKey'],
  data() {
    return {
      loading: false,
      secretKey: '',
      showSecretText: false,
      amount: 0,
      email: ''
    }
  },
  methods: {
    redeemCredits() {
      if (
        Helper.strOK(this.secretKey) &&
        Helper.strOK(this.email) &&
        Helper.strOK(this.publicKey) &&
        this.amount > 0
      ) {
        const sourceWallet = StellarWallet.secret(this.secretKey)
        const burnWallet = StellarWallet.public(this.publicKey)
        this.loading = true

        StellarUtils.sendAsset(
          sourceWallet,
          null,
          burnWallet,
          String(this.amount),
          this.asset,
          'from: ' + this.email
        )
          .then(response => {
            Helper.debugLog(response, 'Success')

            StellarUtils.updateBalances()
            Helper.toast('Tokens Redeemed')

            return null
          })
          .catch(error => {
            Helper.debugLog(error, 'Error')
          })
          .finally(() => {
            this.loading = false
          })
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
