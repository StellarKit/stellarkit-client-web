<template>
<div>
  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />
  <instructions-header>
    <div class='instructions'>
      <div>
        Many ICOs require a lock-up period for assets after they are sold, even if just for the duration of the public sale. While there are various ways to achieve this in Stellar, we recommend using a multisig escrow account.
      </div>

      <div>
        We recommend using a multisig escrow account. To implement this, rather than directly sending sold assets to the buyer, they are placed in an account with two signees: the buyer and the issuer. Together, they sign a time-locked transaction to remove the
        issuer as a signer at a predetermined time. Both the buyer and the issuer will retain a copy of this transaction, which can be submitted to the network by any party after the lockup period.
      </div>

      <div>
        This mechanism provides assurance to the buyer that the tokens will indeed be unlocked after the unlock period.
      </div>

      <div>
        <strong>Note:</strong> The AUTH REVOCABLE flag is a <strong>problematic</strong> mechanism because it does not provide the user any guarantees with regard to when or if the assets will be unlocked.
      </div>
    </div>
  </instructions-header>

  <div class='top-controls'>
    <v-btn round small @click="createAccountWithLockedTokens()">Create Account with Locked Tokens</v-btn>

    <div class='address-box'>
      <v-select :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source account" autocomplete return-object max-height="600"></v-select>
    </div>
    <div class='button-group'>
      <v-btn round small @click="createUnlockTransaction()">Create Unlock Transaction</v-btn>
      <v-btn round small @click="viewTransaction()">View Transaction</v-btn>
      <v-btn round small @click="submitTransaction()">Submit Transaction</v-btn>
    </div>
  </div>

  <transaction-dialog :ping='dialogPing' :transaction='signedTransaction' />
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
import TransactionDialog from '../components/dialogs/TransactionDialog.vue'
import Helper from '../js/helper.js'
import StellarAccounts from '../js/StellarAccounts.js'
import StellarUtils from '../js/StellarUtils.js'
const StellarSdk = require('stellar-sdk')
import {
  StellarWallet
} from 'stellar-js-utils'
import InstructionsHeader from '../components/InstructionsHeader.vue'

export default {
  mixins: [StellarCommonMixin],
  components: {
    'account-list': AccountList,
    'transaction-dialog': TransactionDialog,
    'instructions-header': InstructionsHeader
  },
  data() {
    return {
      selectedSource: null,
      signedTransaction: null,
      dialogPing: false
    }
  },
  mounted() {
    StellarUtils.updateBalances()
  },
  methods: {
    sourceValid() {
      const result = this.selectedSource ? this.selectedSource.publicKey : null

      if (Helper.strlen(result) > 0) {
        return true
      }

      Helper.debugLog('please select a source account', 'Error')
      return false
    },
    submitTransaction() {
      if (this.signedTransaction) {
        const envelope = StellarSdk.xdr.TransactionEnvelope.fromXDR(this.signedTransaction, 'base64')
        const transaction = new StellarSdk.Transaction(envelope)

        StellarUtils.submitTransaction(transaction)
          .then((response) => {
            Helper.debugLog(response)

            return null
          })
          .catch((error) => {
            Helper.debugLog(error)
          })
      } else {
        Helper.debugLog('No transactions available')
      }
    },
    viewTransaction() {
      if (this.signedTransaction) {
        this.dialogPing = !this.dialogPing
        Helper.debugLog(this.signedTransaction)
      } else {
        Helper.debugLog('No transactions available')
      }
    },
    timeFromNow(secondsAhead = 0) {
      return secondsAhead + Math.round((new Date()).getTime() / 1000)
    },
    printTimeStamp() {
      function convertUNIXTimestampToTime(timestamp) {
        const time = new Date(timestamp * 1000)
        return time.toGMTString() + '\n' + time.toLocaleTimeString()
      }

      Helper.debugLog(convertUNIXTimestampToTime(this.timeFromNow()))
    },
    createUnlockTransaction() {
      const distributorAccount = this.distributorAccount()

      if (distributorAccount && this.sourceValid()) {
        const seconds = 10

        const transactionOpts = {
          timebounds: {
            minTime: this.timeFromNow(seconds).toString(),
            maxTime: '0' // crashes without this
          }
        }

        // using source account instead of distributor, sequence numbers would be different in the future
        StellarUtils.removeMultiSigTransaction(StellarWallet.secret(this.selectedSource.secret), StellarWallet.secret(distributorAccount.secret), transactionOpts)
          .then((transaction) => {
            this.signedTransaction = transaction.toEnvelope().toXDR('base64')
            Helper.debugLog(this.signedTransaction, 'Success')

            Helper.debugLog('You can submit the transaction in ' + seconds + ' seconds')
            Helper.toast('Transaction valid in ' + seconds + ' seconds')

            return transaction
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      }
    },
    createAccountWithLockedTokens() {
      const distributorAccount = this.distributorAccount()

      if (distributorAccount) {
        const distributorWallet = StellarWallet.secret(distributorAccount.secret)
        StellarUtils.newAccountWithTokens(distributorWallet, distributorWallet, '3', StellarAccounts.lamboTokenAsset(), '12')
          .then((result) => {
            // result is {account: newAccount, keypair: keypair}
            Helper.debugLog(result.account)

            // select account in UI
            // this.selectedSource = StellarAccounts.accountWithPublicKey(result.keypair.publicKey())

            Helper.debugLog('adding distributor as signer...')

            return StellarUtils.makeMultiSig(StellarWallet.secret(result.keypair.secret()), distributorAccount.publicKey)
          })
          .then((result) => {
            Helper.debugLog('Account is ready', 'Success')
            Helper.toast('Account is ready')

            return result
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
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
    div.input-group {
        margin-right: 16px;
    }
}

.instructions {
    div {
        margin-bottom: 12px;
        line-height: 1;
    }
}
</style>
