<template>
<div>
  <div class='top-controls'>
    <div class='instructions'>
      <div>
        Lock-up Period for Tokens
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
        Note: Avoid using AUTH REVOCABLE. In the past, some ICOs have used the AUTH REVOCABLE flag in order to impose lock-up periods. This is a problematic mechanism because it does not provide the user any guarantees with regard to when or if the assets will
        be unlocked.
      </div>
    </div>

    <v-btn small @click="createAccountWithLockedTokens()">Create Account with Locked Tokens</v-btn>
    <v-btn small @click="viewTransaction()">View Transaction</v-btn>
    <v-btn small @click="submitTransaction()">Submit Transaction</v-btn>

    <div class='address-box'>
      <v-select :items="accountsUI" item-text='name' v-model="selectedSource" label="Source accout" autocomplete return-object max-height="600"></v-select>
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
    this.su.updateBalances()
  },
  methods: {
    sourceValid() {
      const result = this.selectedSource ? this.selectedSource.publicKey : null

      if (Helper.strlen(result) > 0) {
        return true
      }
      return false
    },
    submitTransaction() {
      if (this.signedTransaction) {
        Helper.debugLog(this.signedTransaction)
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
    createAccountWithLockedTokens() {
      const distributorAccount = this.distributorAccount()

      if (distributorAccount) {
        this.su.newAccountWithTokens(distributorAccount.secret, '3', StellarAccounts.lamboTokenAsset(), '12')
          .then((result) => {
            // result is {account: newAccount, keypair: keypair}
            Helper.debugLog(result.account)

            Helper.debugLog('adding distributor as signer...')

            return this.su.makeMultiSig(result.keypair.secret(), distributorAccount.publicKey)
          })
          .then((result) => {
            Helper.debugLog('Account is ready', 'Success')

            return result
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')

            throw error
          })
      }
    },
    removeSigner() {
      // let timebounds = {
      //   minTime: "1455287522",
      //   maxTime: "1455297545"
      // }
      //
      // const transaction = new StellarSdk.TransactionBuilder(account)
      //   .addOperation(StellarSdk.Operation.createAccount(options))
      //   .build()
      //
      // transaction.sign(sourceKeys)
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
        max-width: 800px;
    }
}
</style>
