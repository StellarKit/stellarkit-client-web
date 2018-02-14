class StreamingCache {
  constructor(type) {
    switch (type, publicKey) {
      case 'payments':
        break
      case 'transactions':
        break
      case 'operations':
        break
    }

    // vars
    this.records = []
    this.index = -1
    this.pagingToken = ''
  }

  next() {
    ++this.index

    if (this.index >= this.records.length) {
      this.loadNextPage()
    }

    if (this.index >= 0 && this.index < this.records.length) {
      return this.records[this.index]
    }
  }

  previous() {
    --this.index

    if (this.index >= 0 && this.index < this.records.length) {
      return this.records[this.index]
    }
  }

  loadNextPage() {
    Helper.debugLog('listening for payments')

    const builder = StellarUtils.server().payments()
      .cursor('now')

    this.paymentStopper = builder.stream({
      onmessage: (txResponse) => {
        this.records.push(txResponse.records)
      },
      onerror: (error) => {
        Helper.debugLog(error, 'Error')
      }
    })
  }
}
