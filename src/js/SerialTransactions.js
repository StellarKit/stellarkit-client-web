import StellarUtils from './StellarUtils.js'
import Helper from './helper.js'

export default class SerialTransactions {
  constructor(callback) {
    this.transactions = []
    this.callback = callback
  }

  sendAsset(sourceWallet, fundingWallet, destWallet, amount, asset, memo, additionalSigners) {
    this.transactions.push({
      sourceWallet: sourceWallet,
      fundingWallet: fundingWallet,
      destWallet: destWallet,
      amount: amount,
      asset: asset,
      memo: memo,
      additionalSigners: additionalSigners
    })
  }

  go() {
    const item = this.transactions.shift()

    if (item) {
      return StellarUtils.sendAsset(item.sourceWallet, item.fundingWallet, item.destWallet, item.amount, item.asset, item.memo, item.additionalSigners)
        .then((result) => {
          item.destWallet.publicKey()
            .then((pkey) => {
              Helper.debugLog('sent to: ' + pkey + ' ' + item.amount + ' ' + item.memo)
            })
          // Helper.debugLog(result)
          this.go()
        })
        .catch((err) => {
          this.callback(err)

          console.log(err)
        })
    } else {
      if (this.callback) {
        this.callback()
      }
    }
  }
}