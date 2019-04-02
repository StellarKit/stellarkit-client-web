<template>
  <div class="comp-box">
    <div>Send tokens to the this address to redeem: {{destKey}}</div>

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
      color="primary"
      @click="redeemCredits"
      :loading="loading"
    >Redeem Carbon Credits</v-btn>
  </div>
</template>

<script>
export default {
  props: ['asset', 'destKey'],
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
      // check if account trusts our token
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
