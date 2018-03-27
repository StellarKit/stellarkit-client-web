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
        tag: tag,
        mainnet: !StellarUtils.isTestnet()
      }

      this.shared().add(acct)

      return acct
    }

    return null
  }

  ethereumAsset() {
    const acct = this.accountWithName('Issuer')
    if (acct) {
      return new StellarSdk.Asset('ETH', acct.publicKey)
    }

    return null
  }

  bitcoinAsset() {
    const acct = this.accountWithName('Issuer')
    if (acct) {
      return new StellarSdk.Asset('BTC', acct.publicKey)
    }

    return null
  }

  lamboTokenAsset() {
    const acct = this.accountWithName('Issuer')
    if (acct) {
      return new StellarSdk.Asset('LMB', acct.publicKey)
    }

    return null
  }

  accountsForNetwork() {
    const accounts = this.accounts()
    const isMainnet = !StellarUtils.isTestnet()

    const result = accounts.filter(value => {
      return isMainnet === Boolean(value.mainnet) // could be undefined
    })

    return result
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

const instance = new StellarAccounts()
Object.freeze(instance)

export default instance