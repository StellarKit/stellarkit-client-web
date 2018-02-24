<template>
<div v-if='valid' class='ticker-box'>
  <div><span class="dim-title">XLM</span> ${{price}}</div>
  <div :class="[ goingUp ? 'percent-up' : 'percent-down' ]">{{percentChange}}%</div>
  <div>${{volume}} <span class="dim-title">24h</span></div>
</div>
</template>

<script>
const axios = require('axios')

export default {
  data() {
    return {
      valid: false,
      goingUp: false,
      price: '',
      percentChange: '',
      volume: ''
    }
  },
  mounted() {
    this.fetch()
    setInterval(() => {
      this.fetch()
    }, 10000)
  },
  methods: {
    fetch() {
      const url = 'https://api.coinmarketcap.com/v1/ticker/stellar/'
      axios.get(url)
        .then((result) => {
          const item = result.data[0]
          this.price = parseFloat(item.price_usd).toFixed(4)

          const percentage = parseFloat(item.percent_change_24h)
          this.goingUp = true
          if (percentage < 0) {
            this.goingUp = false
          }
          this.percentChange = percentage

          const vol = Number(parseInt(item['24h_volume_usd']))
          this.volume = vol.toLocaleString()

          this.valid = true

          return null
        })
        .catch((error) => {
          console.log(JSON.stringify(error))
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.ticker-box {
    position: absolute;
    z-index: 1;
    top: 20px;
    left: 0;
    right: 0;
    justify-content: center;
    flex-direction: row;
    display: flex;
    flex: 0 0 auto;
    text-align: center;
    color: rgba(255,255,255,.8);
    padding-top: 4px;
    font-size: 1em;
    user-select: none;
    pointer-events: none;

    div {
        margin: 0 8px;
        font-weight: bold;

        &.percent-up {
            color: rgb(100,255,100);
        }
        &.percent-down {
            color: red;
        }

        span.dim-title {
            color: rgba(255,255,255,.4);
        }
    }
}
</style>
