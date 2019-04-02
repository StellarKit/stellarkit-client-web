<template>
  <div class="comp-box">
    <div>List of payments to the burn address: {{destKey}}</div>
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
      amount: 0
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
