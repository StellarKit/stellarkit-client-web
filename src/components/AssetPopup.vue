<template>
  <div class="menu-button-main">
    <div>{{title}}:</div>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text color="primary" class="custom-menu-button" v-on="on">
          <div>{{getTitle()}}</div>
          <v-icon>&#xE5C5;</v-icon>
        </v-btn>
      </template>

      <v-list dense>
        <v-list-item
          v-for="asset of assets"
          :key="asset.symbol + asset.issuer"
          @click="menuClick(asset)"
        >
          <div>{{asset.symbol}}</div>
        </v-list-item>
        <v-list-item class="edit-assets-item" @click="assetDialogPing = !assetDialogPing">
          <div>Edit Assets...</div>
        </v-list-item>
      </v-list>
    </v-menu>
    <div class="button-issuer">{{getIssuer()}}</div>

    <assets-dialog :ping="assetDialogPing" />
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
  props: ['title', 'model'],
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
      if (this.model.asset) {
        return this.model.asset.getCode()
      }

      return ''
    },
    getIssuer() {
      if (this.model.asset) {
        return this.model.asset.getIssuer()
      }

      return ''
    },
    menuClick(item) {
      if (Helper.strOK(item.issuer)) {
        this.model.asset = new StellarSdk.Asset(item.symbol, item.issuer)
      } else {
        this.model.asset = StellarSdk.Asset.native()
      }
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
    color: rgba(0, 0, 0, 0.4);
    max-width: 200px;
  }
}

.edit-assets-item {
  color: steelblue;
}
</style>
