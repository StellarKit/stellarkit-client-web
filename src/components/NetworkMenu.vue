<template>
<div class='menu-button-container'>
  <v-menu offset-y>
    <v-btn small outline class='tiny-button' color='primary' slot="activator">
      Network
      <v-icon>&#xE5C5;</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.title" @click="menuSelected(item)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
  <div class='network-string'>{{serverURL()}}</div>
  <v-btn small outline class='tiny-button' color='primary' @click="horizonMetrics()">Horizon Metrics</v-btn>
</div>
</template>

<script>
import StellarServer from '../js/StellarServer.js'
import Helper from '../js/helper.js'
import StellarUtils from '../js/StellarUtils.js'

export default {
  data() {
    return {
      server: null,
      items: [{
          id: 'testnet',
          title: 'Testnet at Stellar.org',
          icon: 'cloud_circle'
        },
        {
          id: 'mainnet',
          title: 'Main - stellar.org',
          icon: 'cloud_circle'
        },
        {
          id: 'stellarkit',
          title: 'Testnet at StellarKit.io',
          icon: 'cloud_circle'
        },
        {
          id: 'local',
          title: 'Testnet - Local server',
          icon: 'cloud_circle'
        }
      ]
    }
  },
  created() {
    this.server = new StellarServer()
  },
  methods: {
    horizonMetrics() {
      Helper.debugLog('horizon metrics...')

      StellarUtils.horizonMetrics()
        .then((response) => {
          Helper.debugLog(response, 'Success')
        })
        .catch((error) => {
          Helper.debugLog(error, 'Error')
        })
    },
    serverURL() {
      return this.server.serverURL()
    },
    menuSelected(item) {
      Helper.set('server', item.id)
      this.$forceUpdate()
    },
    clickItem(item) {
      switch (item.id) {
        case 'donate':
          break
        default:
          break
      }
      this.drawer = false
    }
  }
}
</script>

<style lang='scss' scoped>
.menu-button-container {
    background: rgba(0,0,0, .02);
    padding-bottom: 1px;
    width: 100%;
    display: flex;
    align-items: center;
    align-content: flex-start;

    .network-string {
        margin-left: 2px;
        color: rgba(0,0,0,.6);
        font-weight: bold;
        font-size: 1em;
        flex: 1 1 auto;
        white-space: nowrap;
        overflow: hidden;
        width: 0; // ellipse would not work without this
        text-overflow: ellipsis;
    }

    .tiny-button {
        margin: 3px 4px;
    }
}
</style>
