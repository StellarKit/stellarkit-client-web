<template>
<div class='main-container'>
  <div>This is only going to work if you have setup a local server with Bifrost, BTC and ETH servers configured. </div>
  <div>See <a href="https://github.com/StellarKit" target="_blank">https://github.com/StellarKit</a> for docker images to test on testnet.</div>
  <v-btn small @click="showDialog">Buy Token</v-btn>

  <buy-token-dialog :ping='showDialogPing' :params='params' :allowHTTP=true />
</div>
</template>

<script>
import Helper from '../js/helper.js'

import {
  BuyTokenDialog
} from 'stellar-js-utils'
import StellarAccounts from '../js/StellarAccounts.js'
import StellarCommonMixin from '../components/StellarCommonMixin.js'

export default {
  mixins: [StellarCommonMixin],
  data() {
    return {
      showDialogPing: false,
      params: null
    }
  },
  components: {
    'buy-token-dialog': BuyTokenDialog
  },
  methods: {
    showDialog() {
      const issuerAcct = StellarAccounts.accountWithName('Issuer')
      if (issuerAcct) {
        this.params = {
          network: 'test',
          horizonURL: 'http://192.168.1.82:8000',
          bifrostURL: 'http://192.168.1.82:8800',
          assetCode: 'LMB',
          price: '1',
          issuingPublicKey: issuerAcct.publicKey,
          preSaleMode: false
        }

        this.showDialogPing = !this.showDialogPing
      } else {
        Helper.debugLog('Create a token first')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.main-container {
    display: flex;
    flex-direction: column;
    align-items:: center;

    button {
        margin: 40px;
    }
}
</style>
