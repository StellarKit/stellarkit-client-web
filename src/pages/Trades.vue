<template>
<div>
  <v-btn round @click="orderbook()">order book</v-btn>
  <!-- <v-btn round  @click="setLowballerTrust()">Low Ball Trust</v-btn>
  <v-btn round  @click="makeLowballOffer()">Low Ball Offer</v-btn> -->
  <v-btn round @click="streamPayments()">Payments</v-btn>
  <v-btn round @click="stopPaymentStream()">Stop Payments</v-btn>
  <v-btn round @click="streamOperations()">Operations</v-btn>
  <v-btn round @click="stopOperationStream()">Stop Operations</v-btn>
  <v-btn round @click="streamTrades()">Trades</v-btn>
  <v-btn round @click="stopTradeStream()">Stop Trades</v-btn>

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
import Helper from '../js/helper.js'
import StellarUtils from '../js/StellarUtils.js'

export default {
  mixins: [StellarCommonMixin],
  data() {
    return {
      paymentStopper: null,
      operationStopper: null,
      tradeStopper: null,
      operations: []
    }
  },
  methods: {
    addOperation(item) {
      this.operations.unshift(item)

      this.operations = this.operations.slice(0, 12)
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
      } else if (txResponse.type === 'payment_path') {
        let asset = 'native'

        if (txResponse.asset_type !== 'native') {
          asset = txResponse.asset_code
        }

        this.addOperation({
          id: txResponse.id,
          name: 'payment path' + asset + '/' + txResponse.source_asset_code,
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
        Helper.debugLog(txResponse)
      }
    },
    stopPaymentStream() {
      if (this.paymentStopper !== null) {
        Helper.debugLog('stopping payment stream')

        this.paymentStopper()
        this.paymentStopper = null
      }
    },
    streamPayments() {
      Helper.debugLog('listening for payments')

      const builder = StellarUtils.server().payments()
        .cursor('now')

      this.paymentStopper = builder.stream({
        onmessage: (txResponse) => {
          this.displayTransaction(txResponse)
        },
        onerror: (error) => {
          Helper.debugLog(error, 'Error')
        }
      })
    },
    stopOperationStream() {
      if (this.operationStopper !== null) {
        Helper.debugLog('stopping operation stream')

        this.operationStopper()
        this.operationStopper = null
      }
    },
    streamOperations() {
      Helper.debugLog('listening for operations')

      const builder = StellarUtils.server().operations()
        .cursor('now')

      this.operationStopper = builder.stream({
        onmessage: (txResponse) => {
          this.displayTransaction(txResponse)
        },
        onerror: (error) => {
          Helper.debugLog(error, 'Error')
        }
      })
    },
    stopTradeStream() {
      if (this.tradeStopper !== null) {
        Helper.debugLog('stopping trade stream')

        this.tradeStopper()
        this.tradeStopper = null
      }
    },
    streamTrades() {
      Helper.debugLog('listening for trades')

      const builder = StellarUtils.server().trades()
        .cursor('now')

      this.tradeStopper = builder.stream({
        onmessage: (txResponse) => {
          this.displayTransaction(txResponse)
        },
        onerror: (error) => {
          Helper.debugLog(error)
        }
      })
    },
    orderbook() {
      Helper.debugLog('Orderbook')

      const selling = StellarUtils.lumins()
      const buying = StellarAccounts.lamboTokenAsset()

      // const selling = StellarAccounts.lamboTokenAsset()
      // const buying = StellarUtils.lumins()

      StellarUtils.server().orderbook(selling, buying)
        .call()
        .then((response) => {
          Helper.debugLog(response)
        })
      // let max = 12
      // const closeStream = StellarUtils.server().orderbook(selling, buying)
      // .stream({
      //   onmessage: (response) => {
      //     if (max-- <= 0) {
      //       closeStream()
      //     } else {
      //       this.orderBids = response.bids
      //       this.orderAsks = response.asks
      //
      //       // Helper.debugLog(response)
      //     }
      //   },
      //   onerror: (error) => {
      //     Helper.debugLog('listen err: ' + JSON.stringify(error))
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
    min-height: 300px;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    background: rgb(55,55,55);
    color: white;

    .operations-item {
        display: flex;
        width: 100%;

        &:nth-child(even) {
            background: rgba(255, 255, 255, .2);
        }

        .item-name {
            text-align: right;
            padding-right: 5px;
            flex: 1 0 50%;

            background: rgba(0,200,0, .4);
        }

        .item-value {
            text-align: left;
            flex: 1 0 50%;
            padding-left: 5px;

            background: rgba(0,0,200, .4);
        }
    }

    .operations-title {
        font-size: 1.2em;
        padding: 2px 20px;
        margin-bottom: 4px;
        font-weight: bold;
        background: rgb(88,88,88);
        border-radius: 50px;
        text-transform: uppercase;
    }
}
</style>
