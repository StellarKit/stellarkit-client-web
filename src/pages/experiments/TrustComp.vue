<template>
  <div class="comp-box">
    <div>You must trust the Carbon asset before you can request your tokens. This can be done in your Stellar wallet application, or you can do it here.</div>

    <v-text-field
      style="width: 100%;"
      label="Secret Key"
      placeholder="Example: SCSDLFIJSE9JSFELFJSLDFJSLDFJSLDKFJSLDFJLS"
      v-model.trim="secretKey"
      @keyup.enter="trustAsset()"
    ></v-text-field>

    <v-btn round small color="primary" @click="trustAsset()" :loading="loadingTrust">Trust Asset</v-btn>
  </div>
</template>

<script>
export default {
  props: ['asset'],
  data() {
    return {
      loadingTrust: false,
      secretKey: ''
    }
  },
  methods: {
    trustAsset() {
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
