<template>
<div>
  <instructions-header>
    <div>Content coming soon...</div>
  </instructions-header>

  <div class='top-controls'>
    <div class='button-group'>
      <v-btn round small @click="transactionsForSelectedSource()">Transactions</v-btn>
      <v-btn round small @click="paymentsForSelectedSource()">Payments</v-btn>
      <v-btn round small @click="operationsForSelectedSource()">Operations</v-btn>
    </div>

    <div class='address-box'>
      <v-select hide-details :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source account" autocomplete return-object max-height="600"></v-select>
      <v-menu offset-y :transition=false>
        <v-btn small :ripple=false slot="activator">
          {{buttonTitle}}
          <v-icon>&#xE5C5;</v-icon>
        </v-btn>
        <v-list dense>
          <v-list-tile v-for="item in items" :key="item.title" @click="menuClick(item.menuID)">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu offset-y :transition=false>
        <v-btn small :ripple=false slot="activator">
          {{orderButtonTitle}}
          <v-icon>&#xE5C5;</v-icon>
        </v-btn>
        <v-list dense>
          <v-list-tile v-for="item in orderItems" :key="item.title" @click="orderMenuClick(item.menuID)">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>

    <div class='button-row'>
      <v-btn icon color='secondary' @click="previous()">
        <v-tooltip open-delay='800' bottom>
          <v-icon slot='activator'>&#xE5CB;</v-icon>
          <span>Previous</span>
        </v-tooltip>
      </v-btn>
      <v-btn icon color='secondary' @click="next()">
        <v-tooltip open-delay='800' bottom>
          <v-icon slot='activator'>&#xE5CC;</v-icon>
          <span>Next</span>
        </v-tooltip>
      </v-btn>
      <div v-if="displayIndex >= 0" class='display-index'>Index: {{displayIndex}}</div>
    </div>
  </div>
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import StellarUtils from '../js/StellarUtils.js'
import Helper from '../js/helper.js'
import StreamingCache from '../js/StreamingCache.js'
import InstructionsHeader from '../components/InstructionsHeader.vue'
import {
  StellarWallet
} from 'stellar-js-utils'

export default {
  mixins: [StellarCommonMixin],
  components: {
    'instructions-header': InstructionsHeader
  },
  data() {
    return {
      selectedSource: null,
      mode: 'transactions',
      cache: null,
      displayIndex: -1,
      order: 'desc',
      items: [{
          title: 'Transactions',
          menuID: 'transactions'
        },
        {
          title: 'Operations',
          menuID: 'operations'
        },
        {
          title: 'Payments',
          menuID: 'payments'
        }
      ],
      orderItems: [{
          title: 'Ascending Order',
          menuID: 'asc'
        },
        {
          title: 'Decending Order',
          menuID: 'desc'
        }
      ]
    }
  },
  watch: {
    selectedSource: function() {
      this.clearUI()
      Helper.clearLog()
    }
  },
  computed: {
    buttonTitle: function() {
      let result = 'Unknown'
      switch (this.mode) {
        case 'transactions':
          result = 'Transactions'
          break
        case 'payments':
          result = 'Payments'
          break
        case 'operations':
          result = 'Operations'
          break
        default:
          break
      }
      return result
    },
    orderButtonTitle: function() {
      let result = 'Unknown'
      switch (this.order) {
        case 'asc':
          result = 'Ascending Order'
          break
        case 'desc':
          result = 'Descending Order'
          break
        default:
          break
      }
      return result
    }
  },
  methods: {
    operationsForSelectedSource() {
      const wallet = this.sourceWallet()

      if (wallet) {
        StellarUtils.operationsForWallet(wallet, this.order)
      }
    },
    paymentsForSelectedSource() {
      const wallet = this.sourceWallet()

      if (wallet) {
        StellarUtils.paymentsForWallet(wallet, this.order)
      }
    },
    transactionsForSelectedSource() {
      const wallet = this.sourceWallet()

      if (wallet) {
        StellarUtils.transactionsForWallet(wallet, this.order)
      }
    },
    clearUI() {
      this.cache = null
      this.displayIndex = -1
      Helper.clearLog()
    },
    menuClick(menuID) {
      this.mode = menuID
      this.clearUI()
    },
    orderMenuClick(menuID) {
      this.order = menuID
      this.clearUI()
    },
    sourceWallet() {
      if (this.sourceValid()) {
        return StellarWallet.public(this.selectedSource.publicKey)
      }

      return null
    },
    sourceValid() {
      const result = this.selectedSource ? this.selectedSource.publicKey : null

      if (Helper.strlen(result) > 0) {
        return true
      }

      Helper.debugLog('please select a source account', 'Error')
      Helper.toast('Please select a source account', true)

      return false
    },
    streamingCache() {
      if (this.sourceValid()) {
        if (!this.cache) {
          this.cache = new StreamingCache(this.mode, this.selectedSource.publicKey, this.order)
        }

        return this.cache
      }
      return null
    },
    displayResult(result) {
      if (result) {
        Helper.clearLog()

        this.displayIndex = result.index
        Helper.debugLog(result.record)
      }
    },
    next() {
      const cache = this.streamingCache()
      if (cache) {
        return cache.next()
          .then((result) => {
            this.displayResult(result)
          })
          .catch((error) => {
            Helper.debugLog(error)
          })
      }
    },
    previous() {
      const cache = this.streamingCache()
      if (cache) {
        return cache.previous()
          .then((result) => {
            this.displayResult(result)
          })
          .catch((error) => {
            Helper.debugLog(error)
          })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../scss/styles.scss';

.top-controls {
    padding: 10px 20px;

    .button-row {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;

        button {
            margin: 0 12px;
        }

        .display-index {
            margin: 0 10px;
            font-size: 1.2em;
        }
    }
}

.address-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;

    div.input-group {
        max-width: 250px;
        min-width: 140px;
        margin-right: 6px;
    }

    button {
        margin: 4px;
    }
}
</style>
