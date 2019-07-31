<template>
  <div>
    <v-menu offset-y @click.native.stop>
      <template v-slot:activator="{ on }">
        <v-btn icon :small="small" :class="{ 'small-button': small}" v-on="on">
          <v-icon>&#xE5D4;</v-icon>
        </v-btn>
      </template>

      <v-list dense>
        <v-list-item @click="actionMenu('show-offers')">
          <v-list-item-title>Show Offers</v-list-item-title>
        </v-list-item>
        <v-list-item @click="actionMenu('post-offer')">
          <v-list-item-title>Post Offer</v-list-item-title>
        </v-list-item>
        <v-list-item @click="actionMenu('send-asset')">
          <v-list-item-title>Send Asset</v-list-item-title>
        </v-list-item>
        <v-list-item @click="actionMenu('save-keys')">
          <v-list-item-title>Save/Print Keys</v-list-item-title>
        </v-list-item>
        <v-list-item @click="actionMenu('trust-asset')">
          <v-list-item-title>Trust Asset</v-list-item-title>
        </v-list-item>
        <v-list-item @click="actionMenu('allow-trust')">
          <v-list-item-title>Allow Trust</v-list-item-title>
        </v-list-item>
        <v-list-item @click="actionMenu('history')">
          <v-list-item-title>Show History</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <history-dialog :ping="historyDialogPing" :publicKey="publicKey" />
    <show-offers-dialog :ping="showOffersDialogPing" :model="showOffersDialogModel" />
    <save-print-secret-dialog :ping="saveSecretDialogPing" :publicKey="publicKey" />
    <trust-token-dialog :ping="trustDialogPing" :model="trustDialogModel" />
    <send-assets-dialog :ping="sendAssetsDialogPing" :model="sendAssetsDialogModel" />
    <manage-offer-dialog :ping="manageOfferDialogPing" :model="manageOfferDialogModel" />
    <allow-trust-dialog :ping="allowTrustDialogPing" :model="allowTrustDialogModel" />
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
import HistoryDialog from './dialogs/HistoryDialog.vue'

export default {
  props: ['publicKey', 'small'],
  components: {
    ShowOffersDialog,
    SavePrintSecretDialog,
    TrustTokenDialog,
    SendAssetsDialog,
    ManageOfferDialog,
    AllowTrustDialog,
    HistoryDialog
  },
  data() {
    return {
      showOffersDialogPing: false,
      historyDialogPing: false,
      saveSecretDialogPing: false,
      trustDialogPing: false,
      sendAssetsDialogPing: false,
      manageOfferDialogPing: false,
      allowTrustDialogPing: false,
      showOffersDialogModel: new ReusableStellarViewsModel(),
      trustDialogModel: new ReusableStellarViewsModel(),
      sendAssetsDialogModel: new ReusableStellarViewsModel(),
      manageOfferDialogModel: new ReusableStellarViewsModel(),
      allowTrustDialogModel: new ReusableStellarViewsModel()
    }
  },
  methods: {
    actionMenu(id) {
      switch (id) {
        case 'show-offers':
          this.showOffersDialogModel.sourceAccount = StellarAccounts.accountWithPublicKey(
            this.publicKey
          )
          this.showOffersDialogPing = !this.showOffersDialogPing
          break
        case 'save-keys':
          this.saveSecretDialogPing = !this.saveSecretDialogPing
          break
        case 'trust-asset':
          this.trustDialogModel.sourceAccount = StellarAccounts.accountWithPublicKey(
            this.publicKey
          )
          this.trustDialogPing = !this.trustDialogPing
          break
        case 'send-asset':
          this.sendAssetsDialogModel.sourceAccount = StellarAccounts.accountWithPublicKey(
            this.publicKey
          )
          this.sendAssetsDialogPing = !this.sendAssetsDialogPing
          break
        case 'post-offer':
          this.manageOfferDialogModel.sourceAccount = StellarAccounts.accountWithPublicKey(
            this.publicKey
          )
          this.manageOfferDialogPing = !this.manageOfferDialogPing
          break
        case 'allow-trust':
          this.allowTrustDialogModel.sourceAccount = StellarAccounts.accountWithPublicKey(
            this.publicKey
          )
          this.allowTrustDialogPing = !this.allowTrustDialogPing
          break
        case 'history':
          this.historyDialogPing = !this.historyDialogPing
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.small-button {
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.6);

  i {
    font-size: 18px;
  }
}
</style>
