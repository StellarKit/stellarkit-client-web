<template>
<div>
  <account-list :items="accountsUI" />
  <instructions-header>
    <div>Content coming soon...</div>
  </instructions-header>

  <div class='main-container'>
    <div class='bifrost-notes'>
      <div>This is only going to work if you have setup a local server with Bifrost, BTC and ETH servers configured. </div>
      <div>See <a
          href="https://github.com/StellarKit"
          target="_blank"
        >https://github.com/StellarKit</a> for docker images to test on testnet.</div>
    </div>

    <div class='bifrost-params'>
      <v-text-field
        hide-details
        label="Horizon IP Address"
        v-model.trim="horizonIP"
      ></v-text-field>
      <v-text-field
        hide-details
        label="Bifrost IP Address"
        v-model.trim="biforstIP"
      ></v-text-field>
      <v-text-field
        hide-details
        label="Network"
        v-model.trim="network"
      ></v-text-field>
    </div>

    <div
      style='margin-top: 20px;'
      class='button-group'
    >
      <v-btn
        round
        small
        color='primary'
        @click="showDialog"
      >Buy Token</v-btn>
      <v-btn
        round
        small
        color='primary'
        @click="transactionDialogPing = !transactionDialogPing"
      >Submit Transaction</v-btn>
    </div>
  </div>

  <buy-token-dialog
    :ping='showDialogPing'
    :params='params'
    v-on:new-account='newAccount'
  />
  <transaction-dialog :ping='transactionDialogPing' />
</div>
</template>

<script>
import {
  BuyTokenDialog
} from 'stellarkit-js-ui'
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import InstructionsHeader from '../components/InstructionsHeader.vue'
import TransactionDialog from '../components/dialogs/TransactionDialog.vue'
import AccountList from '../components/AccountList.vue'
import StellarAccounts from '../js/StellarAccounts.js'
import StellarSdk from 'stellar-sdk'

export default {
  mixins: [StellarCommonMixin],
  data() {
    return {
      showDialogPing: false,
      transactionDialogPing: false,
      params: null,
      horizonIP: '192.168.1.82:8000',
      biforstIP: '192.168.1.82:8800',
      network: 'test'
    }
  },
  components: {
    BuyTokenDialog,
    InstructionsHeader,
    TransactionDialog,
    AccountList
  },
  methods: {
    newAccount(secretKey) {
      // purchase successful, add account
      const keyPair = StellarSdk.Keypair.fromSecret(secretKey)
      StellarAccounts.addAccount(keyPair)
    },
    showDialog() {
      const protocol = window.location.protocol

      this.params = {
        network: this.network,
        horizonURL: protocol + '//' + this.horizonIP,
        bifrostURL: protocol + '//' + this.biforstIP,
        horizonAllowHttp: protocol !== 'https:'
      }

      this.showDialogPing = !this.showDialogPing
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
