<template>
<div>
  <div class='page-title'>
    View Streams
  </div>

  <!-- <v-btn round small @click="assets()">Assets</v-btn> -->
  <v-btn round small @click="streamPayments()">{{paymentsButtonName}}</v-btn>
  <v-btn round small @click="streamOperations()">{{operationsButtonName}}</v-btn>
  <v-btn round small @click="streamTrades()">{{tradesButtonName}}</v-btn>

  <div class="operations-content">
    <div class='operations-title'>Live Stream</div>
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
  computed: {
    paymentsButtonName: function () {
      if (this.paymentStopper) {
        return 'Stop Payments'
      }
      return 'Payments'
    },
    operationsButtonName: function () {
      if (this.operationStopper) {
        return 'Stop Operations'
      }
      return 'Operations'
    },
    tradesButtonName: function () {
      if (this.tradeStopper) {
        return 'Stop Trades'
      }
      return 'Trades'
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
    streamPayments() {
      if (this.paymentStopper !== null) {
        Helper.debugLog('stopping payment stream')

        this.paymentStopper()
        this.paymentStopper = null
      } else {
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
      }
    },
    streamOperations() {
      if (this.operationStopper !== null) {
        Helper.debugLog('stopping operation stream')

        this.operationStopper()
        this.operationStopper = null
      } else {
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
      }
    },
    streamTrades() {
      if (this.tradeStopper !== null) {
        Helper.debugLog('stopping trade stream')

        this.tradeStopper()
        this.tradeStopper = null
      } else {
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
      }
    },
    nextAssetPage(inResponse) {
      inResponse.next()
        .then((response) => {
          for (const rec of response.records) {
            if (parseFloat(rec.amount) > 0.0) {
              Helper.debugLog(rec.asset_code + ' ' + rec.amount)
            }
          }
          this.nextAssetPage(response)
        })
    },
    assets() {
      if (this.assetStopper) {
        Helper.debugLog('stopping assets')

        this.assetStopper()
        this.assetStopper = null
      } else {
        Helper.debugLog('Assets')

        const builder = StellarUtils.server().assets()
          .order('desc')

        builder.call()
          .then((response) => {
            for (const rec of response.records) {
              if (parseFloat(rec.amount) > 0.0) {
                Helper.debugLog(rec.asset_code + ' ' + rec.amount)
              }
            }
            this.nextAssetPage(response)
          })
        // this.assetStopper = builder.stream({
        //   onmessage: (response) => {
        //     Helper.debugLog(response)
        //   },
        //   onerror: (error) => {
        //     Helper.debugLog(error, 'Error')
        //   }
        // })
      }
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
