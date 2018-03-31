<template>
<div>
  <account-list :items="accountsUI" />
  <instructions-header>
    <div>Content coming soon...</div>
  </instructions-header>
  <div class='top-controls'>
    <div class='button-group'>
      <v-btn round small @click="sendAssetsDialogPing = !sendAssetsDialogPing">Send Asset</v-btn>
      <v-btn round small @click="addRemoveSignerDialogPing = !addRemoveSignerDialogPing">Add/Remove Signer</v-btn>

      <v-tooltip open-delay='800' bottom>
        <v-btn round small slot='activator' @click="mergeDialogPing = !mergeDialogPing">Merge Accounts</v-btn>
        <span>Merges source into destination</span>
      </v-tooltip>

      <v-tooltip open-delay='800' bottom>
        <v-btn round small slot='activator' @click="trustDialogPing = !trustDialogPing">Trust Token</v-btn>
        <span>Account must trust token before it can receive</span>
      </v-tooltip>

      <v-btn round small @click="manageOfferDialogPing = !manageOfferDialogPing">Manage Offer</v-btn>
      <v-btn round small @click="buyAssetDialogPing = !buyAssetDialogPing">Buy Asset</v-btn>
      <v-btn round small @click="showOffersDialogPing = !showOffersDialogPing">Show Offers</v-btn>

      <v-btn round small @click="setDomainPing = !setDomainPing">Set Domain</v-btn>
      <v-btn round small @click="setInflationPing = !setInflationPing">Set Inflation Destination</v-btn>
      <v-btn round small @click="lookupFederationPing = !lookupFederationPing">Federation Lookup</v-btn>
      <v-btn round small @click="manageDataPing = !manageDataPing">Manage Data</v-btn>

      <v-menu offset-y :transition=false>
        <v-btn round small :ripple=false slot="activator">
          Ledger Nano
          <v-icon>&#xE5C5;</v-icon>
        </v-btn>
        <v-list dense>
          <v-list-tile @click="ledgerMenu('info')">
            <v-list-tile-title>Display Ledger Info</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="ledgerMenu('refill')">
            <v-list-tile-title>Boost Testnet Balance</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="ledgerMenu('payments')">
            <v-list-tile-title>View Payments</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="ledgerMenu('operations')">
            <v-list-tile-title>View Operations</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="ledgerMenu('transactions')">
            <v-list-tile-title>View Transactions</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn round small @click="saveSecretDialogPing = !saveSecretDialogPing">Save/Print Keys</v-btn>
    </div>
  </div>

  <save-secret-dialog :ping='saveSecretDialogPing' />
  <manage-data-dialog :ping='manageDataPing' />
  <merge-dialog :ping='mergeDialogPing' />
  <simple-dialog :ping='setDomainPing' operation='domain' />
  <simple-dialog :ping='setInflationPing' operation='inflation' />
  <simple-dialog :ping='lookupFederationPing' operation='federation' />
  <trust-token-dialog :ping='trustDialogPing' />
  <add-remove-signer :ping='addRemoveSignerDialogPing' />
  <send-assets-dialog :ping='sendAssetsDialogPing' />
  <manage-offer-dialog :ping='manageOfferDialogPing' />
  <buy-asset-dialog :ping='buyAssetDialogPing' />
  <show-offers-dialog :ping='showOffersDialogPing' />
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
import ManageOfferTwoDialog from '../components/dialogs/ManageOfferTwoDialog.vue'
import ShowOffersDialog from '../components/dialogs/ShowOffersDialog.vue'
import BuyAssetDialog from '../components/dialogs/BuyAssetDialog.vue'
import StellarUtils from '../js/StellarUtils.js'
import SavePrintSecretDialog from '../components/dialogs/SavePrintSecretDialog.vue'
import {
  StellarWallet,
  LedgerAPI
} from 'stellar-js-utils'

export default {
  mixins: [StellarCommonMixin],
  components: {
    'account-list': AccountList,
    'simple-dialog': SimpleOperationDialog,
    'manage-data-dialog': ManageDataDialog,
    'instructions-header': InstructionsHeader,
    'save-secret-dialog': SavePrintSecretDialog,
    'trust-token-dialog': TrustTokenDialog,
    'merge-dialog': MergeDialog,
    'add-remove-signer': AddRemoveSignerDialog,
    'send-assets-dialog': SendAssetsDialog,
    'manage-offer-dialog': ManageOfferTwoDialog,
    'buy-asset-dialog': BuyAssetDialog,
    'show-offers-dialog': ShowOffersDialog
  },
  data() {
    return {
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
      showOffersDialogPing: false
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
          StellarUtils.operationsForWallet(StellarWallet.ledger(new LedgerAPI()))
          break
        case 'payments':
          StellarUtils.paymentsForWallet(StellarWallet.ledger(new LedgerAPI()))
          break
        case 'transactions':
          StellarUtils.transactionsForWallet(StellarWallet.ledger(new LedgerAPI()))
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
    padding: 10px 20px;
}

.address-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 16px;
    div.input-group {
        flex: 1 0 200px;
        margin-right: 16px;
    }
}
</style>
