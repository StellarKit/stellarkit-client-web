<template>
<div class='menu-button-main'>
  <div>
    {{title}}:
  </div>
  <v-menu offset-y>
    <v-btn flat color='primary' class='custom-menu-button' slot="activator">
      <div>{{getTitle()}}</div>
      <v-icon>&#xE5C5;</v-icon>
    </v-btn>
    <v-list dense>
      <v-list-tile v-for="asset of assets" :key="asset.symbol + asset.issuer" @click="menuClick(asset)">
        <div>{{asset.symbol}}</div>
      </v-list-tile>
      <v-list-tile class='edit-assets-item' @click="assetDialogPing = !assetDialogPing">
        <div>Edit Assets...</div>
      </v-list-tile>
    </v-list>
  </v-menu>
  <div class='button-issuer'>{{getIssuer()}}</div>

  <assets-dialog :ping='assetDialogPing' />
</div>
</template>

<script>
import AssetManager from '../js/AssetManager.js'
import AssetsDialog from './dialogs/AssetsDialog.vue'
import Helper from '../js/helper.js'
const StellarSdk = require('stellar-sdk')

const XMLItem = {
  symbol: 'XLM',
  issuer: ''
}

export default {
  props: ['title'],
  data() {
    return {
      selectedItem: XMLItem,
      assetDialogPing: false,
      assets: []
    }
  },
  components: {
    'assets-dialog': AssetsDialog
  },
  mounted() {
    this.refreshAssets()

    Helper.vue().$on('assets-updated', () => {
      this.refreshAssets()
    })
  },
  methods: {
    refreshAssets() {
      this.assets = AssetManager.assets()
      this.assets.unshift(XMLItem)
    },
    getTitle() {
      if (this.selectedItem) {
        return this.selectedItem.symbol
      }

      return ''
    },
    getIssuer() {
      if (this.selectedItem) {
        return this.selectedItem.issuer
      }

      return ''
    },
    menuClick(item) {
      this.selectedItem = item
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

    .button-issuer {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.8em;
        color: rgba(0,0,0,.4);
        max-width: 200px;
    }
}

.edit-assets-item {
    color: steelblue;
}
</style>
