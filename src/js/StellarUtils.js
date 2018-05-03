const StellarSdk = require('stellar-sdk')
import StellarAccounts from './StellarAccounts.js'
import StellarServer from './StellarServer.js'
import Helper from '../js/helper.js'
import {
  StellarWallet,
  LedgerAPI
} from 'stellar-js-utils'
import axios from 'axios'

class StellarUtils {
  constructor() {
    this.s = new StellarServer()

    Helper.vue().$on('stellar-network-updated', () => {
      this.updateBalances()
    })

    // AccountManger isn't ready, so delay a bit for first call
    setTimeout(() => {
      this.updateBalances()
    }, 500)

    this.vars = {}
  }

  server() {
    return this.s.server()
  }

  isTestnet() {
    return this.s.isTestnet()
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

  balances(sourceWallet) {
    return this.api().balances(sourceWallet)
  }

  manageData(sourceWallet, fundingWallet, name, value, additionalSigners = null) {
    return this.api().manageData(sourceWallet, fundingWallet, name, value, additionalSigners)
  }

  mergeAccount(sourceWallet, destWallet) {
    return this.api().mergeAccount(sourceWallet, destWallet)
  }

  manageOffer(sourceWallet, fundingWallet, buying, selling, amount, price, offerID = 0) {
    return this.api().manageOffer(sourceWallet, fundingWallet, buying, selling, amount, price, offerID)
  }

  changeTrust(sourceWallet, fundingWallet, asset, amount) {
    return this.api().changeTrust(sourceWallet, fundingWallet, asset, amount)
  }

  allowTrust(sourceWallet, destWallet, asset, authorize, fundingWallet = null) {
    return this.api().allowTrust(sourceWallet, destWallet, asset, authorize, fundingWallet)
  }

  setDomain(sourceWallet, domain, fundingWallet = null, additionalSigners = null) {
    return this.api().setDomain(sourceWallet, domain, fundingWallet, additionalSigners)
  }

  // pass 1 for threshold if either account can sign for med/high operations
  makeMultiSig(sourceWallet, secondWallet, fundingWallet, threshold) {
    return this.api().makeMultiSig(sourceWallet, secondWallet, fundingWallet, threshold)
  }

  removeMultiSig(sourceWallet, secondWallet, transactionOpts) {
    return this.api().removeMultiSig(sourceWallet, secondWallet, transactionOpts)
  }

  // get the transaction for later submission
  removeMultiSigTransaction(sourceWallet, secondWallet, transactionOpts) {
    return this.api().removeMultiSigTransaction(sourceWallet, secondWallet, transactionOpts)
  }

  submitTransaction(transaction) {
    return this.api().submitTransaction(transaction)
  }

  // additionalSigners is an array of StellarWallet (ledger or secret key)
  sendAsset(sourceWallet, fundingWallet, destWallet, amount, asset = null, memo = null, additionalSigners = null) {
    return this.api().sendAsset(sourceWallet, fundingWallet, destWallet, amount, asset, memo, additionalSigners)
  }

  sendAssetBatch(sourceWallet, fundingWallet, destWallets, amount, asset = null, memo = null, additionalSigners = null) {
    return this.api().sendAssetBatch(sourceWallet, fundingWallet, destWallets, amount, asset, memo, additionalSigners)
  }

  buyTokens(sourceWallet, sendAsset, destAsset, sendMax, destAmount, fundingWallet = null, additionalSigners = null) {
    return this.api().buyTokens(sourceWallet, sendAsset, destAsset, sendMax, destAmount, fundingWallet, additionalSigners)
  }

  // preset is 'lock' or 'low' - low allows allowTrust, lock locks everything
  lockAccount(sourceWallet, preset, fundingWallet = null, additionalSigners = null) {
    return this.api().lockAccount(sourceWallet, preset, fundingWallet, additionalSigners)
  }

  createAccount(sourceWallet, newWallet, startingBalance) {
    return this.api().createAccount(sourceWallet, newWallet, startingBalance)
  }

  setOptions(sourceWallet, options, fundingWallet = null, additionalSigners = null) {
    return this.api().setOptions(sourceWallet, options, fundingWallet, additionalSigners)
  }

  setFlags(sourceWallet, flags, fundingWallet = null, additionalSigners = null) {
    return this.api().setFlags(sourceWallet, flags, fundingWallet, additionalSigners)
  }

  clearFlags(sourceWallet, flags, fundingWallet = null, additionalSigners = null) {
    return this.api().clearFlags(sourceWallet, flags, fundingWallet, additionalSigners)
  }

  setInflationDestination(sourceWallet, inflationDest, fundingWallet = null, additionalSigners = null) {
    return this.api().setInflationDestination(sourceWallet, inflationDest, fundingWallet, additionalSigners)
  }

  // returns {account: newAccount, keypair: keypair}
  newAccount(sourceWallet, startingBalance, name = null, tag = null) {
    const keypair = StellarSdk.Keypair.random()

    Helper.debugLog('creating account...')
    Helper.debugLog(keypair.publicKey())
    Helper.debugLog(keypair.secret())

    const accountRec = StellarAccounts.addAccount(keypair, name, tag)

    return this.createAccount(sourceWallet, StellarWallet.secret(keypair.secret()), startingBalance)
      .then((account) => {
        return {
          account: account,
          keypair: keypair,
          accountRec: accountRec
        }
      })
      .catch((error) => {
        StellarAccounts.deleteAccount(keypair.publicKey())

        throw error
      })
  }

  deleteOffers(sourceWallet) {
    if (sourceWallet) {
      Helper.debugLog('Deleting Offers...')

      sourceWallet.publicKey()
        .then((pubicKey) => {
          this.server().offers('accounts', pubicKey)
            .call()
            .then((response) => {
              let nextPromise = Promise.resolve()

              for (const offer of response.records) {
                nextPromise = nextPromise.then(() => {
                  const buying = this.assetFromObject(offer.buying)
                  const selling = this.assetFromObject(offer.selling)

                  return this.manageOffer(sourceWallet, null, buying, selling, '0', offer.price_r, offer.id)
                })
              }

              return nextPromise
            })
            .then((result) => {
              Helper.debugLog('Deleted all offers', 'Success')
              this.updateBalances()

              return null
            })
        })
    }
  }

  // returns {account: newAccount, keypair: keypair}
  newAccountWithTokens(fundingWallet, sourceWallet, startingBalance, asset, amount, accountName = null, accountTag = null, issuerWallet = null) {
    let info = null
    let newWallet = null

    let newAccountSourceWallet = sourceWallet
    if (fundingWallet) {
      newAccountSourceWallet = fundingWallet
    }

    return this.newAccount(newAccountSourceWallet, startingBalance, accountName, accountTag)
      .then((result) => {
        info = result

        newWallet = StellarWallet.secret(info.keypair.secret())

        const trustLimit = 100000000000

        Helper.debugLog('setting trust...')
        return this.changeTrust(newWallet, fundingWallet, asset, String(trustLimit))
          .then(() => {
            if (issuerWallet) {
              Helper.debugLog('Allow trust...')
              return this.allowTrust(issuerWallet, newWallet, asset, true, fundingWallet)
                .then(() => {
                  return null
                })
                .catch(() => {
                  Helper.debugLog('Allow trust was not necessary, continuing...')

                  return null
                })
            }

            return null
          })
      })
      .then(() => {
        Helper.debugLog('sending tokens...')
        return this.sendAsset(sourceWallet, fundingWallet, newWallet, amount, asset)
      })
      .then((result) => {
        Helper.debugLog(result, 'Success')
        this.updateBalances()

        return info
      })
  }

  displayLedgerInfo() {
    const fundingWallet = StellarWallet.ledger(new LedgerAPI())
    fundingWallet.publicKey()
      .then((publicKey) => {
        return this.api().accountInfo(publicKey)
      })
      .then((info) => {
        Helper.debugLog(info)
      })
      .catch((error) => {
        Helper.debugLog(error, 'Error')
        Helper.toast('Error', true)
      })
  }

  sendTestnetXLMToLedger() {
    Helper.debugLog('refilling ledger...')

    const fundingWallet = StellarWallet.ledger(new LedgerAPI(), () => {
      Helper.toast('Confirm transaction on Ledger Nano')
    })

    let ledgerPublicKey

    fundingWallet.publicKey()
      .then((publicKey) => {
        ledgerPublicKey = publicKey

        return this.accountInfo(publicKey)
      })
      .then((account) => {
        // account exists, so friendbot will just fail, do the merge
        const keyPair = StellarSdk.Keypair.random()

        const url = 'https://friendbot.stellar.org' + '?addr=' + keyPair.publicKey()
        return axios.get(url)
          .then((data) => {
            Helper.debugLog(data, 'Success')

            return this.mergeAccount(StellarWallet.secret(keyPair.secret()), fundingWallet)
          })
          .then(() => {
            Helper.toast('Testnet XLM added to your Ledger!')
          })
          .catch((err) => {
            Helper.debugLog(err, 'Error')
            Helper.toast('Error!', true)
          })
      })
      .catch(() => {
        Helper.debugLog('Account doesn\'t exist, asking friendbot for help.')

        // account doesn't exist, so ask friendbot to create it
        const url = 'https://friendbot.stellar.org' + '?addr=' + ledgerPublicKey
        return axios.get(url)
      })
      .then((info) => {
        Helper.debugLog(info)
        Helper.toast('Testnet XLM added to your Ledger!')
      })
  }

  // Public Key    GBW74UVOXKGHO3WX6AV5ZGTB4JYBKCEJOUQAUSI25NRO3PKY5BC7WYZS
  // Secret Key    SA3W53XXG64ITFFIYQSBIJDG26LMXYRIMEVMNQMFAQJOYCZACCYBA34L

  // SDNWCD4F63WBLU3E2QANDMVR3KLW6D5KBBENQSLSGC62X3PCHFMZQWHU
  // GCFJ3JX6P5UZFABESJRZXNN2TH4UV67RGD5ECNTDUGPMIRQTFABXWWXV

  doCreateTestAccount(name = null) {
    const sourceWallet = StellarWallet.secret('SDNWCD4F63WBLU3E2QANDMVR3KLW6D5KBBENQSLSGC62X3PCHFMZQWHU')
    return this.newAccount(sourceWallet, '1000', name)
      .then((result) => {
        this.updateBalances()
        Helper.debugLog(result.account, 'Success')

        return result.accountRec
      })
      .catch((error) => {
        Helper.debugLog(error, 'Error')

        // failed, try friendbot as a backup
        return this.createTestAccountFriendBot(name)
      })
  }

  createTestAccount(name = null) {
    // we need this to run synchronously so that sequence numbers don't get out of sync
    if (!this.vars.syncPromise) {
      this.vars.syncPromise = Promise.resolve()
    }

    const result = this.vars.syncPromise.then(() => {
      return this.doCreateTestAccount(name)
    })

    this.vars.syncPromise = result

    return result
  }

  createTestAccountFriendBot(name = null) {
    const keyPair = StellarSdk.Keypair.random()
    const accountRec = StellarAccounts.addAccount(keyPair, name)

    const url = 'https://friendbot.stellar.org' + '?addr=' + keyPair.publicKey()
    return axios.get(url)
      .then((info) => {
        Helper.debugLog(info, 'Success')

        this.updateBalances()

        return accountRec
      })
      .catch((error) => {
        Helper.debugLog(error, 'Error')

        Helper.toast('Friendbot must be down again!', true)

        // delete the account friend bot failed
        StellarAccounts.deleteAccount(accountRec.publicKey)

        throw error
      })
  }

  updateBalances(logSuccess = false) {
    for (const acct of StellarAccounts.accounts()) {
      const publicKey = acct.publicKey

      this.balances(StellarWallet.public(publicKey))
        .then((balanceArray) => {
          let removeAll = true

          for (const balance of balanceArray) {
            StellarAccounts.updateBalance(publicKey, balance, removeAll)
            removeAll = false
          }

          if (logSuccess) {
            Helper.debugLog(publicKey, 'Success')
          }

          return null
        })
        .catch((error) => {
          StellarAccounts.updateBalance(publicKey, null, true)

          Helper.debugLog(error, 'Error')
        })
    }
  }

  operationsForWallet(wallet, order = 'desc') {
    wallet.publicKey()
      .then((publicKey) => {
        this.server().operations()
          .forAccount(publicKey)
          .order(order)
          .call()
          .then((response) => {
            Helper.debugLog(response)
          })
      })
      .catch((error) => {
        Helper.debugLog(error, 'Error')
        Helper.toast('Error', true)
      })
  }

  paymentsForWallet(wallet, order = 'desc') {
    wallet.publicKey()
      .then((publicKey) => {
        this.server().payments()
          .forAccount(publicKey)
          .order(order)
          .call()
          .then((response) => {
            Helper.debugLog(response)
          })
      })
      .catch((error) => {
        Helper.debugLog(error, 'Error')
        Helper.toast('Error', true)
      })
  }

  transactionsForWallet(wallet, order = 'desc') {
    wallet.publicKey()
      .then((publicKey) => {
        this.server().transactions()
          .forAccount(publicKey)
          .order(order)
          .call()
          .then((response) => {
            Helper.debugLog(response)
          })
      })
      .catch((error) => {
        Helper.debugLog(error, 'Error')
        Helper.toast('Error', true)
      })
  }
}

const instance = new StellarUtils()
Object.freeze(instance)

export default instance