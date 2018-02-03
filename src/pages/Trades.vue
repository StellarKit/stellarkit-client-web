<template>
<div>
  <v-btn small @click="orderbook()">order book</v-btn>
  <!-- <v-btn small @click="setLowballerTrust()">Low Ball Trust</v-btn>
  <v-btn small @click="makeLowballOffer()">Low Ball Offer</v-btn> -->
  <v-btn small @click="streamPayments()">Payments</v-btn>
  <v-btn small @click="stopPaymentStream()">Stop Payments</v-btn>
  <v-btn small @click="streamOperations()">Operations</v-btn>
  <v-btn small @click="stopOperationStream()">Stop Operations</v-btn>
  <v-btn small @click="streamTrades()">Trades</v-btn>
  <v-btn small @click="stopTradeStream()">Stop Trades</v-btn>

  <div class="operations-content">
    <div class='operations-title'>Operations</div>
    <div class='operations-item' v-for="item in operations" :key=item.id>
      <div class='item-name'>
        {{item.name}}:
      </div>
      <div class='item-value'>
        {{item.value}}
      </div>
    </div>
  </div>
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import StellarAccounts from '../js/StellarAccounts.js'

export default {
  mixins: [StellarCommonMixin],
  data() {
    return {
      lowballerAcct: null,
      distributorAcct: null,
      paymentStopper: null,
      operationStopper: null,
      tradeStopper: null,
      operations: []
    }
  },
  mounted() {
    // this.lowballerAcct = StellarAccounts.accountWithName('Low Baller')
    // if (!this.lowballerAcct) {
    //   this.su.createTestAccount('Low Baller')
    //     .then((result) => {
    //       this.lowballerAcct = result
    //     })
    //     .catch((error) => {
    //       this.debugLog(error)
    //     })
    // }

    this.distributorAcct = StellarAccounts.accountWithName('Distributor')
  },
  methods: {
    addOperation(item) {
      this.operations.unshift(item)

      this.operations = this.operations.slice(0, 20)
    },
    displayTransaction(txResponse) {
      if (txResponse.type === 'payment') {
        let asset = 'native'

        if (txResponse.asset_type !== 'native') {
          asset = txResponse.asset_code
        }
        this.addOperation({
          id: txResponse.id,
          name: 'payment ' + asset,
          value: txResponse.amount
        })
      } else if (txResponse.type === 'create_account') {
        this.addOperation({
          id: txResponse.id,
          name: 'create account',
          value: txResponse.starting_balance
        })
      } else if (txResponse.type === 'account_merge') {
        this.addOperation({
          id: txResponse.id,
          name: 'account merge',
          value: 'merging'
        })
      } else if (txResponse.type === 'manage_offer') {
        let buying = 'native'
        let selling = 'native'

        if (txResponse.buying_asset_type !== 'native') {
          buying = txResponse.buying_asset_code
        }
        if (txResponse.selling_asset_type !== 'native') {
          selling = txResponse.selling_asset_code
        }
        this.addOperation({
          id: txResponse.id,
          name: 'manage offer',
          value: 'selling: ' + selling + ' buying: ' + buying
        })
      } else if (txResponse.type === 'change_trust') {
        let asset = 'native'

        if (txResponse.asset_type !== 'native') {
          asset = txResponse.asset_code
        }

        this.addOperation({
          id: txResponse.id,
          name: 'change trust',
          value: asset
        })
      } else if (txResponse.type === 'set_options') {
        let value = 'unknown'
        if (txResponse.inflation_dest) {
          value = 'inflation_dest = ' + txResponse.inflation_dest
        }

        this.addOperation({
          id: txResponse.id,
          name: 'set options',
          value: value
        })
      } else if (txResponse.type === 'allow_trust') {
        let asset = 'native'

        if (txResponse.asset_type !== 'native') {
          asset = txResponse.asset_code
        }

        this.addOperation({
          id: txResponse.id,
          name: 'allow trust',
          value: asset
        })
      } else if (txResponse.type === 'manage_data') {
        this.addOperation({
          id: txResponse.id,
          name: 'manage data',
          value: 'name = ' + txResponse.name + ' value = ' + txResponse.value
        })
      } else {
        this.debugLog(txResponse)
      }
    },
    stopPaymentStream() {
      if (this.paymentStopper !== null) {
        this.debugLog('stopping payment stream')

        this.paymentStopper()
        this.paymentStopper = null
      }
    },
    streamPayments() {
      this.debugLog('listening for payments')

      const builder = this.su.server().payments()
        .cursor('now')

      this.paymentStopper = builder.stream({
        onmessage: (txResponse) => {
          this.displayTransaction(txResponse)
        },
        onerror: (error) => {
          this.debugLog(error)
        }
      })
    },
    stopOperationStream() {
      if (this.operationStopper !== null) {
        this.debugLog('stopping operation stream')

        this.operationStopper()
        this.operationStopper = null
      }
    },
    streamOperations() {
      this.debugLog('listening for operations')

      const builder = this.su.server().operations()
        .cursor('now')

      this.operationStopper = builder.stream({
        onmessage: (txResponse) => {
          this.displayTransaction(txResponse)
        },
        onerror: (error) => {
          this.debugLog('Error: ')
          this.debugLog(error)
        }
      })
    },
    stopTradeStream() {
      if (this.tradeStopper !== null) {
        this.debugLog('stopping trade stream')

        this.tradeStopper()
        this.tradeStopper = null
      }
    },
    streamTrades() {
      this.debugLog('listening for trades')

      const builder = this.su.server().trades()
        .cursor('now')

      this.tradeStopper = builder.stream({
        onmessage: (txResponse) => {
          this.displayTransaction(txResponse)
        },
        onerror: (error) => {
          this.debugLog(error)
        }
      })
    },
    setLowballerTrust() {
      // buyer must trust the distributor
      this.su.changeTrust(this.lowballerAcct.secret, StellarAccounts.lamboTokenAsset(), '10000')
        .then((result) => {
          this.debugLog(result)
        })
        .catch((error) => {
          this.debugLog(error)
        })
    },
    makeLowballOffer() {
      this.su.manageOffer(this.lowballerAcct.secret, StellarAccounts.lamboTokenAsset(), this.su.lumins(), '2', {
          n: 44,
          d: 3
        })
        .then((response) => {
          this.debugLog(response, 'SUCCESS')
        })
        .catch((error) => {
          this.debugLog(error, 'ERROR')
        })
    },
    orderbook() {
      this.debugLog('Orderbook')

      const selling = this.su.lumins()
      const buying = StellarAccounts.lamboTokenAsset()

      // const selling = StellarAccounts.lamboTokenAsset()
      // const buying = this.su.lumins()

      this.su.server().orderbook(selling, buying)
        .call()
        .then((response) => {
          this.debugLog(response)
        })
      // let max = 12
      // const closeStream = this.su.server().orderbook(selling, buying)
      // .stream({
      //   onmessage: (response) => {
      //     if (max-- <= 0) {
      //       closeStream()
      //     } else {
      //       this.orderBids = response.bids
      //       this.orderAsks = response.asks
      //
      //       // this.debugLog(response)
      //     }
      //   },
      //   onerror: (error) => {
      //     this.debugLog('listen err: ' + JSON.stringify(error))
      //   }
      // })
    }
  }
}
</script>

<style scoped lang='scss'>
.operations-content {
    display: flex;
    width: 100%;
    min-height: 400px;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    margin: 5px;
    background: rgb(55,55,55);
    color: white;

    .operations-item {
        display: flex;
        width: 100%;

        .item-name {
            text-align: right;
            color: green;
            margin-right: 10px;
            flex: 1 0 50%;
        }

        .item-value {
            text-align: left;
            color: red;
            flex: 1 0 50%;
        }
    }

    .operations-title {
        font-size: 1.2em;
    }
}
</style>
