const localforage = require('localforage')

export default class Storage {
  // returns a promise, calls back when everyhing initialized
  static init() {
    this.memoryStore = {}
    this.ready = false

    return new Promise((resolve, reject) => {
      localforage.iterate((value, key) => {
          this.memoryStore[key] = value
        }).then(() => {
          this.ready = true

          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  static get(key) {
    let result

    if (!this.ready) {
      console.log('called get before ready: ' + key)
    } else {
      result = this.memoryStore[key]
    }

    return result
  }

  static set(key, value) {
    if (!this.ready) {
      console.log('called set before ready: ' + key)
    } else {
      this.memoryStore[key] = value

      localforage.setItem(key, value)
        .catch((err) => {
          console.log(JSON.stringify(err))
        })
    }
  }
}