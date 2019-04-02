<template>
  <div class="comp-box">
    <div>Enter your email address and public key to your Stellar wallet. We will send the tokens to the wallet. Your wallet must trust our asset, or this will fail.</div>

    <v-text-field
      style="width: 100%;"
      label="Email"
      placeholder="email@example.com"
      v-model.trim="email"
      @keyup.enter="requestTokens()"
    ></v-text-field>
    <v-text-field
      style="width: 100%;"
      label="Public Key"
      placeholder="Example: GCSDLFIJSE9JSFELFJSLDFJSLDFJSLDKFJSLDFJLS"
      v-model.trim="publicKey"
      @keyup.enter="requestTokens()"
    ></v-text-field>

    <v-btn
      round
      small
      color="primary"
      @click="sendAssetsDialogPing = !sendAssetsDialogPing"
      :loading="loading"
    >Request Tokens</v-btn>
  </div>
</template>

<script>
export default {
  props: ['asset'],
  data() {
    return {
      loading: false,
      email: '',
      publicKey: ''
    }
  },
  methods: {
    requestTokens() {
      // dd
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
