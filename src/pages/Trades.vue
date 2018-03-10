<template>
<div>
  <instructions-header>
    <div>Content coming soon...</div>
  </instructions-header>

  <!-- <v-btn round small @click="assets()">Assets</v-btn> -->
  <div class='button-group'>
    <v-btn round small @click="streamPayments()">{{paymentsButtonName}}</v-btn>
    <v-btn round small @click="streamOperations()">{{operationsButtonName}}</v-btn>
    <v-btn round small @click="streamTrades()">{{tradesButtonName}}</v-btn>
  </div>
  <div class="operations-content">
    <div class='operations-title'>Live Stream</div>
    <div class='operations-item' v-for="item in operations" :key='item.id + item.name'>
      <a :href='item.link' class='item-name' target='_blank'>
        {{item.name}}:
      </a>
      <a :href='item.link' class='item-value' target='_blank'>
        {{item.value}}
      </a>
    </div>
  </div>
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import Helper from '../js/helper.js'
import StellarUtils from '../js/StellarUtils.js'
import InstructionsHeader from '../components/InstructionsHeader.vue'

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
  components: {
    'instructions-header': InstructionsHeader
  },
  computed: {
    paymentsButtonName: function() {
      if (this.paymentStopper) {
        return 'Stop Payments'
      }
      return 'Payments'
    },
    operationsButtonName: function() {
      if (this.operationStopper) {
        return 'Stop Operations'
      }
      return 'Operations'
    },
    tradesButtonName: function() {
      if (this.tradeStopper) {
        return 'Stop Trades'
      }
      return 'Trades'
    }
  },
  methods: {
    addOperation(item, tx) {
      item.link = tx._links.self.href

      this.operations.unshift(item)

      this.operations = this.operations.slice(0, 12)
    },
    displayTransaction(txResponse) {
      if (txResponse.type === 'payment') {
        let asset = 'XLM'

        if (txResponse.asset_type !== 'native') {
          asset = txResponse.asset_code
        }
        this.addOperation({
          id: txResponse.id,
          name: 'Payment ' + asset,
          value: Helper.stripZeros(txResponse.amount)
        }, txResponse)
      } else if (txResponse.type === 'payment_path') {
        let asset = 'XLM'

        if (txResponse.asset_type !== 'native') {
          asset = txResponse.asset_code
        }

        this.addOperation({
          id: txResponse.id,
          name: 'Payment path' + asset + '/' + txResponse.source_asset_code,
          value: Helper.stripZeros(txResponse.amount)
        }, txResponse)
      } else if (txResponse.type === 'create_account') {
        this.addOperation({
          id: txResponse.id,
          name: 'Create Account',
          value: Helper.stripZeros(txResponse.starting_balance)
        }, txResponse)
      } else if (txResponse.type === 'account_merge') {
        this.addOperation({
          id: txResponse.id,
          name: 'Account Merge',
          value: 'merging'
        }, txResponse)
      } else if (txResponse.type === 'manage_offer') {
        let buying = 'XLM'
        let selling = 'XLM'

        if (txResponse.buying_asset_type !== 'native') {
          buying = txResponse.buying_asset_code
        }
        if (txResponse.selling_asset_type !== 'native') {
          selling = txResponse.selling_asset_code
        }
        this.addOperation({
          id: txResponse.id,
          name: 'Manage Offer',
          value: 'Selling: ' + selling + ' Buying: ' + buying
        }, txResponse)
      } else if (txResponse.type === 'change_trust') {
        let asset = 'XLM'

        if (txResponse.asset_type !== 'native') {
          asset = txResponse.asset_code
        }

        this.addOperation({
          id: txResponse.id,
          name: 'Change Trust',
          value: asset
        }, txResponse)
      } else if (txResponse.type === 'set_options') {
        let value = 'unknown'
        if (txResponse.inflation_dest) {
          value = 'Inflation dest = ' + txResponse.inflation_dest
        }

        this.addOperation({
          id: txResponse.id,
          name: 'Set Options',
          value: value
        }, txResponse)
      } else if (txResponse.type === 'allow_trust') {
        let asset = 'XLM'

        if (txResponse.asset_type !== 'native') {
          asset = txResponse.asset_code
        }

        this.addOperation({
          id: txResponse.id,
          name: 'Allow Trust',
          value: asset
        }, txResponse)
      } else if (txResponse.type === 'manage_data') {
        this.addOperation({
          id: txResponse.id,
          name: 'Manage Data',
          value: 'Name = ' + txResponse.name + ' Value = ' + txResponse.value
        }, txResponse)
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
            if (error['isTrusted'] === true) {
              // not sure what this is, but ignoring it, constantly logs
            } else {
              Helper.debugLog(error, 'onerror')
            }
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
            if (error['isTrusted'] === true) {
              // not sure what this is, but ignoring it, constantly logs
            } else {
              Helper.debugLog(error, 'onerror')
            }
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
            if (error['isTrusted'] === true) {
              // not sure what this is, but ignoring it, constantly logs
            } else {
              Helper.debugLog(error, 'onerror')
            }
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
        //     Helper.debugLog(error, 'onerror')
        //   }
        // })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../scss/styles.scss';

.operations-content {
    display: flex;
    width: 100%;
    min-height: 300px;
    flex-direction: column;
    align-items: center;
    background: rgb(55,55,55);
    color: white;

    .operations-item {
        display: flex;
        width: 100%;

        &:nth-child(even) {
            background: rgba(255, 255, 255, .1);
        }

        .item-name {
            text-align: right;
            padding-right: 5px;
            flex: 1 0 50%;
            text-decoration: none;
            color: white;

            background: rgba(0,55,40, .2);
        }

        .item-value {
            text-align: left;
            flex: 1 0 50%;
            padding-left: 5px;
            text-decoration: none;
            font-weight: bold;
            color: white;
            background: rgba(0,0,200, .1);
        }
    }

    .operations-title {
        width: 100%;
        text-align: center;
        background: rgba(0,0,0,.3);
        font-size: 1em;
        color: rgba(255,255,255,.5);
        font-weight: bold;
        margin: 2px 0;
        text-transform: uppercase;
    }
}
</style>
