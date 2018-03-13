<template>
<div>
  <account-list :items="accountsUI"  />
  <instructions-header>
    <div>1. Create accounts on the testnet</div>
    <div>2. Some buttons require setting source/destination accounts before clicking</div>
    <div>3. Create a token on the second tab first to use the token buttons</div>
  </instructions-header>
  <div class='top-controls'>
    <div class='button-group'>
      <v-btn round small @click="makeSelectedPayment()">Pay</v-btn>
      <v-btn round small @click="addRemoveSigner()">Add/Remove Signer</v-btn>

      <v-tooltip open-delay='800' bottom>
        <v-btn round small slot='activator' @click="mergeSelected()">Merge Accounts</v-btn>
        <span>Merges source into destination</span>
      </v-tooltip>

      <v-tooltip open-delay='800' bottom>
        <v-btn round small slot='activator' @click="trustToken()">Trust Token</v-btn>
        <span>Account must trust token before it can receive</span>
      </v-tooltip>

      <v-btn round small @click="setDomain()">Set Domain</v-btn>
      <v-btn round small @click="setInflation()">Set Inflation Destination</v-btn>
      <v-btn round small @click="testFederation()">Federation Lookup</v-btn>
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
import StellarUtils from '../js/StellarUtils.js'
import SavePrintSecretDialog from '../components/dialogs/SavePrintSecretDialog.vue'
import Helper from '../js/helper.js'
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
    'send-assets-dialog': SendAssetsDialog
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
      trustDialogPing: false
    }
  },
  mounted() {
    StellarUtils.updateBalances()
  },
  methods: {
    testFederation() {
      this.lookupFederationPing = !this.lookupFederationPing
    },
    setDomain() {
      this.setDomainPing = !this.setDomainPing
    },
    setInflation() {
      this.setInflationPing = !this.setInflationPing
    },
    mergeSelected() {
      this.mergeDialogPing = !this.mergeDialogPing
    },
    addRemoveSigner() {
      this.addRemoveSignerDialogPing = !this.addRemoveSignerDialogPing
    },
    trustToken() {
      this.trustDialogPing = !this.trustDialogPing
    },
    makeSelectedPayment() {
      this.sendAssetsDialogPing = !this.sendAssetsDialogPing
    },
    operationsForSelectedSource() {
      const ledgerWallet = StellarWallet.ledger(new LedgerAPI())

      ledgerWallet.publicKey()
        .then((publicKey) => {
          StellarUtils.server().operations()
            .forAccount(publicKey)
            .order('desc')
            .call()
            .then((response) => {
              Helper.debugLog(response)
            })
            .catch((error) => {
              Helper.debugLog(error, 'Error')
              Helper.toast('Error', true)
            })
        })
    },
    paymentsForSelectedSource() {
      const ledgerWallet = StellarWallet.ledger(new LedgerAPI())

      ledgerWallet.publicKey()
        .then((publicKey) => {
          StellarUtils.server().payments()
            .forAccount(publicKey)
            .order('desc')
            .call()
            .then((response) => {
              Helper.debugLog(response)
            })
            .catch((error) => {
              Helper.debugLog(error, 'Error')
              Helper.toast('Error', true)
            })
        })
    },
    transactionsForSelectedSource() {
      const ledgerWallet = StellarWallet.ledger(new LedgerAPI())

      ledgerWallet.publicKey()
        .then((publicKey) => {
          StellarUtils.server().transactions()
            .forAccount(publicKey)
            .order('desc')
            .call()
            .then((response) => {
              Helper.debugLog(response)
            })
            .catch((error) => {
              Helper.debugLog(error, 'Error')
              Helper.toast('Error', true)
            })
        })
    },
    ledgerMenu(id) {
      switch (id) {
        case 'info':
          StellarUtils.displayLedgerInfo()
          break
        case 'refill':
          StellarUtils.sendTestnetXLMToLedger()
          break
        case 'operations':
          this.operationsForSelectedSource()
          break
        case 'payments':
          this.paymentsForSelectedSource()
          break
        case 'transactions':
          this.transactionsForSelectedSource()
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
