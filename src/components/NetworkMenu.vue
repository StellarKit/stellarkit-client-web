<template>
<div class='menu-button-container'>
  <v-menu offset-y>
    <v-btn small outline class='tiny-button' color='primary' slot="activator">
      {{buttonTitle()}}
      <v-icon>&#xE5C5;</v-icon>
    </v-btn>
    <v-list dense>
      <v-list-tile v-for="item in items" :key="item.title + (item.main ? 'main':'test')" @click="menuSelected(item)">
        <div class='network-menu-item'>
          <div class='menu-tile-title'>{{item.title}}</div>

          <div v-if='item.main' class='network-main'>PUBLIC</div>
          <div v-else class='network-test'>TEST</div>
        </div>
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
          main: false,
          title: 'Stellar.org'
        },
        {
          id: 'mainnet',
          main: true,
          title: 'Stellar.org'
        },
        {
          id: 'stellarkit',
          main: false,
          title: 'StellarKit.io'
        },
        {
          id: 'local',
          main: false,
          title: 'Local server'
        }
      ]
    }
  },
  created() {
    this.server = new StellarServer()
  },
  methods: {
    buttonTitle() {
      if (StellarUtils.isTestnet()) {
        return 'Test Net'
      }

      return 'Public Net'
    },
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

      // alert ui to update
      Helper.emit('stellar-network-updated')

      this.$forceUpdate()
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

.network-menu-item {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 1.3em;

    .menu-tile-title {
        flex: 1 0 auto;
        margin-right: 16px;
    }

    .network-main,
    .network-test {
        flex: 0 0 auto;
        padding: 1px 8px;
        text-align: center;
        min-width: 50px;
        color: white;
        font-size: 0.8em;
        border-radius: 3px;
        font-weight: bold;
    }

    .network-test {
        background: rgba(8, 128, 200, .6);
    }

    .network-main {
        background: rgba(28, 180, 28, .6);
    }
}
</style>
