<template>
  <div class="comp-box">
    <div>Send tokens to the Burn Carbon account to make them inaccessible forever.</div>

    <v-text-field
      style="width: 100%;"
      label="Secret Key"
      placeholder="Example: SCSDLFIJSE9JSFELFJSLDFJSLDFJSLDKFJSLDFJLS"
      v-model.trim="secretKey"
      @keyup.enter="redeemCredits()"
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
  props: ['asset'],
  data() {
    return {
      loading: false,
      secretKey: ''
    }
  },
  methods: {
    redeemCredits() {
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
