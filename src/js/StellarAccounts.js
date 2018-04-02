const StellarSdk = require('stellar-sdk')
const generateName = require('sillyname')
import Helper from '../js/helper.js'
import StellarUtils from './StellarUtils.js'

class SharedAccounts {
  constructor(network) {
    this._accounts = []
    this.network = network

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
    if (index >= 0 && index < this._accounts.length) {
      this._accounts.splice(index, 1)

      this.save()
    } else {
      console.log('index not found')
    }
  }

  replace(index, acct) {
    if (index >= 0 && index < this._accounts.length) {
      this._accounts[index] = acct

      this.save()
    } else {
      console.log('index not found')
    }
  }

  load() {
    const accounts = Helper.get(this.network + 'accounts')

    if (accounts && accounts.length > 0) {
      this._accounts = accounts
    }

    // converting from old format
    // april 1, delete after a few weeks
    if (this._accounts.length < 1) {
      const oldAccounts = Helper.get('accounts')

      const isMainnet = this.network === 'public'

      const result = oldAccounts.filter(value => {
        return isMainnet === Boolean(value.mainnet) // could be undefined
      })

      if (result && result.length > 0) {
        this._accounts = result

        this.save(false)
      }
    }
  }

  save(alert = true) {
    // alert ui to update
    if (alert) {
      Helper.emit('stellar-accounts-updated')
    }

    // save throttle, probably not necessary, but couldn't hurt
    if (!this._saving) {
      this._saving = true

      setTimeout(() => {
        this._saving = false

        Helper.set(this.network + 'accounts', this._accounts)
      }, 500)
    }
  }
}

// =============================================================
// =============================================================

class StellarAccountsImp {
  constructor(network) {
    this.network = network
  }

  shared() {
    // lazy loading so prefs are ready to read
    if (!this.sharedAccounts) {
      this.sharedAccounts = new SharedAccounts(this.network)
    }

    return this.sharedAccounts
  }

  // returns null if account already exists
  addAccount(keyPair, name = null, tag = null) {
    let secretKey = ''

    // throws an error if you try to call secret() when it doesn't exist
    if (keyPair.canSign()) {
      secretKey = keyPair.secret()
    }

    // check to see if this account already exists to avoid duplicates
    const index = this._indexOfAccount(keyPair.publicKey())
    if (index === -1) {
      const acct = {
        name: Helper.strOK(name) ? name : generateName(),
        assetBalances: [{
          symbol: 'XLM',
          amount: 'refreshing...',
          issuer: ''
        }],
        secret: secretKey,
        publicKey: keyPair.publicKey(),
        tag: tag
      }

      this.shared().add(acct)

      return acct
    }

    return null
  }

  ethereumAsset() {
    const acct = this.accountWithName('Issuer: LMB')
    if (acct) {
      return new StellarSdk.Asset('ETH', acct.publicKey)
    }

    return null
  }

  bitcoinAsset() {
    const acct = this.accountWithName('Issuer: LMB')
    if (acct) {
      return new StellarSdk.Asset('BTC', acct.publicKey)
    }

    return null
  }

  lamboTokenAsset() {
    const acct = this.accountWithName('Issuer: LMB')
    if (acct) {
      return new StellarSdk.Asset('LMB', acct.publicKey)
    }

    return null
  }

  accounts() {
    return this.shared().accounts()
  }

  deleteAccount(publicKey) {
    this.shared().delete(this._indexOfAccount(publicKey))
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

  accountWithPublicKey(publicKey) {
    const index = this._indexOfAccount(publicKey)
    if (index !== -1) {
      return this.accounts()[index]
    }

    return {}
  }

  updateBalance(publicKey, balance, removeAll = false) {
    const index = this._indexOfAccount(publicKey)
    const accounts = this.accounts()
    const acct = accounts[index]

    if (acct) {
      if (removeAll) {
        acct.assetBalances = []
      }

      let bal = balance

      // null passed in on error
      if (!bal) {
        bal = {
          symbol: 'XLM',
          amount: 'Error',
          issuer: ''
        }
      }

      acct.assetBalances.push({
        symbol: bal.symbol,
        amount: Helper.stripZeros(bal.amount),
        issuer: bal.issuer
      })

      this.shared().replace(index, acct)
    }
  }

  // =============================================================
  // Private
  // =============================================================

  _indexOfAccount(publicKey) {
    const accounts = this.accounts()

    for (const [index, val] of accounts.entries()) {
      if (publicKey === val.publicKey) {
        return index
      }
    }

    return -1
  }
}

// =============================================================
// StellarAccounts
// =============================================================

class StellarAccounts {
  constructor() {
    this.publicNet = new StellarAccountsImp('public')
    this.testNet = new StellarAccountsImp('test')
  }

  // returns null if account already exists
  addAccount(keyPair, name = null, tag = null) {
    return this.imp().addAccount(keyPair, name, tag)
  }

  ethereumAsset() {
    return this.imp().ethereumAsset()
  }

  bitcoinAsset() {
    return this.imp().bitcoinAsset()
  }

  lamboTokenAsset() {
    return this.imp().lamboTokenAsset()
  }

  accounts() {
    return this.imp().accounts()
  }

  deleteAccount(publicKey) {
    return this.imp().deleteAccount(publicKey)
  }

  accountWithName(name) {
    return this.imp().accountWithName(name)
  }

  accountWithPublicKey(publicKey) {
    return this.imp().accountWithPublicKey(publicKey)
  }

  updateBalance(publicKey, balance, removeAll = false) {
    return this.imp().updateBalance(publicKey, balance, removeAll)
  }

  imp() {
    if (StellarUtils.isTestnet()) {
      return this.testNet
    }

    return this.publicNet
  }
}

const instance = new StellarAccounts()
Object.freeze(instance)

export default instance