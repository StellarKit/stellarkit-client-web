<template>
<div>
  <div>
    Create an additional Stellar account that can be controlled by your Ledger. You don't need multiple Ledgers to create multipe Stellar accounts! You also don't have to worry about keeping an additional secret keys safe.
  </div>
  <div> This feature will:
    <ol>
      <li>
        Create a new account.
      </li>
      <li>
        2 XLM will be sent from your ledger to the new account. This is required to create new accounts on Stellar.
      </li>
      <li>
        Add your ledger as a signer on this new account.
      </li>
      <li>
        Set the 'master' key on the account to 0 disabling the original accounts ability to sign any transactions.
      </li>
      <li>
        This is 'reversible' using the merge account feature.
      </li>
    </ol>
  </div>
  <div>
    will create a new account, disable the new accounts secret key and will add your Ledger as a signer on the new account. for your ledger account for all operations. Now you can send coins to that account and withdrawl from that account with ease. Your
    ledger's master account is not touched, you are creating a new account that can be signed by your ledger's key. For example, you have a high balance account where you store the majority of your coins and you would like a few smaller balance accounts
    where you can store just a few coins for daily usage.
  </div>
  <v-btn round @click="createNewAccount()">Create New Account for Ledger</v-btn>
  <div>
    Now you can test it on the Home tab. First create a new account or use an existing account and send 100 XLM to this new account created. Now select the new account as the source and send XLM back to the account, but click Pay With Signers. It will ask
    you to confirm on your Ledger, and then the payment will go through. The source account isn't signing this transaction, only the ledger.
  </div>

  <div>{{status}}</div>
</div>
</template>

<script>
import Helper from '../js/helper.js'
import StellarAccounts from '../js/StellarAccounts.js'
import StellarUtils from '../js/StellarUtils.js'
const StellarSdk = require('stellar-sdk')
import {
  StellarWallet,
  LedgerAPI
} from 'stellar-js-utils'

export default {
  data() {
    return {
      selectedSource: null,
      status: '',
      ledgerAPI: null
    }
  },
  mounted() {
    this.ledgerAPI = new LedgerAPI()
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
    createNewAccount() {
      const enabled = true // disabled for now, not tested

      if (enabled) {
        let newAccount = null
        const keypair = StellarSdk.Keypair.random()

        Helper.debugLog('creating account...')
        Helper.debugLog(keypair.publicKey())

        StellarAccounts.addAccount(keypair, null, true)

        const newWallet = StellarWallet.secret(keypair.secret())
        const ledgerWallet = StellarWallet.ledger(this.ledgerAPI, () => {
          this.status = 'Confirm transaction on Nano...'
        })

        Helper.debugLog('Confirm transaction on Nano...')
        return StellarUtils.createAccount(ledgerWallet, keypair.publicKey(), '2') // .5 for multisig
          .then((result) => {
            newAccount = result

            Helper.debugLog('getting ledgers public key...')
            return ledgerWallet.publicKey()
          })
          .then((ledgerPublicKey) => {
            Helper.debugLog('making multisig...')
            return StellarUtils.makeMultiSig(newWallet, ledgerPublicKey, 1)
          })
          .then((result) => {
            Helper.debugLog('locking account...')
            return StellarUtils.lockAccount(newWallet, ledgerWallet)
          })
          .then((result) => {
            Helper.debugLog(result, 'Success')
            StellarUtils.updateBalances()

            return {
              account: newAccount,
              keypair: keypair
            }
          })
          .catch((error) => {
            Helper.debugLog(error, 'Error')
            // StellarAccounts.deleteAccount(keypair.publicKey())
            throw error
          })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
// ddd
</style>
