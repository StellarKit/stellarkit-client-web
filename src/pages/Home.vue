<template>
  <div>
    <account-list :items="accountsUI" />
    <instructions-header>
      <div>Content coming soon...</div>
    </instructions-header>
    <div class="top-controls">
      <div class="button-group">
        <v-btn outlined small @click="sendAssetsDialogPing = !sendAssetsDialogPing">Send Asset</v-btn>
        <v-btn
          outlined
          small
          @click="addRemoveSignerDialogPing = !addRemoveSignerDialogPing"
        >Add/Remove Signer</v-btn>

        <v-tooltip open-delay="800" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              outlined
              small
              v-on="on"
              @click="mergeDialogPing = !mergeDialogPing"
            >Merge Accounts</v-btn>
          </template>
          <span>Merges source into destination</span>
        </v-tooltip>

        <v-tooltip open-delay="800" bottom>
          <template v-slot:activator="{ on }">
            <v-btn outlined small v-on="on" @click="trustDialogPing = !trustDialogPing">Trust Token</v-btn>
          </template>
          <span>Account must trust token before it can receive</span>
        </v-tooltip>

        <v-btn outlined small @click="manageOfferDialogPing = !manageOfferDialogPing">Manage Offer</v-btn>
        <v-btn outlined small @click="buyAssetDialogPing = !buyAssetDialogPing">Buy Asset</v-btn>
        <v-btn outlined small @click="showOffersDialogPing = !showOffersDialogPing">Show Offers</v-btn>
        <v-btn outlined small @click="allowTrustDialogPing = !allowTrustDialogPing">Allow Trust</v-btn>

        <v-btn outlined small @click="setDomainPing = !setDomainPing">Set Domain</v-btn>
        <v-btn
          outlined
          small
          @click="setInflationPing = !setInflationPing"
        >Set Inflation Destination</v-btn>
        <v-btn
          outlined
          small
          @click="lookupFederationPing = !lookupFederationPing"
        >Federation Lookup</v-btn>
        <v-btn outlined small @click="manageDataPing = !manageDataPing">Manage Data</v-btn>
        <v-btn outlined small @click="lockAccountDialogPing = !lockAccountDialogPing">Lock Account</v-btn>

        <v-menu offset-y :transition="false">
          <template v-slot:activator="{ on }">
            <v-btn outlined small :ripple="false" v-on="on">
              Ledger Nano
              <v-icon>&#xE5C5;</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="ledgerMenu('info')">
              <v-list-item-title>Display Ledger Info</v-list-item-title>
            </v-list-item>
            <v-list-item @click="ledgerMenu('refill')">
              <v-list-item-title>Boost Testnet Balance</v-list-item-title>
            </v-list-item>
            <v-list-item @click="ledgerMenu('payments')">
              <v-list-item-title>View Payments</v-list-item-title>
            </v-list-item>
            <v-list-item @click="ledgerMenu('operations')">
              <v-list-item-title>View Operations</v-list-item-title>
            </v-list-item>
            <v-list-item @click="ledgerMenu('transactions')">
              <v-list-item-title>View Transactions</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn outlined small @click="saveSecretDialogPing = !saveSecretDialogPing">Save/Print Keys</v-btn>
      </div>
    </div>

    <SavePrintSecretDialog :ping="saveSecretDialogPing" />
    <manage-data-dialog :ping="manageDataPing" :model="manageDataModel" />
    <merge-dialog :ping="mergeDialogPing" :model="mergeDialogModel" />
    <SimpleOperationDialog :ping="setDomainPing" operation="domain" :model="setDomainModel" />
    <SimpleOperationDialog
      :ping="setInflationPing"
      operation="inflation"
      :model="setInflationModel"
    />
    <SimpleOperationDialog
      :ping="lookupFederationPing"
      operation="federation"
      :model="lookupFederationModel"
    />
    <trust-token-dialog :ping="trustDialogPing" :model="trustDialogModel" />
    <AddRemoveSignerDialog :ping="addRemoveSignerDialogPing" :model="addRemoveSignerDialogModel" />
    <send-assets-dialog :ping="sendAssetsDialogPing" :model="sendAssetsDialogModel" />
    <manage-offer-dialog :ping="manageOfferDialogPing" :model="manageOfferDialogModel" />
    <buy-asset-dialog :ping="buyAssetDialogPing" :model="buyAssetDialogModel" />
    <show-offers-dialog :ping="showOffersDialogPing" :model="showOffersDialogModel" />
    <allow-trust-dialog :ping="allowTrustDialogPing" :model="allowTrustDialogModel" />
    <LockAccountDialog :ping="lockAccountDialogPing" :model="lockAccountDialogModel" />
  </div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
