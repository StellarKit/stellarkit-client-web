<template>
<div>
  <v-menu offset-y @click.native.stop>
    <v-btn icon slot="activator">
      <v-icon>&#xE5D4;</v-icon>
    </v-btn>
    <v-list dense>
      <v-list-tile @click="ledgerMenu('show-offers')">
        <v-list-tile-title>Show Offers</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="ledgerMenu('post-offer')">
        <v-list-tile-title>Post Offer</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="ledgerMenu('send-asset')">
        <v-list-tile-title>Send Asset</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="ledgerMenu('save-keys')">
        <v-list-tile-title>Save/Print Keys</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="ledgerMenu('trust-asset')">
        <v-list-tile-title>Trust Asset</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="ledgerMenu('allow-trust')">
        <v-list-tile-title>Allow Trust</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>

  <show-offers-dialog :ping='showOffersDialogPing' :model="showOffersDialogModel" />
  <save-print-secret-dialog :ping='saveSecretDialogPing' :publicKey='publicKey' />
  <trust-token-dialog :ping='trustDialogPing' :model="trustDialogModel" />
  <send-assets-dialog :ping='sendAssetsDialogPing' :model="sendAssetsDialogModel" />
  <manage-offer-dialog :ping='manageOfferDialogPing' :model="manageOfferDialogModel" />
  <allow-trust-dialog :ping='allowTrustDialogPing' :model='allowTrustDialogModel' />
</div>
</template>

<script>
import ShowOffersDialog from './dialogs/ShowOffersDialog.vue'
import ReusableStellarViewsModel from './ReusableStellarViewsModel.js'
import SendAssetsDialog from './dialogs/SendAssetsDialog.vue'
import TrustTokenDialog from './dialogs/TrustTokenDialog.vue'
import ManageOfferDialog from './dialogs/ManageOfferDialog.vue'
import AllowTrustDialog from './dialogs/AllowTrustDialog.vue'
import SavePrintSecretDialog from './dialogs/SavePrintSecretDialog.vue'
import StellarAccounts from '../js/StellarAccounts.js'

export default {
  props: ['publicKey'],
  components: {
    ShowOffersDialog,
    SavePrintSecretDialog,
    TrustTokenDialog,
    SendAssetsDialog,
    ManageOfferDialog,
    AllowTrustDialog
  },
  data() {
    return {
      showOffersDialogPing: false,
      saveSecretDialogPing: false,
      trustDialogPing: false,
      sendAssetsDialogPing: false,
      manageOfferDialogPing: false,
      allowTrustDialogPing: false,
      showOffersDialogModel: new ReusableStellarViewsModel(),
      trustDialogModel: new ReusableStellarViewsModel(),
      sendAssetsDialogModel: new ReusableStellarViewsModel(),
      manageOfferDialogModel: new ReusableStellarViewsModel(),
      allowTrustDialogModel: new ReusableStellarViewsModel(),
    }
  },
  methods: {
    ledgerMenu(id) {
      switch (id) {
        case 'show-offers':
          this.showOffersDialogModel.sourceAccount = StellarAccounts.accountWithPublicKey(this.publicKey)
          this.showOffersDialogPing = !this.showOffersDialogPing
          break
        case 'save-keys':
          this.saveSecretDialogPing = !this.saveSecretDialogPing
          break
        case 'trust-asset':
          this.trustDialogModel.sourceAccount = StellarAccounts.accountWithPublicKey(this.publicKey)
          this.trustDialogPing = !this.trustDialogPing
          break
        case 'send-asset':
          this.sendAssetsDialogModel.sourceAccount = StellarAccounts.accountWithPublicKey(this.publicKey)
          this.sendAssetsDialogPing = !this.sendAssetsDialogPing
          break
        case 'post-offer':
          this.manageOfferDialogModel.sourceAccount = StellarAccounts.accountWithPublicKey(this.publicKey)
          this.manageOfferDialogPing = !this.manageOfferDialogPing
          break
        case 'allow-trust':
          this.allowTrustDialogModel.sourceAccount = StellarAccounts.accountWithPublicKey(this.publicKey)
          this.allowTrustDialogPing = !this.allowTrustDialogPing
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
