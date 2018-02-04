<template>
<div v-if='valid' class='xlm-balance'>
  <div><span class="dim-title">XLM</span> {{xlm}}</div>
  <div> <span class="dim-title">LMB</span> {{lmb}}</div>
</div>
</template>

<script>
import StellarUtils from '../js/StellarUtils.js'
import Helper from '../js/helper.js'

export default {
  props: ['publicKey'],
  data() {
    return {
      valid: false,
      xlm: 0,
      lmb: 0,
      su: null
    }
  },
  mounted() {
    this.su = new StellarUtils()

    // this.fetch()
    // setInterval(() => {
    //   this.fetch()
    // }, 10 * 1000)
  },
  methods: {
    fetch() {
      if (Helper.strlen(this.publicKey) > 0) {
        this.su.balances(this.publicKey)
          .then((response) => {
            this.xlm = response['XLM']
            this.lmb = response['LMB']
            this.valid = true
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.xlm-balance {
    background: rgb(100,100,100);
    color: white;
    padding: 6px;

    div {
        margin: 0 8px;
        font-weight: bold;

        span.dim-title {
            color: rgba(white,.6);
        }
    }
}
</style>
