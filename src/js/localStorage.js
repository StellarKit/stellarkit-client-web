const localforage = require('localforage')
import SettingsStore from './SettingsStore.js'

export default class LocalStorage {
  // returns a promise, calls back when everyhing initialized
  static init() {
    this.memoryStore = {}
    this.ready = false

    return new Promise((resolve, reject) => {
      const keys = []

      localforage.iterate((value, key) => {
          this.memoryStore[key] = value

          keys.push(this.normalizeKey(key))
        }).then(() => {
          this.ready = true

          SettingsStore.notify(keys)

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
      result = this.memoryStore[this.keyForKey(key)]

      // need to clone objects or arrays or they could get changed and our isEqual will fail
      if (result instanceof Array || result instanceof Object) {
        // need deep copies, otherwise isEqual in set will fail
        result = JSON.parse(JSON.stringify(result))
      }
    }

    return result
  }

  static keyForKey(key) {
    return 'pref-' + key
  }

  static normalizeKey(key) {
    if (key.startsWith('pref-')) {
      return key.substr('pref-'.length)
    }

    return key
  }

  static set(key, value) {
    if (!this.ready) {
      console.log('called set before ready: ' + key)
    } else {
      if (!this.isEqual(this.memoryStore[this.keyForKey(key)], value)) {
        this.memoryStore[this.keyForKey(key)] = value

        SettingsStore.notify([key])

        localforage.setItem(this.keyForKey(key), value)
          .catch((err) => {
            console.log(JSON.stringify(err))
          })
      }
    }
  }

  static isEqual(one, two) {
    if (one instanceof Array && two instanceof Array) {
      return one.length === two.length && one.every((value, index) => {
        return JSON.stringify(value) === JSON.stringify(two[index])
      })
    }

    return one === two
  }
}