<template>
<div class='menu-button-container'>
  <v-menu offset-y>
    <v-btn small slot="activator">
      <v-icon left>fa-server</v-icon>Network
      <v-icon right>&#xE5C5;</v-icon>
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
  <span class='network-string'>{{serverURL()}}</span>
</div>
</template>

<script>
import StellarServer from '../js/StellarServer.js'
import Helper from '../js/helper.js'

export default {
  data() {
    return {
      server: null,
      items: [{
          id: 'testnet',
          title: 'Testnet - stellar.org',
          icon: 'cloud_circle'
        },
        {
          id: 'mainnet',
          title: 'Main - stellar.org',
          icon: 'cloud_circle'
        },
        {
          id: 'stellarkit',
          title: 'Testnet - StellarKit',
          icon: 'cloud_circle'
        },
        {
          id: 'local',
          title: 'Testnet - Local',
          icon: 'cloud_circle'
        }
      ]
    }
  },
  created() {
    this.server = new StellarServer()
  },
  methods: {
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
    padding: 3px;
    width: 100%;
    display: flex;
    align-items: center;
    align-content: flex-start;
    border-bottom: solid 1px rgba(0,0,0,.04);

    span.network-string {
        margin-left: 10px;
        font-size: 1.2em;
    }
}
</style>
