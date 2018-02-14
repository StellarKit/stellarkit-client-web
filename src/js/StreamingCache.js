import Helper from '../js/helper.js'
import StellarUtils from './StellarUtils.js'

export default class StreamingCache {
  constructor(type, publicKey) {
    // vars
    this.type = type
    this.records = []
    this.index = -1
    this.pagingToken = 0
    this.publicKey = publicKey
    this.streamStopper = null
  }

  getCurrentPage() {
    return new Promise((resolve, reject) => {
      if (this.index >= this.records.length) {
        return this.loadNextPage()
          .then(() => {
            if (this.index >= 0 && this.index < this.records.length) {
              resolve(this.records[this.index])
            }
          })
      } else {
        if (this.index >= 0 && this.index < this.records.length) {
          resolve(this.records[this.index])
        }
      }
    })
  }

  next() {
    ++this.index

    return this.getCurrentPage()
  }

  previous() {
    --this.index

    return this.getCurrentPage()
  }

  loadNextPage() {
    Helper.debugLog('loading next page...')

    let builder
    switch (this.type) {
      case 'payments':
        builder = StellarUtils.server().payments()
        break
      case 'transactions':
        builder = StellarUtils.server().transactions()
        break
      case 'operations':
        builder = StellarUtils.server().operations()
        break
      default:
        break
    }

    builder.limit(2)

    if (this.pagingToken !== 0) {
      builder.cursor(this.pagingToken)
    }

    builder.forAccount(this.publicKey)

    return builder.call()
      .then((response) => {
        if (response.records.length > 0) {
          this.records = this.records.concat(response.records)

          const last = response.records.length - 1

          this.pagingToken = response.records[last].paging_token
        } else {
          Helper.debugLog('whattt?')
        }

        return null
      })
  }
}
