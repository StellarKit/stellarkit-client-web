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
        1 XLM will be sent from your ledger to the new account. This is required to create new accounts on Stellar.
      </li>
      <li>
        Add your ledger as a signer on this new account.
      </li>
      <li>
        Set the 'master' key on the account to 0 disabling the original accounts ability to sign any transactions.
      </li>
      <li>
        This is 'reversible' using the merge account feature below.
      </li>
    </ol>
  </div>
  <div>
    will create a new account, disable the new accounts secret key and will add your Ledger as a signer on the new account. for your ledger account for all operations. Now you can send coins to that account and withdrawl from that account with ease. Your
    ledger's master account is not touched, you are creating a new account that can be signed by your ledger's key. For example, you have a high balance account where you store the majority of your coins and you would like a few smaller balance accounts
    where you can store just a few coins for daily usage.
  </div>
  <v-btn round @click="createNewAccount()">Create New Account for Ledger</v-btn>
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
  props: ['connected'],
  data() {
    return {
      selectedSource: null,
      status: '',
      ledgerAPI: null
    }
  },
  mounted() {
    this.ledgerAPI = new LedgerAPI(!Helper.nodeEnv())
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
      const enabled = false // disabled for now, not tested

      if (this.connected && enabled) {
        let newAccount = null
        const keypair = StellarSdk.Keypair.random()

        Helper.debugLog('creating account...')
        Helper.debugLog(keypair.publicKey())

        StellarAccounts.addAccount(keypair)

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
