<template>
<div>
  <div class='top-controls'>
    <div class='address-box'>
      <v-select :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source accout" autocomplete return-object max-height="600"></v-select>
    </div>

    <v-menu offset-y>
      <v-btn color="primary" dark slot="activator">{{buttonTitle}}</v-btn>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" @click="menuClick(item.menuID)">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-btn round @click="next()">Next</v-btn>
    <v-btn round @click="previous(false)">Previous</v-btn>
  </div>
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
// const StellarSdk = require('stellar-sdk')
import Helper from '../js/helper.js'
import StreamingCache from '../js/StreamingCache.js'
// import StellarUtils from '../js/StellarUtils.js'
// import {
//   StellarWallet
// } from 'stellar-js-utils'

export default {
  mixins: [StellarCommonMixin],
  data() {
    return {
      selectedSource: null,
      mode: 'transactions',
      cache: null,
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
      ]
    }
  },
  computed: {
    buttonTitle: function () {
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
    }
  },
  methods: {
    menuClick(menuID) {
      this.mode = menuID

      this.cache = null
    },
    sourceValid() {
      const result = this.selectedSource ? this.selectedSource.publicKey : null

      if (Helper.strlen(result) > 0) {
        return true
      }
      return false
    },
    streamingCache() {
      if (!this.cache) {
        this.cache = new StreamingCache(this.mode, this.selectedSource.publicKey)
      }

      return this.cache
    },
    next() {
      return this.streamingCache().next()
        .then((result) => {
          if (result) {
            Helper.clearLog()
            Helper.debugLog(result)
          }
        })
        .catch((error) => {
          Helper.debugLog(error)
        })
    },
    previous() {
      return this.streamingCache().previous()
        .then((result) => {
          Helper.clearLog()
          Helper.debugLog(result)
        })
        .catch((error) => {
          Helper.debugLog(error)
        })
    }
  }
}
</script>

<style scoped lang='scss'>
.top-controls {
    padding: 20px;
}

.address-box {
    display: flex;
    align-items: center;
    div.input-group {
        margin-right: 16px;
    }
}
</style>
