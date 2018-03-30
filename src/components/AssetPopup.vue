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
      <v-list-tile v-for="asset of assets()" :key="asset.symbol" @click="menuClick(asset, index)">
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

export default {
  data() {
    return {
      index: 0,
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
      return this.getSelectedItem().symbol
    },
    menuClick(item, index) {
      this.index = index
    },
    selectItemWith(id) {
      for (const [index, item] of this.items.entries()) {
        if (id === item.id) {
          this.index = index
          break
        }
      }
    },
    getSelectedItem() {
      const a = this.assets()

      if (a && a.length > 0) {
        return a[this.index]
      }
      return {
        symbol: '--',
        issuer: ''
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
}
</style>
