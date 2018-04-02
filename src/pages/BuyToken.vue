<template>
<div>
  <instructions-header>
    <div>Content coming soon...</div>
  </instructions-header>

  <div class='main-container'>
    <div class='bifrost-notes'>
      <div>This is only going to work if you have setup a local server with Bifrost, BTC and ETH servers configured. </div>
      <div>See <a href="https://github.com/StellarKit" target="_blank">https://github.com/StellarKit</a> for docker images to test on testnet.</div>
    </div>

    <div class='bifrost-params'>
      <v-text-field hide-details label="Price" type='number' v-model.number="price"></v-text-field>
      <v-text-field hide-details label="Asset code" v-model.trim="assetCode"></v-text-field>
      <v-text-field hide-details label="Asset issuer" v-model.trim="assetIssuer"></v-text-field>
      <v-text-field hide-details label="Horizon IP Address" v-model.trim="horizonIP"></v-text-field>
      <v-text-field hide-details label="Bifrost IP Address" v-model.trim="biforstIP"></v-text-field>
      <v-text-field hide-details label="Network" v-model.trim="network"></v-text-field>
    </div>

    <v-btn round small color='primary' @click="showDialog">Buy Token</v-btn>

    <buy-token-dialog :ping='showDialogPing' :params='params' :allowHTTP='allowHTTP' />
  </div>
</div>
</template>

<script>
import Helper from '../js/helper.js'

import {
  BuyTokenDialog
} from 'stellar-js-utils'
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import InstructionsHeader from '../components/InstructionsHeader.vue'

export default {
  mixins: [StellarCommonMixin],
  data() {
    return {
      showDialogPing: false,
      params: null,
      price: 1,
      assetCode: 'LMB',
      assetIssuer: '',
      horizonIP: '192.168.1.82:8000',
      biforstIP: '192.168.1.82:8800',
      network: 'test'
    }
  },
  computed: {
    allowHTTP: function() {
      return window.location.protocol !== 'https:'
    }
  },
  components: {
    'buy-token-dialog': BuyTokenDialog,
    'instructions-header': InstructionsHeader
  },
  mounted() {
    const issuerAcct = this.issuer()
    if (issuerAcct) {
      this.assetIssuer = issuerAcct.publicKey
    }
  },
  methods: {
    showDialog() {
      const protocol = window.location.protocol

      const issuerAcct = this.issuer()
      if (issuerAcct) {
        this.params = {
          network: this.network,
          horizonURL: protocol + '//' + this.horizonIP,
          bifrostURL: protocol + '//' + this.biforstIP,
          assetCode: this.assetCode,
          price: String(this.price),
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
@import '../scss/styles.scss';

.main-container {
    display: flex;
    flex-direction: column;
    align-items:: center;

    button {
        margin: 20px;
    }

    .bifrost-notes {
        margin-bottom: 20px;
    }

    .bifrost-params {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        .input-group {
            margin-right: 12px;
            flex: 1 0 200px;
        }
    }
}
</style>
