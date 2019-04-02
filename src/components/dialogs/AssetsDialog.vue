<template>
  <v-dialog lazy v-model="visible" scrollable @keydown.esc="visible = false" max-width="600">
    <div class="main-container">
      <dialog-titlebar :title="title" v-on:close="visible = false"/>

      <div class="asset-contents">
        <div class="asset-text">
          <div>Edit assets so they are available in the popup menu.</div>
        </div>

        <div class="asset-contents-inner">
          <v-combobox
            hide-details
            :items="assets"
            item-value="symbol"
            item-text="symbol"
            v-model="selectedAssetModel"
            v-on:input="typingSymbol"
            return-object
            clearable
            label="Symbol"
            autocomplete
            max-height="600"
          ></v-combobox>
          <v-text-field hide-details label="Issuer" v-model.trim="issuer" @keyup.enter="addAsset()"></v-text-field>
        </div>

        <div class="button-holder">
          <v-btn round color="secondary" slot="activator" @click="deleteAsset()">Delete Asset</v-btn>
          <v-btn round color="primary" slot="activator" @click="addAsset()">Add Asset</v-btn>
        </div>

        <toast-component :absolute="true" location="data-dialog" :bottom="false" :top="true"/>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import Helper from '../../js/helper.js'
import ToastComponent from '../ToastComponent.vue'
import AssetManager from '../../js/AssetManager.js'
import { DialogTitleBar } from 'stellarkit-js-ui'

export default {
  props: ['ping'],
  components: {
    'dialog-titlebar': DialogTitleBar,
    'toast-component': ToastComponent
  },
  data() {
    return {
      visible: false,
      title: 'Edit Assets',
      issuer: '',
      symbol: '',
      assets: [],
      selectedAssetModel: null
    }
  },
  watch: {
    ping() {
      this.visible = true

      this.clearValues()
    }
  },
  mounted() {
    this.assets = AssetManager.assets()

    Helper.vue().$on('assets-updated', () => {
      this.assets = AssetManager.assets()
    })
  },
  methods: {
    clearValues() {
      this.issuer = ''
      this.symbol = ''
      this.selectedAssetModel = null
    },
    typingSymbol(val) {
      if (val && typeof val === 'object') {
        this.symbol = val.symbol
        this.issuer = val.issuer
      } else {
        this.symbol = val
      }
    },
    deleteAsset() {
      const success = AssetManager.deleteAsset({
        symbol: this.symbol,
        issuer: this.issuer
      })

      if (success) {
        this.displayToast('Deleted')
        this.clearValues()
      } else {
        this.displayToast('Failed', true)
      }
    },
    addAsset() {
      const success = AssetManager.addAsset({
        symbol: this.symbol,
        issuer: this.issuer
      })

      if (success) {
        this.displayToast('Added')
        this.clearValues()
      } else {
        this.displayToast('Failed', true)
      }
    },
    displayToast(message, error = false) {
      Helper.toast(message, error, 'data-dialog')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../scss/styles.scss';

.main-container {
  @include standard-dialog-contents();

  .asset-contents {
    @include inner-dialog-contents();

    .asset-contents-inner {
      margin: 0 30px 16px;
    }

    .asset-text {
      div {
        margin-bottom: 10px;
      }
      margin-bottom: 20px;

      .sub-header {
        font-size: 0.8em;
      }
    }
  }
}
</style>
