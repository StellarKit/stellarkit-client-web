const StellarSdk = require('stellar-sdk')
const $ = require('jquery')
import StellarAccounts from './StellarAccounts.js'
import StellarServer from './StellarServer.js'
import Helper from '../js/helper.js'
import {
  StellarWallet
} from 'stellar-js-utils'

class StellarUtils {
  constructor() {
    this.s = new StellarServer()
  }

  server() {
    return this.s.server()
  }

  friendBotServer() {
    return this.s.friendBotServer()
  }

  lumins() {
    return StellarSdk.Asset.native()
  }

  assetFromObject(object) {
    if (!object.asset_issuer) {
      return StellarSdk.Asset.native()
    }

    return new StellarSdk.Asset(object.asset_code, object.asset_issuer)
  }

  api() {
    return this.s.serverAPI()
  }

  horizonMetrics() {
    return this.api().horizonMetrics()
  }

  accountInfo(publicKey) {
    return this.api().accountInfo(publicKey)
  }

  paths(sourcePublic, destinationPublic, destinationAsset, destinationAmount) {
    return this.api().paths(sourcePublic, destinationPublic, destinationAsset, destinationAmount).call()
  }

  balances(publicKey) {
    return this.api().balances(publicKey)
  }

  mergeAccount(sourceWallet, destKey) {
    return this.api().mergeAccount(sourceWallet, destKey)
  }

  manageOffer(sourceWallet, buying, selling, amount, price, offerID = 0) {
    return this.api().manageOffer(sourceWallet, buying, selling, amount, price, offerID)
  }

  changeTrust(sourceWallet, asset, amount) {
    return this.api().changeTrust(sourceWallet, asset, amount)
  }

  allowTrust(sourceWallet, trustor, asset, authorize) {
    return this.api().allowTrust(sourceWallet, trustor, asset, authorize)
  }

  setDomain(sourceWallet, domain) {
    return this.api().setDomain(sourceWallet, domain)
  }

  // pass 1 for threshold if either account can sign for med/high operations
  makeMultiSig(sourceWallet, publicKey, threshold) {
    return this.api().makeMultiSig(sourceWallet, publicKey, threshold)
  }

  removeMultiSig(sourceWallet, secondSecret, secondPublicKey, transactionOpts) {
    return this.api().removeMultiSig(sourceWallet, secondSecret, secondPublicKey, transactionOpts)
  }

  // get the transaction for later submission
  removeMultiSigTransaction(sourceWallet, secondSecret, secondPublicKey, transactionOpts) {
    return this.api().removeMultiSigTransaction(sourceWallet, secondSecret, secondPublicKey, transactionOpts)
  }

  submitTransaction(transaction) {
    return this.api().submitTransaction(transaction)
  }

  // additionalSigners is an array of StellarWallet (ledger or secret key)
  sendAsset(sourceWallet, destKey, amount, asset = null, memo = null, additionalSigners = null, signWithSource = true) {
    return this.api().sendAsset(sourceWallet, destKey, amount, asset, memo, additionalSigners, signWithSource)
  }

  buyTokens(sourceWallet, sendAsset, destAsset, sendMax, destAmount) {
    return this.api().buyTokens(sourceWallet, sendAsset, destAsset, sendMax, destAmount)
  }

  lockAccount(sourceWallet) {
    return this.api().lockAccount(sourceWallet)
  }

  createAccount(sourceWallet, destinationKey, startingBalance) {
    return this.api().createAccount(sourceWallet, destinationKey, startingBalance)
  }

  setOptions(sourceWallet, options) {
    return this.api().setOptions(sourceWallet, options)
  }

  setFlags(sourceWallet, flags) {
    return this.api().setFlags(sourceWallet, flags)
  }

  clearFlags(sourceWallet, flags) {
    return this.api().clearFlags(sourceWallet, flags)
  }

  setInflationDestination(sourceWallet, inflationDest) {
    return this.api().setInflationDestination(sourceWallet, inflationDest)
  }

  // returns {account: newAccount, keypair: keypair}
  newAccountWithTokens(sourceWallet, amountXLM, asset, amount) {
    let newAccount = null
    const keypair = StellarSdk.Keypair.random()

    Helper.debugLog('creating account...')
    Helper.debugLog(keypair.publicKey())
    Helper.debugLog(keypair.secret())

    const destWallet = StellarWallet.secret(keypair.secret())

    return this.createAccount(sourceWallet, keypair.publicKey(), amountXLM)
      .then((result) => {
        newAccount = result

        Helper.debugLog('setting trust...')
        return this.changeTrust(destWallet, asset, '10000')
      })
      .then((result) => {
        Helper.debugLog('sending tokens...')
        return this.sendAsset(sourceWallet, keypair.publicKey(), amount, asset)
      })
      .then((result) => {
        StellarAccounts.addAccount(keypair)

        Helper.debugLog(result, 'Success')
        this.updateBalances()

        return {
          account: newAccount,
          keypair: keypair
        }
      })
      .catch((error) => {
        Helper.debugLog(error, 'Error')
        throw error
      })
  }

  createTestAccount(name = null) {
    return new Promise((resolve, reject) => {
      const keyPair = StellarSdk.Keypair.random()

      const accountRec = StellarAccounts.addAccount(keyPair, name)

      const url = 'https://horizon-testnet.stellar.org/friendbot' + '?addr=' + keyPair.publicKey()

      $.get(url, (data) => {
        // refresh balance on just this account
        // asking same server as friendbot assuming our node might not be 100% synced?
        this.friendBotServer().loadAccount(keyPair.publicKey())
          .then((account) => {
            account.balances.forEach((balance) => {
              if (balance.asset_type === 'native') {
                accountRec.XLM = balance.balance
              } else {
                accountRec[balance.asset_code] = balance.balance
              }
            })

            StellarAccounts.replaceAccountWithPublicKey(accountRec, accountRec.publicKey)

            resolve(accountRec)
          })
          .catch((error) => {
            console.log(JSON.stringify(data))

            // delete the account friend bot failed
            StellarAccounts.replaceAccountWithPublicKey(null, accountRec.publicKey)

            reject(error)
          })
      }, 'json').fail((err) => {
        reject(err)
      })
    })
  }

  updateBalances(logSuccess = false) {
    for (let i = 0; i < StellarAccounts.accounts().length; i++) {
      const publicKey = StellarAccounts.publicKey(i)

      this.balances(publicKey)
        .then((balanceObject) => {
          for (const key in balanceObject) {
            StellarAccounts.updateBalance(i, key, balanceObject[key])
          }

          if (logSuccess) {
            Helper.debugLog(publicKey, 'Success')
          }

          return null
        })
        .catch((error) => {
          StellarAccounts.updateBalance(i, 'XLM', 'ERROR')

          Helper.debugLog(error, 'Error')
        })
    }
  }
}

const instance = new StellarUtils()
Object.freeze(instance)

export default instance
