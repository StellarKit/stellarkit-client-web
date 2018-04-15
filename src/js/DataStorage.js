import Helper from './helper.js'

export default class DataStorage {
  // call this to write to a database rather than local storage
  static setStorage(customStorage) {
    this.storage = customStorage
  }

  static get(key, defaultValue) {
    let result

    if (this.storage) {
      result = this.storage.get(key, defaultValue)
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

      // this.storage is requied to trigger this, we have to do it manually with helper
      this.notify()
    }
  }

  // call when changed from the server by another person
  static notify() {
    Helper.emit('data-storage-updated')
  }
}