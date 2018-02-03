<template>
<v-navigation-drawer absolute clipped temporary v-model="drawer" light>
  <v-toolbar flat>
    <v-list>
      <v-list-tile>
        <v-list-tile-title class="title">
          StellarKit
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-toolbar>
  <v-divider></v-divider>
  <v-list dense class="pt-0">
    <v-list-tile v-for="item in items" :key="item.title" @click="clickItem(item)">
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
  <donate-dialog :ping='showDonatePing' :nodeEnv="nodeEnv" :donationPublicKey='donationPublicKey' />
</v-navigation-drawer>
</template>

<script>
import {
  DonateDialog
} from 'stellar-js-utils'

export default {
  props: ['ping'],
  components: {
    'donate-dialog': DonateDialog
  },
  watch: {
    ping: function () {
      this.drawer = true
    }
  },
  computed: {
    nodeEnv: function () {
      if (window.electronAccess) {
        return window.electronAccess.nodeEnv()
      }
      return false
    }
  },
  data() {
    return {
      showDonatePing: false,
      drawer: false,
      donationPublicKey: 'GCYQSB3UQDSISB5LKAL2OEVLAYJNIR7LFVYDNKRMLWQKDCBX4PU3Z6JP',
      items: [{
          id: 'donate',
          title: 'Donate',
          icon: 'dashboard'
        },
        {
          title: 'About',
          icon: 'question_answer'
        },
        {
          title: 'Settings',
          icon: 'question_answer'
        }
      ]
    }
  },
  methods: {
    clickItem(item) {
      switch (item.id) {
        case 'donate':
          this.showDonatePing = !this.showDonatePing
          break
        default:
          break
      }
      this.drawer = false
    }
  }
}
</script>