import InstructionsHeader from '../components/InstructionsHeader.vue'
import SimpleOperationDialog from '../components/dialogs/SimpleOperationDialog.vue'
import AddRemoveSignerDialog from '../components/dialogs/AddRemoveSignerDialog.vue'
import SendAssetsDialog from '../components/dialogs/SendAssetsDialog.vue'
import MergeDialog from '../components/dialogs/MergeDialog.vue'
import ManageDataDialog from '../components/dialogs/ManageDataDialog.vue'
import TrustTokenDialog from '../components/dialogs/TrustTokenDialog.vue'
import ManageOfferDialog from '../components/dialogs/ManageOfferDialog.vue'
import ShowOffersDialog from '../components/dialogs/ShowOffersDialog.vue'
import LockAccountDialog from '../components/dialogs/LockAccountDialog.vue'
import BuyAssetDialog from '../components/dialogs/BuyAssetDialog.vue'
import AllowTrustDialog from '../components/dialogs/AllowTrustDialog.vue'
import StellarUtils from '../js/StellarUtils.js'
import SavePrintSecretDialog from '../components/dialogs/SavePrintSecretDialog.vue'
import { StellarWallet, LedgerAPI } from 'stellarkit-js-utils'
import ReusableStellarViewsModel from '../components/ReusableStellarViewsModel.js'

export default {
  mixins: [StellarCommonMixin],
  components: {
    AccountList,
    SimpleOperationDialog,
    ManageDataDialog,
    InstructionsHeader,
    SavePrintSecretDialog,
    TrustTokenDialog,
    MergeDialog,
    AddRemoveSignerDialog,
    SendAssetsDialog,
    ManageOfferDialog,
    BuyAssetDialog,
    ShowOffersDialog,
    AllowTrustDialog,
    LockAccountDialog
  },
  data() {
    return {
      manageDataModel: new ReusableStellarViewsModel(),
      mergeDialogModel: new ReusableStellarViewsModel(),
      setDomainModel: new ReusableStellarViewsModel(),
      setInflationModel: new ReusableStellarViewsModel(),
      lookupFederationModel: new ReusableStellarViewsModel(),
      trustDialogModel: new ReusableStellarViewsModel(),
      addRemoveSignerDialogModel: new ReusableStellarViewsModel(),
      sendAssetsDialogModel: new ReusableStellarViewsModel(),
      manageOfferDialogModel: new ReusableStellarViewsModel(),
      buyAssetDialogModel: new ReusableStellarViewsModel(),
      showOffersDialogModel: new ReusableStellarViewsModel(),
      allowTrustDialogModel: new ReusableStellarViewsModel(),
      lockAccountDialogModel: new ReusableStellarViewsModel(),

      lookupFederationPing: false,
      setDomainPing: false,
      setInflationPing: false,
      manageDataPing: false,
      saveSecretDialogPing: false,
      addRemoveSignerDialogPing: false,
      sendAssetsDialogPing: false,
      mergeDialogPing: false,
      trustDialogPing: false,
      manageOfferDialogPing: false,
      buyAssetDialogPing: false,
      showOffersDialogPing: false,
      allowTrustDialogPing: false,
      lockAccountDialogPing: false
    }
  },
  methods: {
    ledgerMenu(id) {
      switch (id) {
        case 'info':
          StellarUtils.displayLedgerInfo()
          break
        case 'refill':
          StellarUtils.sendTestnetXLMToLedger()
          break
        case 'operations':
          StellarUtils.operationsForWallet(
            StellarWallet.ledger(new LedgerAPI())
          )
          break
        case 'payments':
          StellarUtils.paymentsForWallet(StellarWallet.ledger(new LedgerAPI()))
          break
        case 'transactions':
          StellarUtils.transactionsForWallet(
            StellarWallet.ledger(new LedgerAPI())
          )
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../scss/styles.scss';

.top-controls {
  padding: 6px;
}
</style>
