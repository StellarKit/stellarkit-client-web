const StellarSdk = require('stellar-sdk')
const generateName = require('sillyname')
import Helper from '../js/helper.js'
import StellarUtils from './StellarUtils.js'
class SharedAccounts {
  constructor() {
    this._accounts = []

    this.load()
  }

  add(acct) {
    this._accounts.push(acct)
    this.save()

    return acct
  }

  accounts() {
    return this._accounts.slice()
  }

  delete(index) {
    if (index !== -1) {
      this._accounts.splice(index, 1)

      this.save()
    } else {
      console.log('index not found')
    }
  }

  load() {
    const accounts = Helper.get('accounts')

    if (accounts && accounts.length > 0) {
      this._accounts = accounts
    }
  }

  save() {
    // alert ui to update
    Helper.emit('stellar-accounts-updated')

    // save throttle, probably not necessary, but couldn't hurt
    if (!this._saving) {
      this._saving = true

      setTimeout(() => {
        this._saving = false

        Helper.set('accounts', this._accounts)
      }, 500)
    }
  }
}

// =============================================================
// =============================================================

class StellarAccounts {
  static sharedAccounts() {
    if (!this.shared) {
      this.shared = new SharedAccounts()
    }
    return this.shared
  }

  shared() {
    return StellarAccounts.sharedAccounts()
  }

  addAccount(keyPair, name = null, tag = null) {
    const acct = {
      name: Helper.strOK(name) ? name : generateName(),
      balances: {
        XLM: 'refreshing...'
      },
      secret: keyPair.secret(),
      publicKey: keyPair.publicKey(),
      tag: tag,
      mainnet: !StellarUtils.isTestnet()
    }

    this.shared().add(acct)

    return acct
  }

  ethereumAsset() {
    return new StellarSdk.Asset('ETH', this.accountWithName('Issuer').publicKey)
  }

  bitcoinAsset() {
    return new StellarSdk.Asset('BTC', this.accountWithName('Issuer').publicKey)
  }

  lamboTokenAsset() {
    return new StellarSdk.Asset('LMB', this.accountWithName('Issuer').publicKey)
  }

  accounts() {
    const isMainnet = !StellarUtils.isTestnet()

    const result = this.shared().accounts().filter(value => {
      return isMainnet === Boolean(value.mainnet) // could be undefined
    })

    return result
  }

  deleteAccount(publicKey) {
    const index = this.accountIndexWithPublicKey(publicKey)

    if (index !== -1) {
      this.shared().delete(index)
    } else {
      console.log('index not found')
    }
  }

  accountWithName(name) {
    const accounts = this.accounts()

    for (const val of accounts) {
      if (name === val.name) {
        return val
      }
    }
    return null
  }

  accountIndexWithPublicKey(publicKey) {
    const accounts = this.accounts()

    for (const [index, val] of accounts.entries()) {
      if (publicKey === val.publicKey) {
        return index
      }
    }
    return -1
  }

  accountWithPublicKey(publicKey) {
    const accounts = this.accounts()

    for (const val of accounts.entries()) {
      if (publicKey === val.publicKey) {
        return val
      }
    }
    return null
  }

  updateBalance(index, symbol, balance) {
    const accounts = this.accounts()
    const acct = accounts[index]

    const n = parseFloat(balance)
    const noZeroes = n.toString() // "1.245"

    acct.balances[symbol] = noZeroes

    this.shared().save()
  }

  secret(index) {
    const accounts = this.accounts()

    const acct = accounts[index]

    return acct.secret
  }

  publicKey(index) {
    const accounts = this.accounts()

    const acct = accounts[index]

    return acct.publicKey
  }

  keyPair(index) {
    const accounts = this.accounts()

    const acct = accounts[index]
    return StellarSdk.Keypair.fromSecret(acct.secret)
  }
}

const instance = new StellarAccounts()
Object.freeze(instance)

export default instance