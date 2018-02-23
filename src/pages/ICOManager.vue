<template>
<div>
  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />

  <div class='page-title'>
    ICO Manager
    <div class='page-subtitle'>
      Under Construction
    </div>
  </div>
  <div class='page-contents'>

    <v-menu offset-y :transition=false>
      <v-btn :ripple=false slot="activator">
        {{currentToken}}
        <v-icon>&#xE5C5;</v-icon>
      </v-btn>
      <v-list dense>
        <v-list-tile v-for="item in tokenMenuItems" :key="item.title" @click="projectsMenuClick(item)">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

  </div>

  <create-token-dialog v-on:token-created='createDialogResult' :ping='createDialogPing' />
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import Helper from '../js/helper.js'
import AccountList from '../components/AccountList.vue'
import CreateTokenDialog from '../components/CreateTokenDialog.vue'

export default {
  mixins: [StellarCommonMixin],
  components: {
    'account-list': AccountList,
    'create-token-dialog': CreateTokenDialog
  },
  computed: {
    tokenMenuItems: function () {
      const result = []

      for (const item of this.tokenProjects) {
        result.push({
          title: 'Token: ' + item.symbol,
          symbol: item.symbol
        })
      }

      result.push({
        title: 'Create Token...',
        action: 'create'
      })

      return result
    }
  },
  data() {
    return {
      currentToken: 'XYZ',
      tokenProjects: [{
        symbol: 'ICG'
      }],
      createDialogPing: false
    }
  },
  mounted() {
    // nn
  },
  methods: {
    createToken() {
      Helper.debugLog('creating token')
      this.createDialogPing = !this.createDialogPing
    },
    createDialogResult(issuerWallet, distributorWallet, asset) {
      console.log(issuerWallet.publicKey())
      console.log(distributorWallet.publicKey())
      console.log(asset.getCode())
    },
    displayToken(symbol) {
      this.currentToken = 'Token: ' + symbol
      Helper.debugLog('displaying: ' + symbol)
    },
    projectsMenuClick(item) {
      switch (item.action) {
        case 'create':
          this.createToken()
          break
        default:
          this.displayToken(item.symbol)
          break
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.main-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;

    .page-contents {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        min-height: 400px;
    }
}
</style>
