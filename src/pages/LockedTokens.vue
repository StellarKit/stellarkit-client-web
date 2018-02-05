<template>
<div>
  <div class='top-controls'>
    <div class='instructions'>
      <div>
        <strong>Lock-up Period for Tokens</strong>
      </div>

      <div>
        Many ICOs require a lock-up period for assets after they are sold, even if just for the duration of the public sale. While there are various ways to achieve this in Stellar, we recommend using a multisig escrow account.
      </div>

      <div>
        In this scenario, rather than directly sending sold assets to the buyer, they are placed in an account with two signees: the buyer and the issuer. Together, they sign a time-locked transaction to remove the issuer as a signer at a predetermined time.
        Both the buyer and the issuer will retain a copy of this transaction, which can be submitted to the network by any party after the lockup period.
      </div>

      <div>
        This mechanism provides assurance to the buyer that the tokens will indeed be unlocked after the unlock period.
      </div>

      <div>
        <strong>Note:</strong> Avoid using AUTH REVOCABLE. In the past, some ICOs have used the AUTH REVOCABLE flag in order to impose lock-up periods. This is a problematic mechanism because it does not provide the user any guarantees with regard to
        when or if the assets will be unlocked.
      </div>
    </div>

    <v-btn small @click="createAccountWithLockedTokens()">Create Account with Locked Tokens</v-btn>
    <v-btn small @click="createUnlockTransaction()">Create Unlock Transaction</v-btn>
    <v-btn small @click="viewTransaction()">View Transaction</v-btn>
    <v-btn small @click="submitTransaction()">Submit Transaction</v-btn>
    <v-btn small @click="printTimeStamp()">test</v-btn>

    <div class='address-box'>
      <v-select :items="accountsUI" item-text='name' v-model="selectedSource" clearable label="Source accout" autocomplete return-object max-height="600"></v-select>
    </div>
  </div>

  <account-list :items="accountsUI" v-on:click-item="clickAccount" v-on:delete-item="deleteAccount" />
</div>
</template>

<script>
import StellarCommonMixin from '../components/StellarCommonMixin.js'
import AccountList from '../components/AccountList.vue'
import Helper from '../js/helper.js'
import StellarAccounts from '../js/StellarAccounts.js'
import StellarUtils from '../js/StellarUtils.js'

export default {
  mixins: [StellarCommonMixin],
  components: {
    'account-list': AccountList
  },
  data() {
    return {
      selectedSource: null,
      signedTransaction: null
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
        Helper.debugLog(this.signedTransaction)

        StellarUtils.submitTransaction(this.signedTransaction)
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
        const transactionOpts = {
          timebounds: {
            minTime: this.timeFromNow(20)
          }
        }

        // using source account instead of distributor, sequence numbers would be different in the future
        StellarUtils.removeMultiSigTransaction(this.selectedSource.secret, distributorAccount.secret, this.selectedSource.publicKey, transactionOpts)
          .then((result) => {
            Helper.debugLog(result, 'Success')

            this.signedTransaction = result

            return result
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
          })
      }
    },
    createAccountWithLockedTokens() {
      const distributorAccount = this.distributorAccount()

      if (distributorAccount) {
        StellarUtils.newAccountWithTokens(distributorAccount.secret, '3', StellarAccounts.lamboTokenAsset(), '12')
          .then((result) => {
            // result is {account: newAccount, keypair: keypair}
            Helper.debugLog(result.account)

            Helper.debugLog('adding distributor as signer...')

            return StellarUtils.makeMultiSig(result.keypair.secret(), distributorAccount.publicKey)
          })
          .then((result) => {
            Helper.debugLog('Account is ready', 'Success')

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
.top-controls {
    padding: 20px;
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
    }
}
</style>
