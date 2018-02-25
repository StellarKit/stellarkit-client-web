<template>
<v-navigation-drawer absolute clipped dark temporary v-model="drawer">
  <v-toolbar>
    <v-list>
      <v-list-tile @click="clickItem()">
        <v-list-tile-title class="title">
          {{applicationName}}
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-toolbar>
  <v-divider></v-divider>
  <v-list>
    <v-list-tile v-for="item in items" :key="item.title" @click="clickItem(item)">
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
  <donate-dialog :ping='showDonatePing' :donationPublicKey='donationPublicKey' />
  <help-dialog :ping='showHelpPing' title='Help' />
  <about-dialog :ping='showAboutPing' title='About' />
</v-navigation-drawer>
</template>

<script>
import {
  PaymentDialog
} from 'stellar-js-utils'
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
    ping: function () {
      this.drawer = true
    }
  },
  computed: {
    applicationName: function () {
      return Helper.applicationName()
    }
  },
  data() {
    return {
      showHelpPing: false,
      showAboutPing: false,
      showDonatePing: false,
      drawer: false,
      donationPublicKey: 'GCYQSB3UQDSISB5LKAL2OEVLAYJNIR7LFVYDNKRMLWQKDCBX4PU3Z6JP',
      items: [{
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
          id: 'settings',
          title: 'Settings',
          icon: 'settings'
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
