const StellarSdk = require('stellar-sdk')
const generateName = require('sillyname')
import Helper from '../js/helper.js'

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

  addAccount(keyPair, name = null, signWithLedger) {
    const acct = {
      name: name !== null ? name : generateName(),
      balances: {
        XLM: 'refreshing...'
      },
      secret: keyPair.secret(),
      publicKey: keyPair.publicKey(),
      signWithLedger: signWithLedger
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
    return this.shared().accounts()
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
    const accounts = this.shared().accounts()

    for (const val of accounts) {
      if (name === val.name) {
        return val
      }
    }
    return null
  }

  accountIndexWithPublicKey(publicKey) {
    const accounts = this.shared().accounts()

    for (const [index, val] of accounts.entries()) {
      if (publicKey === val.publicKey) {
        return index
      }
    }
    return -1
  }

  accountWithPublicKey(publicKey) {
    const accounts = this.shared().accounts()

    for (const val of accounts.entries()) {
      if (publicKey === val.publicKey) {
        return val
      }
    }
    return null
  }

  updateBalance(index, symbol, balance) {
    const accounts = this.shared().accounts()
    const acct = accounts[index]

    acct.balances[symbol] = balance

    this.shared().save()
  }

  replaceAccountWithPublicKey(accountRec, publicKey) {
    this.deleteAccount(publicKey)

    if (accountRec) {
      this.shared().add(accountRec)
    }
  }

  secret(index) {
    const accounts = this.shared().accounts()

    const acct = accounts[index]

    return acct.secret
  }

  publicKey(index) {
    const accounts = this.shared().accounts()

    const acct = accounts[index]

    return acct.publicKey
  }

  keyPair(index) {
    const accounts = this.shared().accounts()

    const acct = accounts[index]
    return StellarSdk.Keypair.fromSecret(acct.secret)
  }
}

const instance = new StellarAccounts()
Object.freeze(instance)

export default instance
