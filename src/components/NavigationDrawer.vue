<template>
  <v-navigation-drawer class="navigation-drawer" absolute clipped temporary v-model="drawer">
    <div>
      <div class="list-header-item" @click="clickItem()">
        <div class="title">{{applicationName}}</div>
      </div>
    </div>
    <v-divider></v-divider>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.title" @click="clickItem(item)">
        <div class="list-item-icon">
          <v-icon>{{item.icon}}</v-icon>
        </div>
        <v-list-tile-content>
          <div class="list-item-text">{{item.title}}</div>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <donate-dialog :ping="showDonatePing" :donationPublicKey="donationPublicKey"/>
    <help-dialog :ping="showHelpPing" title="Help"/>
    <about-dialog :ping="showAboutPing" title="About"/>
  </v-navigation-drawer>
</template>

<script>
import { PaymentDialog } from 'stellarkit-js-ui'
import Helper from '../js/helper.js'
import ExpansionDialog from './dialogs/ExpansionDialog.vue'
import AboutDialog from './dialogs/AboutDialog.vue'

export default {
  props: ['ping'],
  components: {
    'donate-dialog': PaymentDialog,
    'help-dialog': ExpansionDialog,
    'about-dialog': AboutDialog
  },
  watch: {
    ping: function() {
      this.drawer = true
    }
  },
  computed: {
    applicationName: function() {
      return Helper.applicationName()
    }
  },
  data() {
    return {
      showHelpPing: false,
      showAboutPing: false,
      showDonatePing: false,
      drawer: false,
      donationPublicKey:
        'GBJC6AF4I5FUTYMG4CXC3V2NYMIQANBRB4UQYY3M2RRZCXCNLFR7TN7J',
      items: [
        {
          id: 'about',
          title: 'About',
          icon: 'person'
        },
        {
          id: 'donate',
          title: 'Donate',
          icon: 'local_atm'
        },
        {
          id: 'help',
          title: 'Help',
          icon: 'help'
        },
        {
          id: 'github',
          title: 'Source on Github',
          icon: 'fab fa-github'
        }
      ]
    }
  },
  methods: {
    clickItem(item) {
      if (item) {
        switch (item.id) {
          case 'donate':
            this.showDonatePing = !this.showDonatePing
            break
          case 'help':
            this.showHelpPing = !this.showHelpPing
            break
          case 'about':
            this.showAboutPing = !this.showAboutPing
            break
          case 'github':
            Helper.openBrowser(
              'https://github.com/StellarKit/stellarkit-client-web'
            )
            break
          default:
            break
        }
      }

      // hide drawer for every click
      this.drawer = false
    }
  }
}
</script>

<style lang='scss' scoped>
.list-header-item {
  display: flex;
  align-items: center;
  padding: 12px;
  color: white;
  background: steelblue;
}

.navigation-drawer {
  background: rgb(245, 245, 245);
}
.list-item-text {
  font-size: 1.3em;
  color: rgba(0, 0, 0, 0.6);
}
.list-item-icon {
  margin-right: 16px;
}
</style>
