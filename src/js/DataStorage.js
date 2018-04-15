import Helper from './helper.js'

export default class DataStorage {
  // call this to write to a database rather than local storage
  static setStorage(customStorage) {
    this.storage = customStorage
  }

  static get(key, defaultValue) {
    let result

    if (this.storage) {
      result = this.storage.get(key)
    } else {
      result = Helper.get(key)
    }

    // some defaults
    if (result === undefined && defaultValue !== undefined) {
      result = defaultValue
    }

    return result
  }

  static set(key, value) {
    if (this.storage) {
      this.storage.set(key, value)
    } else {
      Helper.set(key, value)
    }
  }
}