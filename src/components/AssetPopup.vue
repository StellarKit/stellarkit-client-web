<template>
<div class='menu-button-main'>
  <div>
    {{title}}:
  </div>
  <v-menu offset-y>
    <v-btn flat color='primary' class='custom-menu-button' slot="activator">
      {{getTitle()}}
      <v-icon>&#xE5C5;</v-icon>
    </v-btn>
    <v-list dense>
      <v-list-tile v-for="asset of assets()" :key="asset.symbol" @click="menuClick(asset)">
        <div>{{asset.symbol}}</div>
      </v-list-tile>
      <v-list-tile @click="assetDialogPing = !assetDialogPing">
        <div>Edit Assets...</div>
      </v-list-tile>
    </v-list>
  </v-menu>

  <assets-dialog :ping='assetDialogPing' />
</div>
</template>

<script>
import AssetManager from '../js/AssetManager.js'
import AssetsDialog from './dialogs/AssetsDialog.vue'
import Helper from '../js/helper.js'
const StellarSdk = require('stellar-sdk')

export default {
  data() {
    return {
      selectedItem: {
        symbol: 'XLM',
        issuer: ''
      },
      assetDialogPing: false,
      title: 'Asset'
    }
  },
  components: {
    'assets-dialog': AssetsDialog
  },
  mounted() {
    Helper.vue().$on('assets-updated', this.update)
  },
  methods: {
    update() {
      this.$forceUpdate()
    },
    assets() {
      return AssetManager.assets()
    },
    getTitle() {
      if (this.selectedItem) {
        return this.selectedItem.symbol
      }

      return ''
    },
    menuClick(item) {
      this.selectedItem = item
      this.$forceUpdate()
    },
    getSelectedAsset() {
      if (this.selectedItem) {
        if (Helper.strOK(this.selectedItem.issuer)) {
          return new StellarSdk.Asset(this.selectedItem.symbol, this.selectedItem.issuer)
        }
        return StellarSdk.Asset.native()
      }

      return null
    }
  }
}
</script>

<style lang='scss' scoped>
.menu-button-main {
    display: flex;
    align-items: center;
    font-size: 0.95em;

    .custom-menu-button {
        margin: 0 0 0 6px;
    }
}
</style>
